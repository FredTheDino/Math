#!/usr/bin/python
import random

empty = [1, 0, 0, 0, 0, 0, 0]

def run():
    b = empty[:]
    c = empty[:]

    b.append(random.choice(empty))
    c.append(random.choice(b))
    return random.choice(c) == 1


def main():
    total = 1000000
    true = 0
    for i in range(0, total):
        if (run()):
            true = true + 1

    print("{} / {}".format(true, total))

if __name__ == "__main__":
    main()
