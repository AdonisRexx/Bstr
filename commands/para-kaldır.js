const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name: "para-kaldır",
    description: "Bir kullanıcıdan para silersin.",
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
        const userCash = db.fetch(`para_${userr.id}`)

        if (sayi > 1000000) { return interaction.reply ({content: `Tek seferde sadece 1m${bakiyeSimge} kaldırabilirsin!`, ephemeral: true}) }
        if (sayi < 1000) { return interaction.reply ({content: `Minimum 1k${bakiyeSimge} kaldırmalısın.!`, ephemeral: true}) }
        if (sayi > userCash) { return interaction.reply ({content: `Kaldırmak istediğin miktar kullanıcının para miktarını aşıyor!`, ephemeral: true}) }

       
        const bakiye = new EmbedBuilder()
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setDescription(`<@${userr.id}>'in hesabından ${sayi}${bakiyeSimge} silindi!`)
        .setColor("Random")

        interaction.reply({embeds: [bakiye]})

            db.subtract(`para_${userr.id}`, sayi)



    }

};

