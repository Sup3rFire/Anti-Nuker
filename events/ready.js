module.exports = async (client) => {

    console.log("Loaded!")

    let Statuses = [
        {text: "with Super", type: "PLAYING"},
        {text: "Super click circles!", type: "WATCHING"},
        {text: "Cry Thunder", type: "LISTENING"},
        {text: "osu!", type: "STREAMING", url: "https://twitch.tv/BeastTrollMC"}
    ];
    
    setInterval(async function() {
        let status = Statuses[Math.floor(Math.random() * Statuses.length)];

        client.user
        .setPresence({ activity: { name: status.text, type: status.type, url: status.url || "none" }, status: "dnd" })
        .catch(console.error);
    }, 15000);

}