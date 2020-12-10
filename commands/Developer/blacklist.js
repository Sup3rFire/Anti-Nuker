const fs = require("fs");

module.exports.execute = async (client, message, args, Discord) => {

    let user = client.users.cache.get(args[0]) || message.mentions.users.first();
    let reason = args.slice(1).join(" ");

    if (!user) return message.channel.send("Couldn't find the user");
    
    let blacklistEmbed = new Discord.MessageEmbed()
        .setColor(client.color)
        .addField("Developer", `${message.author.tag} (ID: ${message.author.id})`)
        .addField("Reason", reason)

    if (await client.blacklist.get(user.id)) {
        client.blacklist.delete(user.id);
        blacklistEmbed
            .setTitle("Unblacklisted")
    } else {
        client.blacklist.set(user.id, true);
        blacklistEmbed
            .setTitle("Blacklisted")
    }

    user.send(blacklistEmbed);

    blacklistEmbed.addField("User", `${user.tag} (ID: ${user.id})`)

    message.channel.send(blacklistEmbed);

};

module.exports.info = {
    name: 'blacklist',
    description: 'Blacklists a user from the bot',
    usage: '(user) [reason]',
    args: true,
    cooldown: 3,
    developer: true
};