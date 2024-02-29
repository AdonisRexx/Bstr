const db = require("croxydb");
const { PermissionFlagsBits, EmbedBuilder, Events  } = require("discord.js");

module.exports =  {
  name: Events.MessageUpdate,

  run: async(client, oldMsg, newMsg) => {

    if(!db.fetch(`modlogK_${oldMsg.guild.id}`)) return;

    const myDb = {
      kanal:   db.fetch(`modlogK_${oldMsg.guild.id}`)
     }
//
     const { kanal } = myDb;
    
    const embed = new EmbedBuilder()
    .setColor("Yellow")
    .addFields(
      { name: "**Kullanıcının İsim** <:phUsers:1173199238394552422>", value: oldMsg.author.username, inline: false},

      { name: "**Eski Mesaj** <:ChatMessage:1189605140018241586>", value: "" + oldMsg.content + "", inline: false  },

      { name: "**Yeni Mesaj** <:ChatMessage:1189605140018241586>", value: "" + newMsg.content + "", inline: false},

      { name: "**Düzenlendiği Zaman** <:Time:1189605144359350413>", value: `<t:${parseInt(Date.now() / 1000)}:R>`, inline: true },

      { name: "**Düzenlendiği Kanal** <:Channel:1189605146838192270>", value:"<#"+ newMsg.channel +">", inline: true },
      
      { name: "**Mesaj Linki <:url:1189605142824230952> **", value: "" + newMsg.url + "", inline: true }
    )
    client.channels.cache.get(kanal).send({content: `<@${oldMsg.author.id}> ${newMsg.channel} Kanalında Bir Mesaj Düzenledi!`, embeds: [embed] })
  }
}