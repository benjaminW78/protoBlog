#!/bin/bash
# created by WINCKELL Benjamin
# Use this file to setup the hooks usefull for this repository after your git clone

# test if symlink installed
type -P symlinks >/dev/null 2>&1 || sudo apt-get install symlinks

if [[ -z $1 ]]; then
    echo 'Fuck it params missing: development or staging.'
    exit 1
fi

if [[ "$1" == "development" ]]; then

    echo "I can't even, you known what my dev mean ! #swag"
    cd ./dev/
elif [[ "$1" == "staging" ]]; then

    echo "They see me rollin', they hatting... my staging #yolo"
	cd ./preProd/
else
    echo "Don't know this, available params development or staging"
    exit 1
fi

sudo chmod +x *

pathGitDir=$(git rev-parse --show-toplevel)

echo $pathGitDir

path="$PWD/*"
for file in $path
do
echo "$file"
ln -s -f $file $pathGitDir/.git/hooks/
done

echo '... OK'

echo 'listing files symlink inside .git/hooks/ \n'
symlinks -v $pathGitDir/.git/hooks/

echo 'install hooks finished with Success \n'
exit 0
