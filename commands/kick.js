const { PermissionsBitField } = require("discord.js");
module.exports = {
    name:"at",
    description: 'İstediğin kullanıcıyı kickleyebilirsin!',
    type:1,
    options: [
        {
            name:"user",
            description:"Atılacak Kullanıcıyı Seçin.",
            type:6,
            required:true
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply({content: "<:redcarpi:1128609008345952256> | Üyeleri At Yetkin Yok!", ephemeral: true})
    const user = interaction.options.getMember('user')
    if(user.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply({content:"<:redcarpi:1128609008345952256> | Bu Kullanıcının Kullanıcıları Atma Yetkisi Olduğu İçin Onu Sunucudan Atamam.",ephemeral:true})
    if(user.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content:"<:redcarpi:1128609008345952256> | Bu Kullanıcının Yönetici Yetkisi Olduğu İçin Onu Sunucudan Atamam.",ephemeral:true})
    user.kick();
    interaction.reply({content: `<:banlayan:1210899205275521084> | ${user} Sunucudan atıldı!`})
}

};
