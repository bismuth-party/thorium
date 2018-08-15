All responses also include an `ok: bool` field to indicate if the request went alright. If it is `false`, then an `err: string` field is sent to indicate what went wrong.



# ALL /<BOT_TOKEN>/ping
Check if the connection works


# POST /<BOT_TOKEN>/message
Has to be called whenever a message gets sent

```
{
	chatid: int			The ID of the chat where the message got sent
	user: User			The user that sent the message
	message: Message	The message that was sent
}
```


# POST /<BOT_TOKEN>/message_edit
Has to be called whenever a message is edited

```
{
	chatid: int			The ID of the chat where the message got edited
	user: User			The user that edited the message
	message: Message	The edited message
}
```


# POST /<BOT_TOKEN>/chat_update/new_member
Has to be called whenever a new member joins the chat

```
{
	chatid: int		The ID of the chat
	user: User		*The user who added the new member
	newuser: User	The new member
}
```

_* This can be the same as `newuser.id` if the member added themselves (i.e. through an invite link)_


# POST /<BOT_TOKEN>/chat_update/left_member
Has to be called whenever a member left the chat

```
{
	chatid: int		The ID of the chat
	user: User		*The user who removed the left member
	leftuser: User	The user that left
}
```

_* This can be the same as `leftuser.id` if the member removed themselves_


# POST /<BOT_TOKEN>/chat_update/new_title
Has to be called whenever the chat gets a new title

```
{
	chatid: int		The ID of the chat
	user: User		The user that changed the title
	title: string	The new title of the chat
}
```


# POST /<BOT_TOKEN>/chat_update/new_chat_photo
Has to be called whenever the chat gets a new photo

```
{
	chatid: int			The ID of the chat
	user: User			The user that changed the photo
	photo: PhotoData	The new chat photo
}
```


# POST /<BOT_TOKEN>/chat_update/delete_chat_photo
Has to be called whenever the photo of the chat gets deleted

```
{
	chatid: int		The ID of the chat
	user: User		The user that deleted the photo
}
```



# GET /<BOT_TOKEN>/generate_token/<USER_ID>
(Re)generate a token for the user to log in with.

```
{
	token: string
}
```
