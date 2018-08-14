# **NOTE** It is easier to use the `/admin` page, this file is only for reference


# Add member
```
method: POST
url: /<TOKEN>/chat_update/new_member
header: 'Content-Type: application/json'
data: {"chatid":42,"userid":1111,"user":{"id":1111,"is_bot":false,"first_name":"Foo"}}
```

### Expected response:
`{"ok":true}`


# Send message
```
method: POST
url: /<TOKEN>/message
header: 'Content-Type: application/json'
data: {"chatid":42,"userid":1111,"message":{"type":0,"content":{"text":"Woah!"}}}
```

### Expected response:
`{"ok":true}`


# Get token
```
method: GET
url: /<TOKEN>/generate_token/1111
```

### Expected response (the actual token will be different):
`{"token":"1111+5be795c9","ok":true}`


# Verify
```
method: GET
url: /api/1111+5be795c9/chat/42
```

### Expected response:
{"last_message":{"type":0,"userid":1111,"date":"2018-08-14T15:01:17.347Z","content":{"type":0,"content":"Woah"}},"ok":true}
