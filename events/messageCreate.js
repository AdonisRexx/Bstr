const db = require("croxydb");
const { PermissionFlagsBits, EmbedBuilder, Events, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
  name: Events.MessageCreate,

  run: async (client, message, msg, interaction) => {
    if (message.author.bot) return;
    if (!message.guild) return;



    if (await db.get(`afk_${message.author.id}`)) {

      const afkDate = db.fetch(`afkDate_${message.author.id}`)
      const sebep = db.fetch(`afk_${message.author.id}`)

      if (afkDate && sebep) {
        const date = new EmbedBuilder()
          .setDescription(`${message.author} Hoş geldin! **${sebep}** sebebiyle <t:${parseInt(afkDate.date / 1000)}:R> afk'ydın`)
        db.delete(`afk_${message.author.id}`);
        db.delete(`afkDate_${message.author.id}`)
        await message.member.setNickname(message.member.displayName.replace("[AFK]", ""));
        return message.reply({ embeds: [date] })

      }

    }

    var kullanıcı = message.mentions.users.first();
    if (kullanıcı) {
      const afkDate = db.fetch(`afkDate_${kullanıcı.id}`)

      const sebep = await db.get(`afk_${kullanıcı.id}`);

      if (sebep) {
        const sebeps = new EmbedBuilder()
          .setDescription(`Etiketlediğin kullanıcı **${sebep}** sebebiyle afk modunda!`)
        message.reply({ embeds: [sebeps] });
      }
    }

    if (message.author.bot) return;
    if (!message.guild) return;

    if (message.content === db.fetch(`soruMesaj_${message.guild.id}_${message.content}`).soru) {
      message.reply({ content: `${db.fetch(`soruMesaj_${message.guild.id}_${message.content}`).cevap}` })
    }

    try {

    if (message.content.length > 4) {
      if (db.fetch(`capslockengel_${message.guild.id}`)) {
        let caps = message.content.toUpperCase()
        if (message.content == caps) {
          if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            if (!message.mentions.users.first()) {
              message.delete()
              const embed = new EmbedBuilder()
                .setTitle(`<:uyari:1040649846400499712> **UYARI!**`)
                .setDescription(`✋ | ${message.author}, Bu sunucuda büyük harf kullanımı engelleniyor!`)
                .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
              message.channel.send({ embeds: [embed] })
            }
          }
        }
      }
    }
      // Kodunuz burada
    } catch (error) {
      console.error(error);
    }
  }
};


//////////////////////////////////////////////





