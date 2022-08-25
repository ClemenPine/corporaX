import itertools

def init():
    table = {}

    keys = [i for i in range(30)]
    for item in itertools.product(keys, repeat=3):
        
        seq = (
            info(item[0]),
            info(item[1]),
            info(item[2])
        )

        if (
            seq[0] == seq[1] or
            seq[1] == seq[2] or
            seq[0] == seq[2]
        ):
            gram = 'SFR'
        
        elif (
            seq[0]['finger'] == seq[1]['finger'] and
            seq[1]['finger'] == seq[2]['finger']
        ):
            gram = 'SFT'

        elif (
            seq[0]['finger'] == seq[1]['finger'] or
            seq[1]['finger'] == seq[2]['finger']
        ):
            gram = 'SFB'

        elif (
            seq[0]['finger'] == seq[2]['finger'] 
        ):
            gram = 'DFB'

        elif (
            seq[0]['hand'] == seq[2]['hand'] and
            seq[0]['hand'] != seq[1]['hand']
        ):
            gram = 'ALT'

        elif (
            seq[0]['hand'] == seq[1]['hand'] and
            seq[1]['hand'] != seq[2]['hand']
        ):
            # left rolls
            if (
                seq[0]['col'] == 0 or 
                seq[1]['col'] == 0
            ):
                gram = 'LSB-L'

            elif (
                (
                    seq[0]['row'] == 1 and
                    seq[1]['row'] != 1
                ) or
                (
                    seq[1]['row'] == 1 and
                    seq[0]['row'] != 1
                )
            ):
                gram = 'HSC-L'
            
            elif (
                (
                    seq[0]['row'] == 2 and
                    seq[1]['row'] == 0
                ) or
                (
                    seq[1]['row'] == 2 and
                    seq[0]['row'] == 0
                )
            ):
                gram = 'FSC-L'

            else:
                gram = 'ROL-L'

        elif (
            seq[1]['hand'] == seq[2]['hand'] and
            seq[0]['hand'] != seq[1]['hand']
        ):
            # right rolls
            if (
                seq[1]['col'] == 0 or 
                seq[2]['col'] == 0
            ):
                gram = 'LSB-R'
                
            elif (
                (
                    seq[1]['row'] == 1 and
                    seq[2]['row'] != 1
                ) or
                (
                    seq[2]['row'] == 1 and
                    seq[1]['row'] != 1
                )
            ):
                gram = 'HSC-R'
            
            elif (
                (
                    seq[1]['row'] == 2 and
                    seq[2]['row'] == 0
                ) or
                (
                    seq[2]['row'] == 2 and
                    seq[1]['row'] == 0
                )
            ):
                gram = 'FSC-R'

            else:
                gram = 'ROL-R'

        elif (
            seq[0]['col'] < seq[1]['col'] < seq[2]['col'] or
            seq[0]['col'] > seq[1]['col'] > seq[2]['col']
        ):
            gram = 'ONE'

        else:
            gram = 'RED'

        table[f'{item[0]}-{item[1]}-{item[2]}'] = gram

    return table
        

def info(key: int):

    info = {
        'hand': hand(key),
        'row': row(key),
        'col': col(key), 
        'finger': finger(key),
    }

    return info


def hand(key: int):
    return int(key % 10 >= 5)


def row(key: int):
    return int(key // 10)


def col(key: int):
    return min(abs(4 - key % 10), abs(5 - key % 10))


def finger(key: int):
    cl = key % 10

    if cl in [0, 1, 2, 3]:
        return cl
    elif cl in [4, 5]:
        return cl - 1
    else:
        return cl - 2