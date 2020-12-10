module.exports = async (client, Discord, member) => {
    if (await client.antiNuke.get(`kick_${guild.id}`)) {
        let fetchAuditKick = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_KICK',
        });

        let kick = fetchAuditKick.entries.first();

        if (kick) {

            let kickLimit = await client.antiNuke.get(`${guild.id}_kickLimit`);
            let kickTime = await client.antiNuke.get(`${guild.id}_kickTime`);
            let kickAction = await client.antiNuke.get(`${guild.id}_kickAction`);
    
            const { executor, target } = kick;
        
            if (target.id == member.id) {
                if (executor.id == client.user.id) return;
    
                let executorKicks = client.recentKick.get(`${guild.id}_${executor.id}`) + 1;
    
                if (executorKicks >= kickLimit) {
                    guild.members.fetch(executor)
                    .then(m => client.action(m, kickAction))
                } else {
                    client.recentKick.set(`${guild.id}_${executor.id}`, executorKicks);
                    setTimeout(() => {
                        client.recentKick.set(`${guild.id}_${executor.id}`, client.recentKick.get(`${guild.id}_${executor.id}`) - 1);
                    }, kickTime)
                }
            }

        }
    }
}