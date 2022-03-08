#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
END='\033[0m'

echo -e ${RED}Make sure you have downloaded Signature SDK from here:${END} https://developer.wacom.com/en-us/developer-dashboard/downloads
echo -e ${RED}Make sure you have extracted Signatrue SDK content under ${END} ${GREEN}/demos/common/libs${END} ${RED}folder${END}
echo -e ${RED}In case you want to use WILL Ink SDK make sure you have downloaded from here:${END} https://developer.wacom.com/en-us/developer-dashboard/downloads
echo -e ${RED}Make sure you have extracted WILL Ink SDK content under under${END} ${GREEN}/sigCaptDialog/libs/will/digital-ink${END} ${RED}folder${END}
echo
echo Wacom Signature SDK for JavaScript
echo
echo The Wacom Signature SDK for JavaScript is intended to generate signature objects for the user.
echo
echo For further details on using the SDK see https://developer-docs.wacom.com
echo Navigate to: WILL SDK for signature
echo References are included to the SDK sample code on GitHub
echo

read -s -n 1 -p "Press any key to continue ..."
echo