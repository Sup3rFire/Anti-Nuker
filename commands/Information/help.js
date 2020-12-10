const { readdirSync } = require("fs");

module.exports.execute = async (client, message, args, Discord) => {

    const { commands } = client;

    let dir = client.commandDir;

    if (!args.length) {

        let categories = [];

        readdirSync(dir).forEach( (dirs, index) => {
            categories[index] = `**[${index}]** ${dirs}`;
        });

        var helpEmbed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTitle("Help Menu")
            .setDescription([
                `**${client.prefix}help [category name]** to view commands in a category.`, 
                `**${client.prefix}help [command name]** to get info on a specific command.`
            ])
            .addField('Categories', categories.join("\n"))

        return message.channel.send(helpEmbed);

    } else {
                
        const name = args.join(" ").toLowerCase();
        const command = commands.get(name) || commands.find(c => c.info.aliases && c.info.aliases.includes(name));
        let category;
        if (!command) {
            let categories = readdirSync(dir);
            if (!isNaN(name)) {
                let intParsed = parseInt(name);
                if (categories.length > intParsed) {
                    category = categories[intParsed];
                }
            } else {
                categories.forEach( (item, index) => {
                    if (item.toLowerCase() == name.toLowerCase()) {
                        category = categories[index];
                    }
                });
            }
        }

        if (!command && !category) return message.channel.send("No Command or Category Found!");

        if (command) {

            const commandEmbed = new Discord.MessageEmbed()
                .setTitle(command.info.name)
                .setColor(client.color)
                .setFooter(`Cooldown: ${command.info.cooldown || 1} second(s)`)
            if (command.info.description) {
                commandEmbed
                    .setDescription(command.info.description)
            }
            if (command.info.aliases) {
                commandEmbed
                    .addField("Aliases", command.info.aliases.join(", "))
            }
            if (command.info.usage) {
                commandEmbed
                    .addField("Usage", client.prefix[0] + command.info.name + " " + command.info.usage)
            }
            
            return message.channel.send(commandEmbed);

        } else if (category) {
            
            let commandsCategory = [];

            readdirSync(`${dir}${category}/`).filter(files => files.endsWith('.js')).forEach( (dirs, index) => {
				let commandName = dirs.substring(0, dirs.length - 3);
				let commandDescription = commands.get(commandName).info.description;
                commandsCategory[index] = `**${commandName}**`;
				if (commandDescription) commandsCategory[index] += `\n${commandDescription}`;
            });

            const categoryEmbed = new Discord.MessageEmbed()
                .setTitle(category + " Commands")
                .setColor(client.color)
                .setDescription(commandsCategory.join(", "))
            
            return message.channel.send(categoryEmbed);

        }

    }

};

module.exports.info = {
    name: 'help',
    description: 'List all categories, commands in a category, or info about a specific command',
    aliases: ['commands'],
    usage: '[category name or command name]',
    cooldown: 3
};