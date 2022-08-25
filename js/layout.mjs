export {unshift as default}

export function init() 
{
    // set up textarea link
    const text = document.getElementById('text')
    text.addEventListener("input", update)

    // set up layout
    const layout = document.getElementById('layout')

    const keys = "qwfpgjluy'arstdhneiozxcvbkm,./"
    for (var idx in keys)
    {
        const char = keys[idx]
        const key = document.createElement('div')

        key.id = char
        key.className = 'key'
        key.innerHTML = char

        layout.appendChild(key)

        if (idx % 10 == 4) {
            const pad = document.createElement('div')
            pad.className = 'pad'
            layout.appendChild(pad)
        }
    }

    update()
}

function update() 
{
    const text = document.getElementById('text').value
    const layout = document.getElementById('layout')

    var total = 0
    var max = ''

    var counts = {}
    for (const key of layout.childNodes)
    {
        counts[key.id] = 0
    }

    for (const ch of text)
    {
        const char = unshift(ch)

        if (!char in counts)
        {
            continue
        }

        counts[char]++
        total++

        if (counts[char] > counts[max]) {
            max = char
        }
    }

    for (var key of layout.childNodes)
    {
        if (key.className == 'pad')
        {
            continue
        }

        var use
        var max_use

        if (total) 
        {
            use = counts[key.id] / total
            max_use = counts[max] / total
        }
        else
        {
            use = 0
            max_use = 0
        }
        
        key.style.backgroundColor = get_color(use, max_use)
        key.title = `Key Usage: ${(use*100).toFixed(2)}%`
    }
}

function get_color(use, max)
{
    if (max)
    {
        use /= max
    }

    const hue = -use * 80 + 220
    const sat = use * 100
    const val = use * 60 + 20

    return `hsl(${hue}, ${sat}%, ${val}%)`
}

export function unshift(char)
{
    const shift_map = {
        "A": "a",
        "B": "b",
        "C": "c",
        "D": "d",
        "E": "e",
        "F": "f",
        "G": "g",
        "H": "h",
        "I": "i",
        "J": "j",
        "K": "k",
        "L": "l",
        "M": "m",
        "N": "n",
        "O": "o",
        "P": "p",
        "Q": "q",
        "R": "r",
        "S": "s",
        "T": "t",
        "U": "u",
        "V": "v",
        "W": "w",
        "X": "x",
        "Y": "y",
        "Z": "z",
        "<": ",",
        ">": ".",
        "?": "/",
        ":": ";",
        "\"": "'",
        "_": "-",
        "+": "=",
        "{": "[",
        "}": "]"
    }

    if (char in shift_map)
    {
        return shift_map[char]
    }
    else
    {
        return char
    }
}