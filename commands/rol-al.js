const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"rol-al",
    description: 'Etiketlediğin kullanıcıdan rol silersin.',
    type:1,
    options: [
        {
            name:"user",
            description:"Kimden rol almak istiyorsun.",
            type:6,
            required:true
        },
        {
            name:"rol",
            description:"Kaldırılacak rolü seç.",
            type:8,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "<:carpi:1040649840394260510> | Yetkili olmadan komutu kullanamazsın!", ephemeral: true})
    const rol = interaction.options.getRole('rol')
    const user = interaction.options.getMember('user')
    interaction.guild.members.cache.get(user.id).roles.remove(rol)
    interaction.reply({content: "<:banlayan:1210899205275521084> | <@"+user+"> Kullanıcısının <@&"+rol.id+"> Rolünü Aldım!"})
}

};