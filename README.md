# discord.js Template

*Baca ini dalam [Bahasa Indonesia](README-id.md)*

This template was designed to be an easy way to start off a discord.js bot with a few essential features that would probably be made anyways.

## Warning

This template is still being developed and may contain bugs

## Requirements

- Node.js 12.0.0 or newer
- npm (usually downloaded with node.js)
- A Bot Application
- A text editor
- An internet connection (which you probably have considering you are reading this)

Here is some help to:
- [Install node.js](https://discordjs.guide/preparations/#installing-node-js)
- [Creating a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

## Setup

Install the packages using npm in the template's directory

```bash
npm install
```

Then, use your favourite text editor to make a file called `.env` and a folder called `db` in the directory

Finally, put the following to the `.env`:

```
TOKEN=YourTokenHere
```

Obviously, switch `YourTokenHere` with your real token

## Configuration

The following lines of code in these files can be swapped to what you want!
Just switch the placeholders.

server.js
```javascript
client.color = "Hex Color Code";
client.prefix = ['.', ','];
client.developers = ['Developer ID', 'Another Developer ID'];
```

ready.js
```javascript
let Statuses = [
    {text: "some game", type: "PLAYING"},
    {text: "some youtube video", type: "WATCHING"},
    {text: "some music", type: "LISTENING"},
    {text: "something", type: "STREAMING", url: "A Twitch URL"}
];
```

## License
[MIT](https://github.com/Sup3rFire/djs-template/blob/master/LICENSE)
