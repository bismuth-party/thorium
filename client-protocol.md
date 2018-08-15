All responses also include an `ok: bool` field to indicate if the request went alright. If it is `false`, then an `err: string` field is sent to indicate what went wrong.

See [bot-protocol.md] for the way to get the TOKEN.


# ALL /api/ping
Check if the connection works


# GET /api/<TOKEN>/chat/<chatID>
Get general information about a chat
```
{
	last_message: ?History<Message>	The record of the last message (if any)
	last_title: ?History<string>	The record of the last title (if any)
}
```


# GET /api/<TOKEN>/chat/<chatID>/extended
Get extended information about a chat
```
{
	recent_messages: History<Message>[]		The last 20 messages
	all_titles: History<string>[]			All titles this chat ever had
	users: User[]							A list of all users of this chat
}
```


# GET /api/<TOKEN>/chat/<chatID>/titles
Get a list of all titles known
```
{
	titles: [History]	A list of all historical records about titles
}
```
