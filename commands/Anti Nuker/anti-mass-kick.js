const ms = require("ms");
const prettyms = require('pretty-ms');
module.exports.execute = async (client, message, args, Discord) => {

    let toggled = await client.antiNuke.get(`kick_${guild.id}`);

    if (toggled) {
        client.antiNuke.delete(`kick_${guild.id}`);
        message.channel.send("Turned Anti Mass Kick Off");
    } else {
        if (args[2]) {
            if (isNaN(args[0])) return message.channel.send("Not a valid limit. Please use a number for the limit");
            let limit = Number(args[0]);
            let time = ms(args[1]);
            let action = args[2].toLowerCase();
            if (!time) return message.channel.send("Not a valid duration, please do not include spaces in the time");
            if (action != "kick" || action != "ban") return message.channel.send("Not a valid action, valid actions are `ban` and `kick`");
            
            await client.antiNuke.set(`kick_${guild.id}`, true);
            await client.antiNuke.set(`${guild.id}_kickLimit`, limit);
            await client.antiNuke.set(`${guild.id}_kickTime`, time);
            await client.antiNuke.set(`${guild.id}_kickAction`, action);

            message.channel.send(`This bot will now \`${action}\` a user if they kick \`${limit}\` guild members within \`${prettyms(time)}\``);
        } else {
            return message.channel.send("Not Enough Arguments");
        }
    }

};

module.exports.info = {
    name: 'anti-mass-kick',
    description: 'Sets the anti mass kick settings',
    aliases: ['amk', 'antimasskick'],
    usage: '[limit] [duration] [action]',
    cooldown: 3,
    guildOnly: true,
    permissions: 8
};