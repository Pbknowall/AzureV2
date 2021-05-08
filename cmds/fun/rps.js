const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!args[0]) return message.reply("Usage: `!!rps [rock/paper/scissors]`")
  
let rps = [
  'Rock',
  'Paper',
  'Scissors'
  ];
  
  let result = Math.floor((Math.random() * rps.length));
  let rpsplayer = args.slice(0).join(" ");
  let lowercase = args[0].toLowerCase();
  
  let rpsembed = new Discord.MessageEmbed()
  .setColor("#007FFF")
  .setTitle("Rock, Paper, Scissors!")
  .addField("You chose:", rpsplayer)
  .addField("I chose:", rps[result])
  
  message.channel.send(rpsembed)
  
  if(rps[result] === 'Rock' && lowercase === "rock") return message.reply("Well look at that! We both chose rock so it's tied.")
  if(rps[result] === 'Rock' && lowercase === "scissors") return message.reply("Haha, I won!")
  if(rps[result] === 'Rock' && lowercase === "paper") return message.reply("GG, you won!")
  
  if(rps[result] === 'Scissors' && lowercase === "rock") return message.reply("GG, you won!")
  if(rps[result] === 'Scissors' && lowercase === "scissors") return message.reply("Well look at that! We both chose scissors so it's tied.")
  if(rps[result] === 'Scissors' && lowercase === "paper") return message.reply("Haha, I won!")
  
  if(rps[result] === 'Paper' && lowercase === "rock") return message.reply("Haha, I won!")
  if(rps[result] === 'Paper' && lowercase === "scissors") return message.reply("GG, you won!")
  if(rps[result] === 'Paper' && lowercase === "paper") return message.reply("Well look at that! We both chose paper so it's tied.")
  
}

module.exports.help = {
  name: "rps",
  description: "Play a game of rock-paper-scissors.",
  aliases: ["rps", "rockpaperscissors", "rock-paper-scissors"],
  category: "Fun"
}