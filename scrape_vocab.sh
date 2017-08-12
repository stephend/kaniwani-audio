#!/usr/bin/env bash

#read -p "WaniKani username: " wk_username 
#curl_cmd="curl -b wk_cookie.txt -c wk_cookie.txt"

read wk_username < wk_username.txt
read wk_password < wk_password.txt

#echo $wk_username
#echo $wk_password

# reset cookies
# rm -f wk_cookie.txt

# get authenticity token
# echo "GET AUTHENTICITY TOKEN"
# authenticity_token=`$curl_cmd -s "https://www.wanikani.com/login" | grep 'name=.authenticity_token.' | sed -e 's/^.*name="authenticity_token" value="\([^"]*\)".*$/\1/'`
# echo $authenticity_token
# echo

# # get session cookie
# echo "LOGIN"
# $curl_cmd -i -X POST "https://www.wanikani.com/login" \
# 	-H 'Origin: https://www.wanikani.com' \
# 	-H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36' \
# 	-H 'Content-Type: application/x-www-form-urlencoded' \
# 	-H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' \
# 	-H 'Cache-Control: max-age=0' \
# 	-H 'Referer: https://www.wanikani.com/login' \
# 	-H 'Connection: keep-alive' \
# 	-H 'DNT: 1' \
# 	--data 'utf8=%E2%9C%93' \
# 	--data-urlencode 'authenticity_token=${authenticity_token}' \
# 	--data-urlencode 'user%5Blogin%5D=${wk_username}' \
# 	--data-urlencode 'user%5Bpassword%5D=${wk_password}' \
# 	--data 'user%5Bremember_me%5D=0' \
# 	-o vocab/login.html

while read v_line; do
	#echo "Word=${v}"
	v="$(echo -e "${v_line}" | tr -d '[:space:]')"
	curl -v -b wk_cookie.txt -o "vocab/${v}.html" "https://www.wanikani.com/vocabulary/${v}"
	#echo "OK"
done < vocab_encoded.txt


