#!/usr/bin/env bash

# Dragonchain smart contract example

# Get input from stdin
input=$(</dev/stdin)

# Log with stderr
echo "Welcome to Dragonchain" >&2
echo "This is a log" >&2

# Do something with the input (in this example, simply reverse the input string)
output="$(echo -n "$input" | rev)"

# Use stdout as the output
echo "$output"
