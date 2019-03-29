import sys
import json
from contract import handler


def get_stdin():
    buf = ""
    while(True):
        line = sys.stdin.readline()
        buf += line
        if line == "":
            break
    return buf


if __name__ == "__main__":
    st = get_stdin()
    ret = handler.main(st)
    if ret is not None:
        sys.stdout.write(json.dumps(ret))
