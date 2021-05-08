const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  const m = await message.channel.send('Measuring Ping...')

  /*let rounded = `${Math.floor(process.uptime())}`
  console.log(ms(Math.floor(totalSeconds), { long: true } + "s"))*/


  let totalSeconds = process.uptime();
  let realTotalSecs = Math.floor(totalSeconds % 60);
  let days = Math.floor((totalSeconds % 31536000) / 86400);
  let hours = Math.floor((totalSeconds / 3600) % 24);
  let mins = Math.floor((totalSeconds / 60) % 60);

  let embed = new Discord.MessageEmbed()
    .setColor("#007FFF")
    .setTitle("Current Bot Statistics")
    .setDescription(`:arrows_counterclockwise: **Message Round-Trip:** ${m.createdTimestamp - message.createdTimestamp}ms \n:heartbeat: **One-Way:** ${~~bot.ws.ping}ms \n:timer: **Uptime:** ${days} days, ${hours} hours, ${mins} minutes, ${realTotalSecs} seconds`)
    .setTimestamp(message.createdAt);

  await m.delete().then(() => message.channel.send(embed))
}


module.exports.help = {
  name: 'ping',
  description: 'Displays the ping of the bot.',
  aliases: ["ping", "ms", "ws", "uptime"],
  category: "Info"
}