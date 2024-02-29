const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"rol-ver",
    description: 'Etiketlediğin kullanıcıya rol verir.',
    type:1,
    options: [
        {
            name:"user",
            description:"Kime rol vermek istiyorsun.",
            type:6,
            required:true
        },
        {
            name:"rol",
            description:"Vermek istediğin rolü seç.",
            type:8,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "Yetkili olmadan bu komutu kullanamazsın!", ephemeral: true})
    const rol = interaction.options.getRole('rol')
    const user = interaction.options.getMember('user')
    interaction.guild.members.cache.get(user.id).roles.add(rol)
    interaction.reply({content: "<:banlayan:1210899205275521084> | <@"+user+"> Kullanıcısına <@&"+rol.id+"> Rolü Verdim."})
}

};