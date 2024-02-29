const { Client, EmbedBuilder, PermissionsBitFieldBitField, embedLength } = require("discord.js");
const db = require("croxydb")
const ms = require('ms')

module.exports = {
    name: "saatlik",
    description: "Saatlik Ödülünü Alırsın!",
    type: 1,
    options: [],

    run: async (client, interaction, message) => {

        const user = interaction.user;
        const lastDaily = db.get(`lastHour_${user.id}`);
        const beklee = db.fetch(`lastHour_${user.id}`)
        const bakiyeSimge = db.fetch(`bakiyeSimge_`)

    
        if (lastDaily && Date.now() - lastDaily < 3600000) {
          interaction.reply({content: `Saatlik ödülünü zaten <t:${parseInt(beklee / 1000)}:R> almışsın! Tekrar alabilmek için __bir__ saat beklemelisin.`, ephemeral: true});
          return;
        }
    
        const hours = 100; // Günlük ödül miktarı (örneğin, 100 para birimi)
    
        db.add(`para_${interaction.user.id}`, hours)

    
        // Belirli bir süre sonra tekrar ödül alabilmesi için settimeout kullanılabilir
        setTimeout(() => {
          db.set(`lastHour_${user.id}`, Date.now());
        }, 1000);

        const parasayisi = db.fetch(`para_${interaction.user.id}`) 
        const bankasayi = db.fetch(`banka_${interaction.user.id}`)


    
        const günlükEmbed = new EmbedBuilder()
        .setColor("DarkGreen")
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setDescription(`${user} Başarıyla saatlik ödülünü aldın! \n**Alınan Ödül**: ${hours}${bakiyeSimge}\n**Bankadaki Paran**: ${bankasayi ?? 0}${bakiyeSimge} \n**Toplam Para**: ${parasayisi ?? 0}${bakiyeSimge}`)


        interaction.reply({embeds: [günlükEmbed]})
      }
};

