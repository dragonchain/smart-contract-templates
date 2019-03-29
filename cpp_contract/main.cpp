#include <string.h>
#include <stdio.h>
#include "contract/handler.h"

int main() {
    char *input = (char*)calloc(2, sizeof(char));
    int read = 0;
    size_t len;
    while (read != -1) {
        char *buffer = NULL;
        read = getline(&buffer, &len, stdin);
        if (read != -1) {
            int currLen = strlen(input);
            int readLen = strlen(buffer);
            input = (char*)realloc(input, currLen + readLen + 3);
            strcat(input, buffer);
            free(buffer);
        }
    }

    printf("%s", handler(input).c_str());

    free(input);
    return 0;
}
