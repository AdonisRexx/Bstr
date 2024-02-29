const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
module.exports = {
  name: "oto-cevap",
  description: "Oto Cevap sistemi ayarlanır.",
  type: 1,
  options: [
    {
        name: "soru",
        description: "Lütfen bir soru girin.",
        type: 3,
        required: true
    },
    {
      name: "cevap",
      description: "Lütfen bir cevap girin.",
      type: 3,
      required: true
  },
   
   
],

  run: async(client, interaction) => {
 
  if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "<:redcarpi:1128609008345952256> | Yönetici Yetkin Yok!", ephemeral: true})
  
  const soru = interaction.options.getString('soru')
  const cevap = interaction.options.getString('cevap')

  db.set(`soruMesaj_${interaction.guild.id}_${soru}`, { soru: soru, cevap: cevap })
  interaction.reply({ content: `<:onaytik:1128607181441355806> | Oto Cevap Başarıyla Ayarlandı!` ,ephemeral: true})

  }

};