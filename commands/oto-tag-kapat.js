const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"oto-tag-kapat",
    description: 'Oto-tag sistemini silebilirsin!',
    type:1,
    
    options: [],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "<:redcarpi:1128609008345952256> | Yönetici Yetkin Yok!", ephemeral: true})
    db.delete(`ototag_${interaction.guild.id}`)
    interaction.reply({content: "<:onaytik:1128607181441355806> | Başarıyla sistemi sıfırladım!"})
}

};
