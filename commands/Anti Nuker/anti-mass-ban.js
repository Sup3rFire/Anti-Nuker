const ms = require("ms");
const prettyms = require('pretty-ms');
module.exports.execute = async (client, message, args, Discord) => {

    let toggled = await client.antiNuke.get(`ban_${guild.id}`);

    if (toggled) {
        client.antiNuke.delete(`ban_${guild.id}`);
        message.channel.send("Turned Anti Mass Ban Off");
    } else {
        if (args[2]) {
            if (isNaN(args[0])) return message.channel.send("Not a valid limit. Please use a number for the limit");
            let limit = Number(args[0]);
            let time = ms(args[1]);
            let action = args[2].toLowerCase();
            if (!time) return message.channel.send("Not a valid duration, please do not include spaces in the time");
            if (action != "kick" || action != "ban") return message.channel.send("Not a valid action, valid actions are `ban` and `kick`");
            
            await client.antiNuke.set(`ban_${guild.id}`, true);
            await client.antiNuke.set(`${guild.id}_banLimit`, limit);
            await client.antiNuke.set(`${guild.id}_banTime`, time);
            await client.antiNuke.set(`${guild.id}_banAction`, action);

            message.channel.send(`This bot will now \`${action}\` a user if they ban \`${limit}\` guild members within \`${prettyms(time)}\``);
        } else {
            return message.channel.send("Not Enough Arguments");
        }
    }

};

module.exports.info = {
    name: 'anti-mass-ban',
    description: 'Sets the anti mass ban settings',
    aliases: ['amb', 'antimassban'],
    usage: '[limit] [duration] [action]',
    cooldown: 3,
    guildOnly: true,
    permissions: 8
};