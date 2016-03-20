#!bin/bash
# created by WINCKELL Benjamin
source ./toolsScript/color.sh

hookName=""

title="Deploy a new hook for which platform\n"
prompt=" Pick an option:"
options=("dev computer" "pre prod" "D la réponse D")

echo -e "$GREEN2""$title""$NORMAL"
PS3="$prompt "
select opt in "${options[@]}" "Quit"; do

    case "$REPLY" in

    1 ) echo -e "\n you selected new hook for $GREEN $opt $NORMAL" ; break;;
    2 ) echo -e "\n you selected new hook for $GREEN  $opt $NORMAL" ; break;;
    3 ) echo -e "\n $RED $opt, Jean Pierre c'est mon dernier mot. $NORMAL \n";echo -e "Goodbye!" ;exit 0;break;;

    $(( ${#options[@]}+1 )) ) echo -e "Goodbye!\n" ;exit 0; break;;
    *) echo -e "\n Invalid option. Try another one." ;continue;;

    esac

done
echo -e "\n"
if [[ "$REPLY" == "1" ]]; then
   cd ./dev
elif [[ "$REPLY" == "2" ]]; then
   cd ./preProd
fi



title="Select a hook inside this list of avaible hooks \n If you want to know which hook is usefull for what go to:\n https://git-scm.com/docs/githooks \n"
prompt=" Pick an hook:"
options1=("pre-commit" "post-commit" "prepare-commit-msg" "commit-msg" "post-commit" "pre-rebase" "post-checkout" "post-merge" "pre-push" "post-rewrite" "applypatch-msg" "pre-applypatch" "post-applypatch")

echo -e "$title"
PS3="$prompt "
select opt1 in "${options1[@]}" "Quit"; do

    case "$REPLY" in

    1 ) echo -e "\nyou selected new hook for $opt1 " ; break;;
    2 ) echo -e "\nyou selected new hook for $opt1 " ; break;;
    3 ) echo -e "\nyou selected new hook for $opt1 " ; break;;
    4 ) echo -e "\nyou selected new hook for $opt1 " ; break;;
    5 ) echo -e "\nyou selected new hook for $opt1 " ; break;;
    6 ) echo -e "\nyou selected new hook for $opt1 " ; break;;
    7 ) echo -e "\nyou selected new hook for $opt1 " ; break;;
    8 ) echo -e "\nyou selected new hook for $opt1 " ; break;;
    9 ) echo -e "\nyou selected new hook for $opt1 " ; break;;
    10 ) echo -e "\nyou selected new hook for $opt1 " ; break;;
    11 ) echo -e "\nyou selected new hook for $opt1 " ; break;;
    12 ) echo -e "\nyou selected new hook for $opt1 " ; break;;
    13 ) echo -e "\nyou selected new hook for $opt1 " ; break;;

    $(( ${#options1[@]}+1 )) ) echo -e "Goodbye!" ; break;;
    *) echo -e "Invalid option. Try another one." ;continue;;

    esac

done


cp hook-chain.sample ./$opt1

echo -e "\n $GREEN Succefully created a new git hook $PURPLE $opt1 $GREEN inside $PURPLE $opt1 $GREEN directory $BACKGREEN\n"


 ls -l ./ | grep $opt1
