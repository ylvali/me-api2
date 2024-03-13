#!/usr/bin/env bash
 
# Upload
rsync -avz -e "ssh" --exclude-from 'exclude-list.txt' . root@104.248.170.86://root/jsramverk3/
echo 'uploaded'