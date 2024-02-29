const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"moderasyon",
    description: 'Log sistemini ayarlarsın!',
    type:1,
    options: [
        {
            name: "kanal",
            description: "Mod logunu ayarlarsın!",
            type: 7,
            required: true,
            channel_types: [0]
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "<:redcarpi:1128609008345952256> | Yönetici Yetkin Yok!", ephemeral: true})
    const kanal2 = interaction.options.getChannel('kanal')
    db.set(`modlogK_${interaction.guild.id}`, kanal2.id)
   interaction.reply("<:onaytik:1128607181441355806> | Moderasyon kanalı <#"+kanal2+"> olarak ayarlandı!")
}

};
