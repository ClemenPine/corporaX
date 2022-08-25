import {table} from './table.mjs'
import {unshift} from './layout.mjs'

export const grams = {
    SFB: 'SFB', // sfb
	DFB: 'DFB', // dsfb
    ALT: 'ALT', // alternate
	ROL: 'ROL', // basic roll
	HSC: 'HSC', // half scissor
	FSC: 'FSC', // full scissor
	LSB: 'LSB', // lateral bigram
	RED: 'RED', // redirect 
	ONE: 'ONE', // onehand
	SFT: 'SFT', // sfT
	SFR: 'SFR', // sfR
	UNK: 'UNK', // unknown
}

export function count_trigrams()
{
    var counts = {}

    const keymap = get_keymap()
    const text = document.getElementById('text').value
    
    for (let i=0; i < text.length - 2; i++)
    {
        const trigram = text.slice(i, i+3)

        const A = keymap[unshift(trigram[0])]
        const B = keymap[unshift(trigram[1])]
        const C = keymap[unshift(trigram[2])]

        const key = `${A}-${B}-${C}`

        const outgram = trigram.toLowerCase()

        if (!(table[key] in counts))
        {
            counts[table[key]] = {}
        }

        if (outgram in counts[table[key]])
        {
            counts[table[key]][outgram]++
        }
        else
        {
            counts[table[key]][outgram] = 1
        }
    }

    console.log(counts)
    return counts
}

function get_keymap()
{
    var keymap = {}

    const layout = document.getElementById('layout')

    var i = 0
    for (const key of layout.childNodes)
    {
        if (key.innerHTML)
        {
            keymap[key.innerHTML] = i
            i++
        }
    }

    return keymap
}