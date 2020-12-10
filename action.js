module.exports = async (member, action) => {
    switch (action) {
        case "ban":
            if (!member.bannable) return console.log("Not Enough Permissions");
            member.ban({ reason: "Anti Nuker" });
            break;
        case "kick":
            if (!member.kickable) return console.log("Not Enough Permissions");
            member.kick("Anti Nuker");
            break;
    
        default:
            console.log("Invalid Action");
            break;
    }
}