const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require('croxydb')
module.exports = {
  name: "premium-al",
  description: "Belirtilen kullanıcıdan premium üyelik al!",
  type: 1,
  options: [
    {
        name: "kullanıcı",
        description: "Premiumu iptal edilicek kullanıcıyı belirtin.",
        type: 6,
        required: true
    },
  ],

  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "<:redcarpi:1128609008345952256> | Yetkili olmadan bu komutu kullanamazsın.", ephemeral: true})


    const CuseR = interaction.options.getMember('kullanıcı')
    const premiumActive = db.fetch(`premiumActive_${CuseR.id}`)



    if  (premiumActive == null) {
        return interaction.reply({content:"Bu üyede zaten premium üyelik yok!", ephemeral: true})
    }  else {
        const premiumEmbed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setColor("Random")
        .setDescription(`${CuseR} Adlı kullanıcının premium üyeliği iptal edildi!`)
        db.delete(`premiumActive_${CuseR.id}`)
        db.delete(`premiumActiveDate_${CuseR.id}`)
        interaction.reply({embeds: [premiumEmbed]})
    }



  }

};
