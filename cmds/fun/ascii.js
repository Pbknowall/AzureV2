const Discord = require("discord.js");
const figlet = require("figlet");

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send("Please input text to turn into AsciiText");
    figlet(args.slice(0).join(" "), function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        message.channel.send(data, {
            code: "AsciiDoc"
        }).catch(() => message.channel.send("Your message is too long!"))
    });
}

module.exports.help = {
    name: "ascii",
    description: "Turn text into Ascii text.",
    aliases: ["format", "ascii", "style"],
    category: "Fun"
}