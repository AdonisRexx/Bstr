const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
  name: "sunucu-link",
  description: "BSTR Topluluğunun discord sunucu linkini atar.",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const row = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
          .setEmoji("1173188126064259123")
          .setLabel("Mesajı Sil")
          .setStyle(Discord.ButtonStyle.Secondary)
          .setCustomId(".phClear_" + interaction.user.id)
  )


    const bstr = new EmbedBuilder()
    .setColor("Purple")
    .setTitle(`**BSTR Topluluğuna Katıl!**`)
    .setDescription(`ᐅ [**Tıkla Ve BSTR Topluluğuna Katıl!!**](https://discord.gg/brawlstarsturkiye) ᐊ`)
    .setThumbnail('https://cdn.discordapp.com/attachments/1180506583743090738/1183380629547667516/IMG_20231209_180240.png?ex=65882018&is=6575ab18&hm=d467349dba887045372e26bf116005ee75c3d6ae3c4eb4787b98237db3117614&')
    .setImage('https://cdn.discordapp.com/attachments/1180506583743090738/1183380950390947941/Picsart_23-12-09_17-31-23-178.png?ex=65882064&is=6575ab64&hm=8e1d6ed2a0ea73f2b82c847525fc3d3212e6066b76a2a8306a9760ef06bbd124&')
    .setTimestamp()


    interaction.reply({content: '', embeds: [bstr], components: [row]})

  }

};
