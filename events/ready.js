const fs = require("fs");

module.exports = (bot) => {
    let array = [];
    client.guilds.cache.forEach(g => array.push(g.memberCount))
    let users = array.reduce((a, b) => a + b)
    
    console.log(`Online as ${bot.user.tag} on ${bot.guilds.cache.size} servers.`)
    let serverss = `\"${bot.guilds.cache.size} Servers\"`
    bot.guilds.cache.each(g => {
        serverss = `${serverss}\n"${g.name}" - [${g.memberCount} Members] - (${g.id})`
    })
    fs.writeFile('./servers.txt', serverss, (err) => {
        if (err) throw err;
    })

    const activities = [
        /*`"help`,
        `${bot.users.cache.size} Users in ${bot.guilds.cache.size} Servers`,
        `Azure Beta - Release This Week!`,
        `New Features`*/
        `!!help`,
        `${users} Users in ${bot.guilds.cache.size} Servers`,
        `V2 -|- !!whatsnew`
    ]
    setInterval(function () {
        var activityid = Math.floor(Math.random() * (activities.length));
        bot.user.setActivity(activities[activityid], { type: "WATCHING" })
    }, 8000)
}