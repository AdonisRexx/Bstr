const { Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
    name: "para",
    description: "Bir kullanıcının parasına bakarsın.",
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Kullanıcı etiketle",
            type: 6,
            required: false
        } 
    ],

    run: async (client, interaction) => {
        const userr = interaction.options.getMember("kullanıcı") || interaction.user;


        const parasayisi = db.fetch(`para_${userr.id}`) || 0;
        const bankasayi = db.fetch(`banka_${userr.id}`) || 0;
        const parasayisi1 = db.fetch(`para_${interaction.user.id}`) || 0;
        const bankasayi1 = db.fetch(`banka_${interaction.user.id}`) || 0;
        const bakiyeSimge = db.fetch(`bakiyeSimge_`) || "";

        let bakiyex;

            bakiyex = new EmbedBuilder()
                .setAuthor({ name: `${userr.username}`, iconURL: userr.displayAvatarURL({ dynamic: true }) })
                .setDescription(`**${userr} Bakiye: ${parasayisi}${bakiyeSimge}** \n**Bankadaki Para: ${bankasayi}${bakiyeSimge}**`)
                .setColor("Random");

        interaction.reply({ embeds: [bakiyex] });
    }
};