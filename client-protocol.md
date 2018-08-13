All responses also include an `ok: bool` field to indicate if the request went alright. If it is `false`, then an `err: string` field is sent to indicate what went wrong.



# ALL /api/ping
Check if the connection works


# GET /api/chat/<chatID>
Get general information about a chat
```
{
	last_message: ?History<Message>	The record of the last message (if any)
	last_title: ?History<string>	The record of the last title (if any)
	users: [User]					All users of this group
}
```


# GET /api/chat/<chatID>/titles
Get a list of all titles known
```
{
	titles: [History]	A list of all historical records about titles
}
```
