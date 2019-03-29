import sys


def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


def main(payload):
    eprint('This is a log')
    return 'Hello from python3 smart contract: {}'.format(payload)
