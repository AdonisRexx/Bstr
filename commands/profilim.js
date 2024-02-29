const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "profilim",
    description: "BSTR Profiline bakarsın!",
    type: 1,
    options: [],

    run: async (client, interaction) => {

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("1179385886262181888")
                    .setLabel("Ekonomi Verileri")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId("ekonomiVeri_" + interaction.user.id)
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("1173188124541714492")
                    .setLabel("Kullanıcı Verileri")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId("kullaniciVeri_" + interaction.user.id)
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("1173188126064259123")
                    .setLabel("Mesajı Sil")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId(".phClear_" + interaction.user.id)
            )

                const profilEmbed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                .setDescription(`<@${interaction.user.id}>, Verilerini görmek için aşağıdaki butonları kullan!`)
                .setColor("Aqua")

        interaction.reply({ embeds: [profilEmbed], components: [row] })

    }

};
