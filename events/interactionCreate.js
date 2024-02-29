const { Collection, ButtonStyle, EmbedBuilder } = require("discord.js");
const db = require("croxydb");
const Discord = require("discord.js");
const edb = require("croxydb")
const { readdirSync } = require("fs");
const { createButton, deleteMessageButton } = require("../function/functions");
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType, PermissionsBitField } = require('discord.js');
const moment = require("moment");

module.exports = {
  name: Discord.Events.InteractionCreate,

  run: async (client, interaction) => {
    if (interaction.isChatInputCommand()) {

      if (!interaction.guildId) return;

      readdirSync('./commands').forEach(f => {

        const cmd = require(`../commands/${f}`);

        if (interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) {



          return cmd.run(client, interaction, db);

        }


      });



    }

    if (interaction.isButton()) {
      const customId = interaction.customId;
      const name = customId.split("_")[0];
      const id = customId.split("_")[1];

      const idFind = (id_name) => {
        return `${id_name}_${id}`;
      }

      if (id !== "everyone" && id !== interaction.user.id) {
        const butonembed = new Discord.EmbedBuilder()
          .setDescription(`Bu butonu sadece komutu yazan kişi kullanabilir!`)
        return interaction.reply({ embeds: [butonembed], ephemeral: true })
      }

      if (interaction.customId === ".phClear_" + interaction.user.id) {
        return interaction.message.delete()
      }

      if (interaction.customId === "kullaniciVeri_" + interaction.user.id) {
        const row = new Discord.ActionRowBuilder()
          .addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("1173188128337571924")
              .setLabel("Geri Gel")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setCustomId("ekonomiGerii_" + interaction.user.id)
          )
          .addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("1173188126064259123")
              .setLabel("İptal Et")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setCustomId(".phClear_" + interaction.user.id)
          )
        const member = interaction.user;
        const embed = new EmbedBuilder()
          .setDescription(`**➥ __İşte Bilgilerin__**
        <a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667>
        • <:phUsers:1173199238394552422>  Kullanıcı İsmin ve ID'n : 

        (<@${interaction.user.id}> - \`${interaction.user.id}\`)
        <a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667>
        • <:Time:1189605144359350413> Hesabını Kurduğun Tarih : 

        <t:${parseInt(interaction.user.createdTimestamp / 1000)}:F> (<t:${parseInt(interaction.user.createdTimestamp / 1000)}:R>)
        <a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667>
        • <:Time:1189605144359350413> **${interaction.guild.name}** Sunucusuna Katıldığın Tarih : 

        <t:${parseInt(interaction.member.joinedTimestamp / 1000)}:f> (<t:${parseInt(interaction.member.joinedTimestamp / 1000)}:R>)
        `)
          .setThumbnail(`${interaction.user.displayAvatarURL()}`)
          .setColor("Random")
        interaction.update({ embeds: [embed], components: [row] })

      }

      if (interaction.customId === "ekonomiGerii_" + interaction.user.id) {
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
          .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setDescription(`<@${interaction.user.id}>, Verilerini görmek için aşağıdaki butonları kullan!`)
          .setColor("Aqua")

        interaction.update({ embeds: [profilEmbed], components: [row] })
      }

      if (interaction.customId === "ekonomiVeri_" + interaction.user.id) {
        const row = new Discord.ActionRowBuilder()
          .addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("1173188128337571924")
              .setLabel("Geri Gel")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setCustomId("ekonomiGerii_" + interaction.user.id)
          )
          .addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("1173188126064259123")
              .setLabel("Mesajı Sil")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setCustomId(".phClear_" + interaction.user.id)
          )


        const premiumActiveDatee = db.fetch(`premiumActiveDate_${interaction.user.id}`);
        const PREMİUMsystem = db.fetch(`premiumActive_${interaction.user.id}`) ? `Premium Üyeliğiniz <t:${parseInt(premiumActiveDatee.date / 1000)}:R> Aktif Edilmiş! <:onaytik:1128607181441355806>` : `Premium üyeliğiniz aktif değil! <:redcarpi:1128609008345952256>`;
        const parasayisi = db.fetch(`para_${interaction.user.id}`) || 0;
        const bankasayi = db.fetch(`banka_${interaction.user.id}`) || 0;
        const bakiyeSimge = db.fetch(`bakiyeSimge_`) || "";

        const guildMembers = await interaction.guild.members.fetch();
        const userId = interaction.user.id;

        let sortedMembers = guildMembers
          .filter(member => db.fetch(`para_${member.id}`) || 0)
          .sort((a, b) => (db.fetch(`para_${b.id}`) || 0) - (db.fetch(`para_${a.id}`) || 0));

        let userPosition = sortedMembers.map(member => member.id).indexOf(userId);




        const xembed = new EmbedBuilder()
          .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setColor("Random")
          .setDescription(`
  **İŞTE EKONOMİ VERİLERİN!**

  <a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667>
  **BAKİYE VERİLERİN** <:moneyCash:1186724641360850985>

  Bakiyen : ${parasayisi}${bakiyeSimge}
  Bankadaki Paran : ${bankasayi}${bakiyeSimge}
  <a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667>
 **SIRALAMA VERİLERİ** <:rank:1186724644405911735>

  Genel Liderlik Sıralaman : **__${userPosition + 1}__**
 <a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667><a:rainbowborder:1186727124388806667>
  **PREMİUM VERİLERİ** <a:premium:1186724638466777098>

  PREMİUM ÜYELİK : ${PREMİUMsystem}
`)

        interaction.update({ embeds: [xembed], components: [row] })
      }

      if (interaction.customId === "ekoKomutlar_" + interaction.user.id) {
        const row = new Discord.ActionRowBuilder()
          .addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("1211336568304963605")
              .setLabel("Banka Komutları")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setCustomId("ekoBank_" + interaction.user.id)
          )
          .addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("1186724641360850985")
              .setLabel("Para Kazanma Komutları")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setCustomId("ekoPara_" + interaction.user.id)
          )
          .addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("1173188128337571924")
              .setLabel("Geri Gel")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setCustomId("ekoGeri_" + interaction.user.id)
          )

        const ekoEmbeddx = new EmbedBuilder()
          .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setDescription(`<@${interaction.user.id}>, Hangi ekonomi komutlarını merak ediyorsun?`)
          .setColor("DarkNavy")

        interaction.update({ embeds: [ekoEmbeddx], components: [row] })
      }

      if (interaction.customId === "ekoGeri_" + interaction.user.id) {
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

        interaction.update({ embeds: [profilEmbed], components: [row] })
      }

      if (interaction.customId === "ekoBank_" + interaction.user.id) {
        const row = new Discord.ActionRowBuilder()
          .addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("1173188128337571924")
              .setLabel("Geri Gel")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setCustomId("ekoGerix_" + interaction.user.id)
          )
        const ekoBankEmbedx = new EmbedBuilder()
          .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setTitle("Ekonomi - Banka Komutları <a:Bank:1211336568304963605>")
          .setColor("Random")
          .addFields(
            { name: '**/banka-yatır**', value: `Bankaya para yatırırsın.`, inline: true },
            { name: '**/banka-çek**', value: `Bankadan para çekersin.`, inline: true },
          )

        interaction.update({ embeds: [ekoBankEmbedx], components: [row] })
      }
      if (interaction.customId === "ekoGerix_" + interaction.user.id) {
        const row = new Discord.ActionRowBuilder()
          .addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("1211336568304963605")
              .setLabel("Banka Komutları")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setCustomId("ekoBank_" + interaction.user.id)
          )
          .addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("1186724641360850985")
              .setLabel("Para Kazanma Komutları")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setCustomId("ekoPara_" + interaction.user.id)
          )
          .addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("1173188128337571924")
              .setLabel("Geri Gel")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setCustomId("ekoGeri_" + interaction.user.id)
          )

        const ekoEmbeddx = new EmbedBuilder()
          .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setDescription(`<@${interaction.user.id}>, Hangi ekonomi komutlarını merak ediyorsun?`)
          .setColor("DarkNavy")

        interaction.update({ embeds: [ekoEmbeddx], components: [row] })
      }

      if (interaction.customId === "ekoPara_" + interaction.user.id) {
        const row = new Discord.ActionRowBuilder()
          .addComponents(
            new Discord.ButtonBuilder()
              .setEmoji("1173188128337571924")
              .setLabel("Geri Gel")
              .setStyle(Discord.ButtonStyle.Secondary)
              .setCustomId("ekoGerix_" + interaction.user.id)
          )
        const ekoBankEmbedx = new EmbedBuilder()
          .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setTitle("Ekonomi - Para Kazanma Komutları <:moneyCash:1186724641360850985>")
          .setColor("Random")
          .addFields(
            { name: '**çalış**', value: `Çalışarak para kazanırsın.`, inline: true },
            { name: '**/günlük**', value: `Günlük ödülünü alırsın.`, inline: true },
            { name: '**/premium-kullan**', value: `Eğer satın aldıysan premium ödülü alırsın.`, inline: true },
            { name: '**/saatlik**', value: `Saatlik ödülünü alırsın.`, inline: true },
            { name: '**/soy**', value: `Hırsızlık yaparsın.`, inline: true },
            { name: '**/code**', value: `Eğer verildiyse kod girerek ödül kazanırsın.`, inline: true },
          )

        interaction.update({ embeds: [ekoBankEmbedx], components: [row] })
      }

      if (interaction.customId === "digerKomutlar_" + interaction.user.id) {
        const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setEmoji("1173188128337571924")
            .setLabel("Geri Gel")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setCustomId("digerGerix_" + interaction.user.id)
        )
      const ekodigerEmbedx = new EmbedBuilder()
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTitle("Diğer Komutlar")
        .setColor("Random")
        .addFields(
          { name: '**/afk**', value: `Afk moduna girersin.`, inline: true },
          { name: '**/market**', value: `Satın alabileceğin ürünleri görürsün.`, inline: true },
          { name: '**/satın-al**', value: `Marketteki ürünleri satın alırsın.`, inline: true },
          { name: '**/leaderboard**', value: `En çok bakiyesi olan 10 kişiye bakarsın.`, inline: true },
          { name: '**/para**', value: `Kendinin veya başkasının parasına bakarsın.`, inline: true },
          { name: '**/profilim**', value: `Ekonomi ve kullanıcı verilerine bakarsın.`, inline: true },
          { name: '**/sunucu-link**', value: `Brawl Stars Türkiye sunucu linkini görürsün.`, inline: true },
          { name: '**/yardım**', value: `Botun komutlarına bakarsın.`, inline: true },
          { name: '**/ping**', value: `Botun gecikmesini görürsün.`, inline: true },
        )

      interaction.update({ embeds: [ekodigerEmbedx], components: [row] })
      }

      if (interaction.customId === "digerGerix_" + interaction.user.id) {
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
            

                const ekoEmbeddxx = new EmbedBuilder()
                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                .setDescription(`<@${interaction.user.id}>, Hangi konuda yardıma ihtiyacın var? Lütfen aşağıdaki butonları kullan.`)
                .setColor("DarkNavy")
                .setFooter({text: "Bot yaptırmak için aşağıdaki butondan sunucumuza katılabilirsin!"})

        interaction.update({ embeds: [ekoEmbeddxx], components: [row] })
      }

      if (interaction.customId === "yetkiliKomutlar_" + interaction.user.id) {
        const bakiyeSimge = db.fetch(`bakiyeSimge_`) || "";
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "<:redcarpi:1128609008345952256> | Yönetici Yetkin Yok!", ephemeral: true})

        const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
            .setEmoji("1173188128337571924")
            .setLabel("Geri Gel")
            .setStyle(Discord.ButtonStyle.Secondary)
            .setCustomId("yetkiliGerix_" + interaction.user.id)
        )
      const ekodigerEmbedx = new EmbedBuilder()
        .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTitle("Yetkili Komutları")
        .setColor("Random")
        .addFields(
          { name: '**/yasakla**', value: `Sunucudan üye banlarsın.`, inline: false },
          { name: '**/at**', value: `Sunucudan üye atarsın.`, inline: false },
          { name: '**/oto-cevap**', value: `Otomatik cevap sistemini ayarlayabilirsin.`, inline: false },
          { name: '**/para-ekle**', value: `Bir kullanıcının bakiyesini arttırırsın.`, inline: false },
          { name: '**/para-kaldır**', value: `Bir kullanıcının bakiyesini azaltırsın.`, inline: false },
          { name: '**/premium-ver**', value: `Bir kullanıcıya premium üyelik verirsin.`, inline: false },
          { name: '**/premium-al**', value: `Bir kullanıcının premium üyeliğini alırsın.`, inline: false },
          { name: '**/set-simge**', value: `Bakiye simgesini değiştirirsin. (Varsayılan ${bakiyeSimge})`, inline: false },
          { name: '**/yavaş-mod**', value: `Kanalın yazma limitini değiştirirsin.`, inline: false },
          { name: '**/oto-rol**', value: `Sunucuya girenlere otomatik rol verilir.`, inline: false },
          { name: '**/oto-rol-kapat**', value: `Oto-rol sistemini iptal edersin.`, inline: false },
          { name: '**/oto-tag**', value: `Sunucuya girenlere otomatik tag verir.`, inline: false },
          { name: '**/oto-tag-kapat**', value: `Oto-tag sistemini iptal edersin.`, inline: false },
        )

      interaction.update({ embeds: [ekodigerEmbedx], components: [row] })

      }
if (interaction.customId === "yetkiliGerix_" + interaction.user.id) {
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

interaction.update({ embeds: [profilEmbed], components: [row] })
}
    }

  }

};








//


