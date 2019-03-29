#!/bin/sh

# Dragonchain smart contract example

input=""

# Get input from stdin
while read -r line
do
    input="$input$line\n"
done
# Trim the extra trailing newline on our input
input=$(echo "$input" | awk '{print substr($0, 0, length($0) - 1)}')

# Now do something with the input
echo "Welcome to Dragonchain"
echo "This is a log" >&2

# Use awk to get the first 8 characters from the beginning of the input
short=$(echo "$input" | awk '{print substr ($0, 0, 8)}')
# Print an ASCII art banner of these trimmed characters
figlet $short
