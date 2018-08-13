# Add
```
method: POST
url: localhost:8467/<TOKEN>/message
header: 'Content-Type: application/json'
data: {"chatid":42,"userid":12345,"message":{"type":0,"content":{"text":"Woah!"}}}
```

### Expected response:
`{"ok":true}`


# Verify
```
method: GET
url: localhost:8467/api/chat/42
```

### Expected response:
`{"last_message":{"type":0,"userid":12345,"date":"2018-08-13T16:13:32.073Z","content":{"type":0,"content":{"text":"Woah!"}}},"users":[],"ok":true}`
