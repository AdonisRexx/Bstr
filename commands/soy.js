const { Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
const ms = require('ms')

module.exports = {
    name: "soy",
    description: "Para çalarsın!",
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Parasını çalmak istediğin kullanıcıyı etiketle!",
            type: 6,
            required: true
        },
    ],

    run: async (client, interaction, message) => {

        const user = interaction.user;
        const lastDaily = db.get(`lastÇalmak_${user.id}`);
        const beklee = db.fetch(`lastÇalmak_${user.id}`)
        const bakiyeSimge = db.fetch(`bakiyeSimge_`)

        const saldırılanK = interaction.options.getMember('kullanıcı')

        // TİMEOUT SİSTEMİ
        if (lastDaily && Date.now() - lastDaily < 21600000) {
            interaction.reply({ content: `Daha <t:${parseInt(beklee / 1000)}:R> para çalmışsın, Tekrar çalmak için __6 (altı)__ saat beklemelisin!`, ephemeral: true });
            return;
        }

        const kullaniciBakiye = db.fetch(`para_${saldırılanK.id}`) || 0;
        const authorBakiye = db.fetch(`para_${interaction.user.id}`) || 0;

        // TİMEOUT BİTİŞ
        const kazanılanPara = (Math.floor(Math.random() * 1000 + 1));


        if (saldırılanK.id == interaction.user.id ) {
            return interaction.reply({content: 'Kendini niye soymaya çalışıyorsun la?', ephemeral: true});
          }
        if (kullaniciBakiye < 0) {
            return interaction.reply({content: 'Yetersiz bakiye', ephemeral: true});
          }
        if (kullaniciBakiye == 0) {
            return interaction.reply({ content: `Parası olmayan kullanıcıyı soymaya çalıştığın için **500**${bakiyeSimge} ceza yedin!`, ephemeral: true }),
                db.subtract(`para_${interaction.user.id}`, 500)
        }
        if (kullaniciBakiye < 1500) {
            return interaction.reply({ content: `Fakir bi kullanıcıyı soymaya çalıştığın için **500**${bakiyeSimge} ceza yedin!`, ephemeral: true }),
                db.subtract(`para_${interaction.user.id}`, 500)
        }
        if (authorBakiye < 500) {
            return interaction.reply({ content: `Bu kullanıcıyı soymadan önce 500${bakiyeSimge}\'e sahip olmalısın.`, ephemeral: true })
        } else {
            const basariliEmbed = new EmbedBuilder()
                .setTitle(`İyi İş Çıkardın!`)
                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setDescription(`${saldırılanK} adlı kullanıcıyı soydun ve ${kazanılanPara}${bakiyeSimge} kazandın!`)
                .setColor('Random')
            interaction.reply({ embeds: [basariliEmbed] })
            db.add(`para_${interaction.user.id}`, kazanılanPara)
            db.subtract(`para_${saldırılanK.id}`, kazanılanPara)
            setTimeout(() => {
                db.set(`lastÇalmak_${user.id}`, Date.now());
            }, 1000);

        }



    }
};

