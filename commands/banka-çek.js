const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")

module.exports = {
  name: "banka-çek",
  description: "Bankandan para çekersin!",
  type: 1,
  options: [
    {
        name: "para_sayısı",
        description: "Bankadan çekilecek miktarı girin.",
        required: true,
        type: 3
    },
  ],

  run: async(client, interaction, message) => {

    const sayi = interaction.options.getString('para_sayısı')
    const paramiktar = db.fetch(`banka_${interaction.user.id}`)
    const bakiyeSimge = db.fetch(`bakiyeSimge_`)
    const bankadayok = db.fetch(`banka_${interaction.user.id}`)


    if (sayi > 100000) return interaction.reply({content: `Bankadan tek seferde 100k çekebilirsin!`, ephemeral: true})
    if (sayi < 10) return interaction.reply({content: `Bankadan minimum 10${bakiyeSimge} çekmelisin!`, ephemeral: true})
    if (sayi > paramiktar) return interaction.reply({content: `Bu işlem para miktarını aşıyor!`, ephemeral: true})

    

    if  (bankadayok == null) {
      return interaction.reply({ content: `Bankada paran yok! Ne çekiceksin...`, ephemeral: true })
    }
    if (db.fetch(`banka_${interaction.user.id}`) == 0) {
        interaction.reply({ content: `Bankada paran yok, para çekemezsin!`, ephemeral: true })
    }
    if  (db.fetch(`banka_${interaction.user.id}`) < 1) {
      interaction.reply({ content: `Bu parayı çekemezsin!`, ephemeral: true })
    }
    else {
        const bakiye = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`<@${interaction.user.id}> Bankadan ${sayi}${bakiyeSimge} çektin!`)
            .setColor("Random")
        interaction.reply({ embeds: [bakiye] })

        db.subtract(`banka_${interaction.user.id}`, sayi)
        db.add(`para_${interaction.user.id}`, sayi)

    }

  }

};
