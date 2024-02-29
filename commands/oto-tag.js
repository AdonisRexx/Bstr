const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"oto-tag",
    description: 'Sunucuya üye katılınca belirtilen tagı otomatik verir.',
    type:1,
    options: [
        {
            name:"tag",
            description:"Lütfen bir tag girin!",
            type:3,
            required:true
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "<:redcarpi:1128609008345952256> | Yönetici Yetkin Yok!", ephemeral: true})
    const tag = interaction.options.getString('tag')
    db.set(`ototag_${interaction.guild.id}`, tag)
    interaction.reply({content: "<:onaytik:1128607181441355806> | Başarıyla tagı "+tag+" olarak ayarladım!"})
}

};
