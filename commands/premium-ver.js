const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require('croxydb')
module.exports = {
  name: "premium-ver",
  description: "Belirtilen kullanıcıya premium üyelik ver!",
  type: 1,
  options: [
    {
        name: "kullanıcı",
        description: "Premium verilecek kullanıcıyı belirtin.",
        type: 6,
        required: true
    },
  ],

  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "<:redcarpi:1128609008345952256> | Yetkili olmadan bu komutu kullanamazsın.", ephemeral: true})


    const CuseR = interaction.options.getMember('kullanıcı')
    const premiumActive = db.fetch(`premiumActive_${CuseR.id}`)



    if (CuseR == premiumActive) {
        return interaction.reply({content:"Bu kullanıcının zaten bir premium üyeliği var!", ephemeral: true})
    }  else {
        const premiumEmbed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setDescription(`${CuseR} Adlı kullanıcıya premium üyelik verildi!`)
        .setColor("Random")
        db.set(`premiumActive_${CuseR.id}`, CuseR.id)
        db.set(`premiumActiveDate_${CuseR.id}`, { date: Date.now() })
        interaction.reply({embeds: [premiumEmbed]})
    }



  }

};
