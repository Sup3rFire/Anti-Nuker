// Setup

const Discord = require('discord.js'),
    client = new Discord.Client(),
    fs = require("fs"),
    Keyv = require('keyv');

require('dotenv').config();

client.blacklist = new Keyv(`sqlite://db/blacklist.sqlite`);
client.blacklist.on('error', err => console.error('Blacklist Keyv connection error:', err));
client.prefixes = new Keyv(`sqlite://db/prefixes.sqlite`);
client.prefixes.on('error', err => console.error('Prefixes Keyv connection error:', err));
client.commandDir = './commands/';

client.color = "#FF6464";
client.prefix = ['.'];
client.developers = ['337024000330956811'];

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        
        if (!file.endsWith(".js")) return;

        const event = require(`./events/${file}`);

        let eventName = file.split(".")[0];

        client.on(eventName, event.bind(null, client, Discord));
        console.log(`Loaded Event: ${eventName}`);
    });
});

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

let dir = client.commandDir;
fs.readdirSync(dir).forEach(dirs => {
    const commands = fs.readdirSync(`${dir}${dirs}/`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`${dir}${dirs}/${file}`);
        client.commands.set(command.info.name, command);
        console.log(`Loaded Command: ${command.info.name} (${dirs})`);
    }
});

client.login(process.env.TOKEN);