const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "banka-yatır",
  description: "Bankaya para ekleyebilirsin!",
  type: 1,
  options: [
    {
      name: "para_sayısı",
      description: "Bankaya yatırılacak miktarı girin.",
      required: true,
      type: 3
    },
  ],

  run: async (client, interaction, message) => {

    const sayi = interaction.options.getString('para_sayısı')
    const bakiyeSimge = db.fetch(`bakiyeSimge_`)


    const paramiktar = db.fetch(`para_${interaction.user.id}`)
    const parayok = db.fetch(`para_${interaction.user.id}`) == null

    if (sayi > 100000) return interaction.reply({ content: `Bankaya tek seferde en fazla 100k${bakiyeSimge} yatırabilirsin!`, ephemeral: true })
    if (db.fetch(`para_${interaction.user.id}`) == 0) return interaction.reply({ content: `Hata: Paran yok!**`, ephemeral: true })
    if (db.fetch(`para_${interaction.user.id}`) < 1) {
      interaction.reply({ content: `Bu parayı yatıramazsın!`, ephemeral: true })
    }
    if (sayi > paramiktar) return interaction.reply({ content: `Bu işlem para miktarını aşıyor!`, ephemeral: true })

    if (parayok) {
      interaction.reply({ content: `Paran Yok! Bankaya Ne Yatıracaksın...`, ephemeral: true })
    }
    if (db.fetch(`para_${interaction.user.id}`) < 200) {
      interaction.reply({ content: `Paran çok az Bankayı kullanmak için 200${bakiyeSimge} 'e ihtiyacın var!`, ephemeral: true })
    }
    else {
      const bakiye = new EmbedBuilder()
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`<@${interaction.user.id}> Bankaya ${sayi}${bakiyeSimge} yatırdın!`)
        .setColor("Random")
      interaction.reply({ embeds: [bakiye] })

      db.add(`banka_${interaction.user.id}`, sayi)
      db.subtract(`para_${interaction.user.id}`, sayi)

    }

  }

};
