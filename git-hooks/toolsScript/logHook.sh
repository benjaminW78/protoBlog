#!/bin/bash
# created by WINCKELL Benjamin
source ./color.sh

function log_start {
	echo -e "$GREEN""---------Hook ""$RED""$0""$GREEN""---------\n""$NORMAL"
}

function log_end {
	echo -e "$GREEN""---------DONE ""$RED""$0""$GREEN""---------\n""$NORMAL"
}