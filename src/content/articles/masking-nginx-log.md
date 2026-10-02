---
title: "masking-nginx-log"
description: "map $request_uri $masked_uri {"
publishedAt: 2025-10-24T09:18:02.000Z
type: article
tags: []
featured: false
draft: true
---



```
map $request_uri $masked_uri {
        ~*(.*?)(encrypted=)[^&]+(.*)   $1$2***$3;
        default              $request_uri;
    }

    map $http_referer $masked_referer {
        ~*(.*?)(encrypted=)[^&]+(.*)   $1$2***$3;
        default               $http_referer;
    }

log_format  main  '$remote_addr - $remote_user [$time_local] '
                      '"$request_method $masked_uri $server_protocol" '
                      '$status $body_bytes_sent "$masked_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for" '
                      'server_name="$server_name"';
```

```
"GET /ps-login?encrypted=***&redirectUrl=https%3A%2F%2Fqa-www.yna.co.kr HTTP/1.1"
```