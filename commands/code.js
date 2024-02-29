const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js")
const db = require('croxydb')

module.exports = {
    name: "code",
    description: "Kod Kullanabilirsin!",
    type: 1,
    options: [
        {
            name: "kod",
            description: "Sana verilen özel kodu yaz!",
            type: 3,
            required: true
        },
    ],

    run: async (client, interaction) => {
{
        const code = interaction.options.getString('kod')
        const reedemCode = db.fetch(`secretCodeReedem_${interaction.user.id}`)
        const CodeBstr = db.fetch(`bstrSecretCode`)
        const bakiyeSimge = db.fetch(`bakiyeSimge_`)



        if (reedemCode) { return interaction.reply({ content: "Bu Kodu Kullanmışsın!", ephemeral: true }) }



        if (code == CodeBstr) {
            const basarili = new Discord.EmbedBuilder()
                .setColor("DarkGreen")
                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTitle(`Özel Kodunu Başarıyla Kullandın!`)
                .setDescription(`Hesabına 15000${bakiyeSimge} Yatırıldı!`)
            interaction.reply({ embeds: [basarili], ephemeral: true })
            db.set(`secretCodeReedem_${interaction.user.id}`, `${interaction.user.id}`)
            db.add(`para_${interaction.user.id}`, 15000)
        } else {
             interaction.reply({ content: `Bu kod geçerli değil!`, ephemeral: true })
        } 



    }
    }
};
