#include <stdio.h>
#include "handler.h"

using namespace std;

string handler(string payload) {
    fprintf(stderr, "This is a log\n");
    string returnValue = "Hello from cpp smart contract: " + payload;
    return returnValue;
}
