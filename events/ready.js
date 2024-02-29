const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js")
const db = require("croxydb")

module.exports = {
  name: Discord.Events.ClientReady,

  run: async (client, message, interaction, guild) => {
    console.log(`${client.user.tag} Aktif!`);

    const activities = [
      `BSTR | En İyi Brawl Stars Türkiye Topluluğu!`,
      `/sunucu-link Yaz Ve Aramıza Katıl!`,
      `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Kullanıcıyı İzliyor.`,
      `${client.user.username} Sizler İçin Tasarlanmış Eşsiz Bir Bottur.`,
      `Komutlarım için /yardım`
    ]

    setInterval(async () => {
      client.user.setPresence({ activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}` }], status: 'online' });
    }, 1000 * 15);
    db.set(`botAcilis_`, Date.now())


  }
}