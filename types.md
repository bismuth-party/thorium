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
		file_id: "STICKER",
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
`caption: ?string`  										AVAILABLE ???  
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
`photo: PhotoData`		Only send the PhotoData with the highest resolution  

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



# History<?T>
```
{
	type: int		The number after the equal sign in the subheader
	userid: int		The ID of the user who triggered the record
	date: string	The ISO 8601 Extended Format string of the datetime at which the record was added
	content: T		The content of the record    (is undefined if T is undefined)
}
```

Example: 11111 added 22222 to the chat
```
{
	type: 10,
	userid: 11111,
	date: "2018-08-13T20:15:55.215Z",
	content: {
		id: 22222,
		is_bot: false,
		first_name: "Foo",
		username: "foo_bar"
	}
}
```

## Message = 0
`T = Message`	The sent message

## Message_Edit = 1
`T = Message`	The edited message

## 2-9 are reserved for possible later use

## ChatUpdate_NewMember = 10
`T = User`		The user that joined

## ChatUpdate_LeftMember = 11
`T = User`		The user that left

## ChatUpdate_NewTitle = 12
`T = string`	The new title

## ChatUpdate_NewChatPhoto = 13
`T = PhotoData[]`	The new photos

## ChatUpdate_DeleteChatPhoto = 14
