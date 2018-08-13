Types preceded by `?` are optional.


# Message
```
{
	type: int		The number after the equal sign in the subheader
	content			The content of the message (the part under the subheader)
}
```

Example:
```
{
	type: 6,
	content: {
		emoji: "💻",
		set_name: "tech_stickerpack"
	}
}
```


## Text = 0
`text: string`  The text of the message

## Audio = 1
`caption: ?string`  
`file_id: string`  
`duration: int`  
`performer: ?string`  
`title: ?string`  
`mime_type: ?string`  
`file_size: ?int`  

## Document = 2
`caption: ?string`  
`file_id: string`  
`file_name: ?string`  
`mime_type: ?string`  
`file_size: ?int`  

## Animation = 3
`caption: ?string`  												AVAILABLE ???  
`file_id: string`  
`duration: int`  
`file_name: ?string`  
`mime_type: ?string`  
`file_size: ?int`  

## Game = 4
`title: string`  
`description: string`  

## Photo = 5
`caption: ?string`  

## Sticker = 6
`file_id: string`  
`emoji: ?string`  
`set_name: ?string`  
`file_size: ?int`  

## Video = 7
`caption: ?string`  
`file_id: string`  
`duration: int`  
`mime_type: ?string`  
`file_size: ?int`  

## Voice = 8
`caption: ?string`  
`file_id: string`  
`duration: int`  
`mime_type: ?string`  
`file_size: ?int`  

## VideoNote = 9
`file_id: string`  
`duration: int`  
`file_size: ?int`  

## Contact = 10
`phone_number: string`  
`first_name: string`  
`last_name: ?string`  
`user_id: ?int`  
`vcard: ?string`  

## Location = 11
`longitude: float`  
`latitude: float`  

## Venue = 12
`location: Location`  
`title: string`  
`address: string`  



# User
`id: int`  
`is_bot: bool`  
`first_name: string`  
`last_name: ?string`  
`username: ?string`  
`language_code: ?string`  


# PhotoData
`file_id: string`  
`width: int`  
`height: int`  
`file_size: ?int`  



# History
```
{
	type: int		The number after the equal sign in the subheader
	userid: int		The ID of the user who triggered the record
	date: string	The ISO 8601 Extended Format string of the date and time at which the record was added
	content			The content of the record (the part under the subheader)
}
```

Example:
```
{
	type: 4,
	userid: 12345678,
	date: "2018-08-13T14:12:10.037Z",
	content: {
		emoji: "💻",
		set_name: "tech_stickerpack"
	}
}
```

## Message = 0
`content: Message`	The sent message

## MessageEdit = 1
`content: Message`	The edited message

## ChatUpdate_NewMember = 2
`content: User`		The new user

## ChatUpdate_LeftMember = 3

## ChatUpdate_NewTitle = 4
`content: string`	The new title

## ChatUpdate_NewChatPhoto = 5
`content: PhotoData`	The new photo

## ChatUpdate_DeleteChatPhoto = 6
