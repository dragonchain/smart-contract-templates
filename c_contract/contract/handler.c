#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include "handler.h"

char* handler(char* payload) {
    fprintf(stderr, "This is a log\n");
    char* hello = "Hello from c smart contract: ";
    char* returnValue = calloc(strlen(payload) + strlen(hello) + 3, sizeof(char));
    strcat(returnValue, hello);
    strcat(returnValue, payload);
    return returnValue;
}
