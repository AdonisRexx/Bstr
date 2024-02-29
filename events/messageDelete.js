const db = require("croxydb");
const { PermissionFlagsBits, EmbedBuilder, Events  } = require("discord.js");

module.exports =  {
  name: Events.MessageDelete,

  run: async(client, message) => {
    let kanal = db.get(`modlogK_${message.guild.id}`)
    try {
    const embed = new EmbedBuilder()
    .setColor("Random")
    .addFields(
      { name: "**Kullanıcı İsim** <:phUsers:1173199238394552422>", value: message.author.tag, inline: false },

      { name: "**ID** <:phUsers:1173199238394552422>", value: message.author.id, inline: false  },

      { name: "**Silinen Mesaj** <:ChatMessage:1189605140018241586>", value: "" + message.content + "", inline: false  },

      { name: "**Silindiği Zaman** <:Time:1189605144359350413>", value: `<t:${parseInt(Date.now() / 1000)}:R>`, inline: true }
        )
    client.channels.cache.get(kanal).send({content: `<@${message.author.id}> ${message.channel} Kanalında Bir Mesaj Sildi!`, embeds: [embed] })
  } catch(err) { }
  }
}