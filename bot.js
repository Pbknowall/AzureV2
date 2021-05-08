const Discord = require("discord.js");
const fs = require("fs");
const cmds = "./cmds/";
const bot = new Discord.Client({ disableEveryone: true, partials: ['MESSAGE', 'REACTION'] });
bot.commands = new Discord.Collection();
bot.snipes = new Discord.Collection();
bot.queue = new Map();

fs.readdirSync(cmds).forEach(folder => {
  fs.readdir(`./cmds/${folder}`, (err, folders) => {
    if (err) console.log(err);
    let jsfiles = folders.filter(f => f.split(".").pop() === "js")
    if (jsfiles.length <= 0) {
      console.log("Couldn't find commands.");
    }

    jsfiles.forEach(f => {
      let props = require(`./cmds/${folder}/${f}`);
      console.log(`${f} loaded!`);
      bot.commands.set(props.help.name, props);
    });
  });
})

fs.readdir("./events/", (err, files) => {
  if (err) return console.log(err)
  files.forEach(file => {
    const event = require(`./events/${file}`)
    const eventName = file.split(".")[0]
    bot.on(eventName, event.bind(null, bot))
    delete require.cache[require.resolve(`./events/${file}`)]
  })
})
bot.login(process.env.DISCORD_TOKEN)