const { Client, EmbedBuilder } = require("discord.js");
const db = require('croxydb');
const Discord = require('discord.js')

module.exports = {
    name: "leaderboard",
    description: "Liderlik sıralamasına bakarsın!",
    type: 1,
    options: [],
    run: async (client, interaction) => {

        const bakiyeSimge = db.fetch(`bakiyeSimge_`);

        const guildMembers = await interaction.guild.members.fetch();
        let sayi = 1;

        let content = guildMembers
            .filter(member => db.fetch(`para_${member.id}`) || 0)
            .sort((a, b) => (db.fetch(`para_${b.id}`) || 0) - (db.fetch(`para_${a.id}`) || 0))
            .map((member) => {
                return `${sayi++}. **<@${member.user.id}>** : ${db.fetch(`para_${member.id}`) || 0}${bakiyeSimge}`;
            });

            const row = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setEmoji("1173188126064259123")
                .setLabel("Mesajı Sil")
                .setStyle(Discord.ButtonStyle.Secondary)
                .setCustomId(".phClear_" + interaction.user.id)
            )

        const leaderBoardEmbed = new EmbedBuilder()
            .setTitle(`En Çok Parası Olan Kullanıcılar (Top 10)`)
            .setDescription(`${content.slice(0, 10).join("\n")}`)
            .setColor("Random");

        await interaction.reply({ embeds: [leaderBoardEmbed] , components: [row]});
    }
};