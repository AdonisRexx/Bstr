const { Client, EmbedBuilder, PermissionsBitFieldBitField, embedLength } = require("discord.js");
const db = require("croxydb")
const ms = require('ms')

module.exports = {
    name: "çalış",
    description: "Çalışarak para kazanabilirsin.",
    type: 1,
    options: [],

    run: async (client, interaction, message) => {


        const user = interaction.user;
        const bakiyeSimge = db.fetch(`bakiyeSimge_`)


        // KOMUT TİMEOUT SİSTEMİ
        const lastDaily = db.get(`workUser_${user.id}`);
        const beklee = db.fetch(`workUser_${user.id}`)

        if (lastDaily && Date.now() - lastDaily < 33000) {
            interaction.reply({ content: `Daha <t:${parseInt(beklee / 1000)}:R> çalıştın ve yorgunsun! Tekrar çalışabilmek için __32__ saniye beklemelisin.`, ephemeral: true });
            return;
        }
        setTimeout(() => {
            db.set(`workUser_${user.id}`, Date.now());
        }, 1000);
        // TİMEOUT ENDED

        const randomWCash = (Math.floor(Math.random() * 2500 + 1));



        var workMessages = [
            `Spike\'a kaktüs yetiştirmede yardım ettin ve ${randomWCash}${bakiyeSimge} kazandın. <:bstr_spike:1179429408956743772>`,
            `Squeak ile yapay bomba hazırlayıp sattın ve ${randomWCash}${bakiyeSimge} kazandın. <:bstr_squeak:1179429411112616037>`,
            `Brawl Stars\'ın yeni geliştiricisi oldun çok çalıştın ve ${randomWCash}${bakiyeSimge} kazandın. <:bstr_bsLogo:1179429390032052234>`,
            `Lou ile imparatorluk kurup bütün insanların zihnini dondurdun böylece dünyanın yeni sahibi oldun ve ${randomWCash}${bakiyeSimge} kazandın. <:bstr_lou:1179429405005725746>`,
            `Gene\'in süper ellerini kullanarak bankadaki paraları kendine çekip milyoner oldun ve ${randomWCash}${bakiyeSimge} kazandın. <:bstr_gene:1179429406452744262>`,
            `Bull\'un kaslı kollarını kullanarak herkesi etkiledin ve ${randomWCash}${bakiyeSimge} kazandın. <:bstr_bull:1179429533804400722>`,
            `Dynamike\'ın dinamitlerini çalıp sattın ve ${randomWCash}${bakiyeSimge} kazandın. *(unuttuğun bişey var mike bunun intikamını alıcak...)* <:bstr_korkmus:1179429395648233554>`,
            `Brawl Stars\'da oyunculara kupa kasmalarında yardım ettin ve ${randomWCash}${bakiyeSimge} kazandın. <:bstr_kupa:1179429391676227625>`,
            `Leon ile birlik yapıp Mandy\'in şekerlerini çaldın ve ${randomWCash}${bakiyeSimge} kazandın. *(Mandy çok üzüldü)* <:bstr_uzgun:1179429397766357043>`,
        ]

        var Works = Math.floor(Math.random() * workMessages.length);


        const workEmbed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setColor("Random")
            .setDescription(String(workMessages[Works]))
            .setTimestamp()
        interaction.reply({ embeds: [workEmbed] })

        db.add(`para_${interaction.user.id}`, randomWCash);



    }
};

