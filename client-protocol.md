# ALL /api/ping
Check if the connection works

Always responds with `{ ok: true }`


# GET /api/chat/<chatID>
Get general information about a chat
```
{
	last_message: ?Message	The last message (if any)
}
```
