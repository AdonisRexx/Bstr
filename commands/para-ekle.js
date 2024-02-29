const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name: "para-ekle",
    description: "Bir kullanıcıya para eklersin.",
    type: 1,
    options: [
        {
            name: "kullanici",
            description: "Kullanıcıyı belirtin.",
            type: 6,
            required: true
            },
        {
            name: "para_sayısı",
            description: "Kaç bakiye eklemek istiyorsun? ",
            required: true,
            type: 3
        },
    ],

    run: async (client, interaction, message) => {
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "<:redcarpi:1128609008345952256> | Yetkili olmadan bu komutu kullanamazsın.", ephemeral: true})


        const sayi = interaction.options.getString('para_sayısı')
        const bakiyeSimge = db.fetch(`bakiyeSimge_`)
        const userr = interaction.options.getMember('kullanici')


        if (sayi > 1000000) { return interaction.reply ({content: `Tek seferde sadece 1m${bakiyeSimge} ekleyebilirsin!`, ephemeral: true}) }
        if (sayi < 1000) { return interaction.reply ({content: `Minimum 1k${bakiyeSimge} eklemelisin!`, ephemeral: true}) }

       
        const bakiye = new EmbedBuilder()
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setDescription(`<@${userr.id}>'in hesabına ${sayi}${bakiyeSimge} tanımlandı!`)
        .setColor("Random")

        interaction.reply({embeds: [bakiye]})

            db.add(`para_${userr.id}`, sayi)



    }

};

