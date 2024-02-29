const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")

module.exports = {
    name: "set-simge",
    description: "Bakiye simgesini değiştirirsin.",
    type: 1,
    options: [
        {
            name: "simge",
            description: "Simgeyi Girin! (emoji)",
            type: 3,
            required: true,
        },
    ],

    run: async (client, interaction, message) => {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: "<:redcarpi:1128609008345952256> | Bu Komutu kullanma iznin Yok!", ephemeral: true })

        const simgee = interaction.options.getString('simge')





if (simgee > 32) {
            return interaction.reply({ content: `Simge çok uzun!`, ephemeral: true })
        } else {
            const bakiye = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`**${interaction.user.username}, Bakiye simgesi ${simgee} olarak değiştirildi!!**`)
            .setColor("Random")

            db.set(`bakiyeSimge_`, simgee)

            interaction.reply({ embeds: [bakiye]})
        }







    }

};
