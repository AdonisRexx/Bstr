const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require('croxydb')
module.exports = {
  name: "premium-kullan",
  description: "Özel premium üyelik ödüllerini alırsın!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    let user = interaction.user;


    const premiumActive = db.fetch(`premiumActive_${user.id}`)
    const zatenalmis = db.fetch(`premiumRewardCollected_${user.id}`)
    const bakiyeSimge = db.fetch(`bakiyeSimge_`)


    if (user == zatenalmis) {
        return interaction.reply({content:"Zaten premium üyelik ödülünü almışsın!", ephemeral: true})
    } 
    if  (premiumActive == null) {
        return interaction.reply({content:"Premium üyeliğin yok, ödülü alamazsın!", ephemeral: true})
    }  else {
        const premiumEmbed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setColor("Random")
        .setDescription(`${user}, premium üyelik ödülün verildi! 
        <:mavi_cizgi:1129341764289957971><:mavi_cizgi:1129341764289957971><:mavi_cizgi:1129341764289957971><:mavi_cizgi:1129341764289957971><:mavi_cizgi:1129341764289957971>
        **ÖDÜL**
        350K${bakiyeSimge}
        <:mavi_cizgi:1129341764289957971><:mavi_cizgi:1129341764289957971><:mavi_cizgi:1129341764289957971><:mavi_cizgi:1129341764289957971><:mavi_cizgi:1129341764289957971>

        `)
        
        db.set(`premiumRewardCollected_${user.id}`, user.id)
        db.add(`para_${user.id}`, 350000)
        interaction.reply({embeds: [premiumEmbed]})
    }



  }

};
