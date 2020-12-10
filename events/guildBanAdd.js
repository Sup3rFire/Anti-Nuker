module.exports = async (client, Discord, guild, banned) => {
    if (await client.antiNuke.get(`ban_${guild.id}`)) {
        let banLimit = await client.antiNuke.get(`${guild.id}_banLimit`);
        let banTime = await client.antiNuke.get(`${guild.id}_banTime`);
        let banAction = await client.antiNuke.get(`${guild.id}_banAction`);

        let fetchAuditBan = await guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_ADD',
        });
        
        let ban = fetchAuditBan.entries.first();
    
        let { executor, target } = ban;
    
        if (target.id == banned.id) {
            if (executor.id == client.user.id) return;

            let executorBans = client.recentBan.get(`${guild.id}_${executor.id}`) + 1;

            if (executorBans >= banLimit) {
                guild.members.fetch(executor)
                .then(m => client.action(m, banAction))
            } else {
                client.recentBan.set(`${guild.id}_${executor.id}`, executorBans);
                setTimeout(() => {
                    client.recentBan.set(`${guild.id}_${executor.id}`, client.recentBan.get(`${guild.id}_${executor.id}`) - 1);
                }, banTime)
            }
        }
    }
}