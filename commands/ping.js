const { Client } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Botun gecikmesini görürsün.",
    type: 1,
    options: [],

    run: async (client, interaction) => {

        await interaction.reply({ content: "Lütfen Bekleyin... <a:loadinggg:1188388883902238720>" });


        const ping = client.ws.ping;


        setTimeout(() => {
            interaction.editReply({
                content: `**Bot Gecikmesi** : ${ping} ms <:gecikme:1188389569738051654>`,
            });
        }, 2000); 
    },
};