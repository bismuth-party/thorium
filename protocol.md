# POST /<BOT_TOKEN>/message
Has to be called whenever a message gets sent

```
{
	chatid: int		The ID of the chat where the message got sent
	userid: int		The ID of the user that sent the message

	message: Message	the message that was sent
}
```


# POST /<BOT_TOKEN>/chat_update/new_member
Has to be called whenever a new member joins the chat

```
{
	chatid: int		The ID of the chat
	user: User		The new user
}
```

# POST /<BOT_TOKEN>/chat_update/left_member
Has to be called whenever a member left the chat

```
{
	chatid: int		The ID of the chat
	userid: int		The ID of the user that left
}
```


# POST /<BOT_TOKEN>/chat_update/new_title
Has to be called whenever the chat gets a new title

```
{
	chatid: int		The ID of the chat
	userid: int		The ID of the user that changed the title
	title: string	The new title of the chat
}
```


# POST /<BOT_TOKEN>/chat_update/new_chat_photo
Has to be called whenever the chat gets a new photo

```
{
	chatid: int		The ID of the chat
	userid: int		The ID of the user that changed the photo
	photo: Photo	The new chat photo
}
```


# POST /<BOT_TOKEN>/chat_update/delete_chat_photo
Has to be called whenever the photo of the chat gets deleted

```
{
	chatid: int		The ID of the chat
	userid: int		The ID of the user that deleted the photo
}
```
