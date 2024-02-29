const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"yasakla",
    description: 'Kurallara uymayan üyeleri yasaklayabilirsin.',
    type:1,
    options: [
        {
            name:"kullanıcı",
            description:"Yasaklanıcak Kullanıcıyı Belirtmelisin!",
            type:6,
            required:true
        },
        {
            name:"sebep",
            description:"Bir Sebep Belirtebilirsin! (isteğe bağlı)",
            type:3,
            required:false
        },
    ],
  run: async(client, interaction, message) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({content: "<:redcarpi:1128609008345952256> | Üyeleri Yasakla Yetkin Yok!", ephemeral: true})
    const bannedMember = interaction.options.getMember('kullanıcı')
    const bansebep = interaction.options.getString('sebep') || "belirtilmemiş";
    if(bannedMember.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({content:"<:redcarpi:1128609008345952256> | Bu Kullanıcının Ban Yetkisi Olduğu İçin Onu Yasaklayamam!   ",ephemeral:true})

    

    if(bannedMember.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content:"<:redcarpi:1128609008345952256> | Bu Kullanıcıda Yönetici Yetkisi Olduğu İçin Onu Yasaklayamam!   ",ephemeral:true})



    bannedMember.ban({reason: bansebep});



    const banonay = new EmbedBuilder()
    .setColor("Random")
    .setTitle(`**Bir Üye Yasaklandı!**`)
    .setDescription(`
        **<:banlayan:1210899205275521084> Yasaklayan Yetkili** : <@${interaction.user.id}>

        **<:banlanan:1210899203639869472> Yasaklanan Üye** : ${bannedMember}

        **<:bansebebi:1210899201844580422> Yasak Sebebi** : ${bansebep} 
        `)
        interaction.reply({embeds: [banonay]})}

};
