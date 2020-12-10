const fs = require("fs");

module.exports.execute = async (client, message, args, Discord) => {

	const commandName = args.join(" ").toLowerCase()
    const command = client.commands.get(commandName) || client.commands.find(c => c.info.aliases && c.info.aliases.includes(commandName));
    if (!command) return message.channel.send("That command doesn't exist!");
    
    let dir = client.commandDir;
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}${dirs}/`).filter(files => files.endsWith('.js'));
        if (commands.includes(`${command.info.name}.js`)) {
			try {
                delete require.cache[require.resolve(`../${dirs}/${command.info.name}.js`)];
				const pull = require(`../${dirs}/${command.info.name}.js`);
				client.commands.set(command.info.name, pull);
				return message.channel.send(`Successfully reloaded ${command.info.name}!`);
			}
			catch (err) {
				message.channel.send(`There was an error while reloading \`${command.info.name}\``);
				return console.error(err);
			}
        }
    });

};

module.exports.info = {
    name: 'reload',
    description: 'Reloads a command',
    usage: '(command)',
    args: true,
    cooldown: 3,
    developer: true
};