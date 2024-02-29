const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "yardım",
    description: "Yardım mı lazım? Ben yardımcı olayım!",
    type: 1,
    options: [],

    run: async (client, interaction) => {

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("1179385886262181888")
                    .setLabel("Ekonomi Komutları")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId("ekoKomutlar_" + interaction.user.id)
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("1173199242475610212")
                    .setLabel("Diğer Komutlar")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId("digerKomutlar_" + interaction.user.id)
            )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("1129339301918937149")
                    .setLabel("Yetkili Komutları")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId("yetkiliKomutlar_" + interaction.user.id)
            )
            .addComponents(
                new Discord.ButtonBuilder()
                .setLabel('Bot Yaptırmak İçin Gel!')
                .setStyle('Link')
                .setEmoji('1212407942783967252')
                .setURL('https://discord.gg/fmeYuqYv5H')
             )
            .addComponents(
                new Discord.ButtonBuilder()
                    .setEmoji("1173188126064259123")
                    .setLabel("İptal Et")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId(".phClear_" + interaction.user.id)
            )
            

                const profilEmbed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                .setDescription(`<@${interaction.user.id}>, Hangi konuda yardıma ihtiyacın var? Lütfen aşağıdaki butonları kullan.`)
                .setColor("DarkNavy")
                .setFooter({text: "Bot yaptırmak için aşağıdaki butondan sunucumuza katılabilirsin!"})


        interaction.reply({ embeds: [profilEmbed], components: [row] })

    }

};
