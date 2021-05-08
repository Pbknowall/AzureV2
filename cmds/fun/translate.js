const Discord = require('discord.js');
const translate = require("translate");
const request = require("request");
const { text } = require('figlet');
translate.engine = "google"
translate.key = "6198211929msha8e4f91f561dce1p1287f8jsnb9d5923c68ce"
const langs = ['afrikaans', 'albanian', 'amharic', 'arabic', 'armenian', 'azerbaijani', 'bangla', 'basque', 'belarusian', 'bengali', 'bosnian', 'bulgarian', 'burmese', 'catalan', 'cebuano', 'chichewa', 'chinese simplified', 'chinese traditional', 'corsican', 'croatian', 'czech', 'danish', 'dutch', 'english', 'esperanto', 'estonian', 'filipino', 'finnish', 'french', 'frisian', 'galician', 'georgian', 'german', 'greek', 'gujarati', 'haitian creole', 'hausa', 'hawaiian', 'hebrew', 'hindi', 'hmong', 'hungarian', 'icelandic', 'igbo', 'indonesian', 'irish', 'italian', 'japanese', 'javanese', 'kannada', 'kazakh', 'khmer', 'korean', 'kurdish (kurmanji)', 'kyrgyz', 'lao', 'latin', 'latvian', 'lithuanian', 'luxembourgish', 'macedonian', 'malagasy', 'malay', 'malayalam', 'maltese', 'maori', 'marathi', 'mongolian', 'myanmar (burmese)', 'nepali', 'norwegian', 'nyanja', 'pashto', 'persian', 'polish', 'portuguese', 'punjabi', 'romanian', 'russian', 'samoan', 'scottish gaelic', 'serbian', 'sesotho', 'shona', 'sindhi', 'sinhala', 'slovak', 'slovenian', 'somali', 'spanish', 'sundanese', 'swahili', 'swedish', 'tajik', 'tamil', 'telugu', 'thai', 'turkish', 'ukrainian', 'urdu', 'uzbek', 'vietnamese', 'welsh', 'xhosa', 'yiddish', 'yoruba', 'zulu'];

module.exports.run = async (bot, message, args) => {

  const usage = new Discord.MessageEmbed().setColor("#007FFF").setAuthor("Translation Usage").setDescription("**Usage:** \`\`\`!!translate <language1>\* <language2> <text>\`\`\`\nExamples:\n`!!translate fr How are you?\n!!translate fr How are you?\n!!translate fr en Ça va bien?`").setFooter("*Language1 is Optional - Default Translate-from is English").setTimestamp()
  if (!args[0] || !args[1]) return message.channel.send(usage)
  let text;
  let from;
  let to;

  if (args[0].length === 2 && args[1].length === 2) {
    from = args[0]
    to = args[1]
    text = args.slice(2).join(" ").toLowerCase()
  } else {
    to = args[0]
    text = args.slice(1).join(" ").toLowerCase()
  }

  let options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
      'x-rapidapi-key': '6198211929msha8e4f91f561dce1p1287f8jsnb9d5923c68ce',
      'accept-encoding': 'application/gzip',
      'content-type': 'application/x-www-form-urlencoded',
      useQueryString: true
    },
    form: { source: from, q: text, target: to }
  }

  request(options, function (error, response, body) {
    /*if (error) throw new Error(error);*/

    let parsed = JSON.parse(body)
    if (!parsed.data) return message.channel.send(usage)
    let translation = parsed.data.translations[0].translatedText
    if (!from) from = parsed.data.translations[0].detectedSourceLanguage

    const embed = new Discord.MessageEmbed()
      .setAuthor("New Translation", message.author.avatarURL())
      .addField(`Input (${from})`, `\`\`\`${text}\`\`\``)
      .addField(`Output (${to})`, `\`\`\`${translation}\`\`\``)
      .setFooter(`English -> ${to}`)
      .setColor("#007FFF")

    message.channel.send(embed)
  })


}

module.exports.help = {
  name: "translate",
  description: "Translate any word or sentance into any language.",
  aliases: ["translate", "traduz", "lang"],
  category: "Fun"
}