module.exports.execute = async (client, message, args, Discord) => {

    if (args.length) {
        await client.prefixes.set(message.guild.id, args.join(" "));
        message.channel.send(`Successfully set the prefix to ${args.join(" ")}`);
    } else {
        await client.prefixes.delete(message.guild.id);
        message.channel.send(`Successfully removed the guild prefix`);
    }

};

module.exports.info = {
    name: 'set-prefix',
    description: 'Sets the prefix for a guild',
    aliases: ['setprefix'],
    usage: '[prefix]',
    cooldown: 3,
    guildOnly: true,
    permissions: 8
};
