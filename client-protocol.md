All responses also include an `ok: bool` field to indicate if the request went alright. If it is `false`, then an `err: string` field is sent to indicate what went wrong.



# ALL /api/ping
Check if the connection works


# GET /api/chat/<chatID>
Get general information about a chat
```
{
	last_message: ?Message	The last message (if any)
}
```
