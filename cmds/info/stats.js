const Discord = require("discord.js");
const { version } = require("discord.js");

module.exports.run = (bot, message, args, tools) => {
  let owner; bot.fetchApplication().then(app => owner = app.owner.tag)
  const os = require('os');
  const arch = os.arch()
  const used = process.memoryUsage().heapUsed / 1024 / 1024;

  let totalSeconds = process.uptime();
  let realTotalSecs = Math.floor(totalSeconds % 60);
  let days = Math.floor((totalSeconds % 31536000) / 86400);
  let hours = Math.floor((totalSeconds / 3600) % 24);
  let mins = Math.floor((totalSeconds / 60) % 60);
  let array = [];
  client.guilds.cache.forEach(g => array.push(g.memberCount))
  let users = array.reduce((a, b) => a + b)


  let embed = new Discord.MessageEmbed()
    .setTitle("Bot Stats")
    .setColor("0ED4DA")
    .setDescription(`**Memory usage:** ${Math.round(used * 100) / 100}MB \n**Ping:** ${bot.ws.ping} \n**Uptime:** Days: ${days} | Hours: ${hours} | Minutes: ${mins} | Seconds: ${realTotalSecs} \n**Node:** ${process.version} \n**Library:** discord.js \n**Discord.js** v${version} \n**ARCH:** ${arch} \n**Platform:** ${os.platform} \n**Servers:** ${bot.guilds.cache.size} \n**Users:** ${users}\n**Creator:** ${owner ? owner : "Pbknowall#9312"}`)
    .setTimestamp()

  message.channel.send(embed)

}

module.exports.help = {
  name: 'stats',
  description: 'Gives stats.',
  aliases: ["stats", "botstats", "uptime", "up"],
  category: "Info"
}