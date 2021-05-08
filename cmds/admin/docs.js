module.exports.run = async (bot, message, args) => {
    const fetch = require("node-fetch");
    const query = args.join(" ");
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`
    fetch(url)
        .then((res) => res.json())
        .then(embed => {
            if (embed && !embed.error) {
                message.channel.send({ embed });
            } else {
                message.channel.send(":x: Nothing Found!")
            }
        }).catch((e) => {
            message.reply("An Error Occurred");
        });
}

module.exports.help = {
    name: "docs",
    description: "Search the Discord.js Docs",
    aliases: ["docs", "djs", "doc"],
    category: "Admin"
}