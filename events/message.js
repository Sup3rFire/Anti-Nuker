function checkPrefix(message, item) {
    if (message.content.startsWith(item)) {
        return true;
    }
    return false;
}

module.exports = async (client, Discord, message) => {
    let blacklist = await client.blacklist.get(message.author.id);
    if (blacklist) return;
    
    const cooldowns = client.cooldowns;

    if (message.author.bot) return;

    let useMPrefix = false;
    let prefix;

    if (message.content.replace("!", "").startsWith(`<@${client.user.id}>`)) {
        prefix = await client.prefixes.get(message.guild.id) || client.prefix[0];
        useMPrefix = true;
    }

    let args;
    if (useMPrefix) {
        args = message.content.split(">").slice(1).join(">").trim().split(/\s+/);
    } else {

        if (message.guild && await client.prefixes.get(message.guild.id)) {

            let gPrefix = await client.prefixes.get(message.guild.id);
            if (gPrefix) {
                if (checkPrefix(message, gPrefix)) {
                    prefix = gPrefix;
                }
            } else {
                client.prefix.forEach(item => {
                    if (checkPrefix(message, item)) {
                        prefix = item;
                    }
                });
            }

        } else {
            client.prefix.forEach(item => {
                if (checkPrefix(message, item)) {
                    prefix = item;
                }
            });
        }
    
        if (!prefix) return;
        args = message.content.slice(prefix.length).trim().split(/\s+/);
    }

    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(commandName));

    if (!command) {
        if (useMPrefix) {
            var mEmbed = new Discord.MessageEmbed()
                .setTitle(`Online`)
                .setColor(client.color)
                .setDescription(`Prefix is: \`${prefix}\``);
            return message.channel.send(mEmbed);
        } else return;
    }
    
    if (!cooldowns.has(command.info.name)) {
        cooldowns.set(command.info.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.info.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            console.log(`User (${message.author.tag}) with ID (${message.author.id}) tried to execute ${command.info.name}, but he needed to wait ${timeLeft.toFixed(1)} more second(s) before reusing the command.`);
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.info.name}\` command.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (command.info.guildOnly) {
        if (message.channel.type !== 'text') {
            console.log(`User (${message.author.tag}) with ID (${message.author.id}) tried to execute ${command.info.name} in DMs, but ${command.info.name} is a guild only command.`);
            return message.reply(`I can't execute \`${command.info.name}\` inside DMs!`);
        }
        if (command.permission && !message.member.hasPermission(command.permission) && message.author.id != message.guild.ownerID) {
            console.log(`User (${message.author.tag}) with ID (${message.author.id}) tried to execute ${command.info.name}, but ${command.info.name} requires permission ${command.permission}`);
            return message.reply(`You don't have permissions to execute this command!`);
        }
    }

    if (command.info.developer && !client.developers.includes(message.author.id)) {
        console.log(`User (${message.author.tag}) with ID (${message.author.id}) tried to execute ${command.info.name}, but ${command.info.name} requires him to be a developer`);
        return message.reply(`You must be a bot developer to execute this command!`);
    }

    if (command.info.args && !args.length) {
        console.log(`User (${message.author.tag}) with ID (${message.author.id}) tried to execute ${command.info.name} without arguments, but ${command.info.name} requires arguments.`);
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.info.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.info.name} ${command.info.usage}\``;
        }
        
        return message.channel.send(reply);
    }

    try {
        if (message.guild) {
            console.log(`User (${message.author.tag}) with ID (${message.author.id}) executed ${command.info.name} in a Guild (${message.member.guild.name}) with ID (${message.member.guild.id}).`);
        } else {
            console.log(`User (${message.author.tag}) with ID (${message.author.id}) executed ${command.info.name} in DMs.`);
        }
        command.execute(client, message, args, Discord);
    } catch (error) {
        console.error(`User (${message.author.tag}) with ID (${message.author.id}) tried to execute ${command.info.name}, but an error occurred: ${error}`);
        message.channel.send('There was an error trying to execute that command!');
    }

};