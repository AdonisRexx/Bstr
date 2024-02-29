const Discord = require("discord.js");
const { GatewayIntentBits  } = require("discord.js")
const fs = require("fs");
const db = require('croxydb')
const config = require("./config.json");
const önerilimit = new Map()
const { Client, EmbedBuilder, PermissionsBitField, interaction } = require("discord.js");



const Rest = require("@discordjs/rest");
const DiscordApi = require("discord-api-types/v10");

const client = new Discord.Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildVoiceStates
], });

global.client = client;
client.commands = (global.commands = []);

/*                         SLASH COMMANDS                               */
console.log(`[-] ${fs.readdirSync("./commands").length} komut algılandı.`)

for(let commandName of fs.readdirSync("./commands")) {
	if(!commandName.endsWith(".js")) return;

	const command = require(`./commands/${commandName}`);	
	client.commands.push({
		name: command.name.toLowerCase(),
		description: command.description.toLowerCase(),
		options: command.options,
		dm_permission: false,
		type: 1
	});

	console.log(`[+] ${commandName} komutu başarıyla yüklendi.`)
}

/*                         EVENTS                                    */

console.log(`[-] ${fs.readdirSync("./events").length} olay algılandı.`)

for(let eventName of fs.readdirSync("./events")) {
	if(!eventName.endsWith(".js")) return;

	const event = require(`./events/${eventName}`);	
	const evenet_name = eventName.split(".")[0];

	client.on(event.name, (...args) => {
		event.run(client, ...args)
	});

	console.log(`[+] ${eventName} eventi başarıyla yüklendi.`)
}

/*                     LOADING SLASH COMMANDS                     */

//

client.once("ready", async() => {
	const rest = new Rest.REST({ version: "10" }).setToken(config.token);
  try {
    await rest.put(DiscordApi.Routes.applicationCommands(client.user.id), {
      body: client.commands,  //
    });
  } catch (error) {
    throw error;
  }
});

client.login(config.token).then(() => {
	console.log(`[-] Discord API'ye istek gönderiliyor.`);
	eval("console.clear()")
}).catch(() => {
	console.log(`[x] Discord API'ye istek gönderimi başarısız.`);
});

process.on("unhandledRejection", async (error) => {
    return console.log("SİSTEM MESAJI " + error)
})

// ------------------------------------   ÜYE PANELİ   -------------------------------------
// const bakiyeSimge = db.fetch(`bakiyeSimge_`)

// const channelId = '1185941357584465980'; 
// const intervalTime = 10000;

// const messages = [
// 	`Sunucuya Boost basarak eşsiz özelliklere sahip olabilirsin! <a:boost1:1128440427498971247>`,
// 	`/çalış Komutu ile para kazanıp sıralamada yükselebilirsin! <:bstr_members:1184542220716621845>`,
// 	`Komutlar için /yardım komutunu kullanabilirsin! <:bstr_helpCommand:1185946388459167806>`,
// 	`Kuralları okumayı unutma! Çünkü sunucuya katıldığın an okumuş kabul edilirsin. <a:ihbar:1152180725269921842>`,
// 	`/profilim Yazarak ekonomi verilerine ve ya kullanıcı verilerine ulaşabilirsin! <:phUsers:1173199238394552422>`,
// 	`/saatlik Yazarak saatlik ödülünü almayı unutma! ${bakiyeSimge}`,
// 	`/günlük Yazarak günlük ödülünü almayı unutma! ${bakiyeSimge}`,
// 	`Eğer premium üyeliğin varsa /premium-kullan ile dev ödülü kazanabilirsin! ${bakiyeSimge}`,
// 	`Kurallara uymayan üyeler cezalandırılır, kimsenin ceza almasını istemeyiz lütfen kurallaya uyun! <a:ihbar:1152180725269921842>`,
// 	`Eğer daha kullanmadıysan /code komutu ile özel kodunu kullanabilirsin. Özel Kodun __**BSTR_3.0**__ <a:animasyon_kalp:1145720214592421961>`,
// 	``,
// ];

// client.once('ready', () => {
//   sendRandomMessage();
  

//   setInterval(() => {
//     sendRandomMessage();
//   }, intervalTime);
// });

// async function sendRandomMessage() {
//   const randomIndex = Math.floor(Math.random() * messages.length);
//   const randomMessage = messages[randomIndex];
  

//   const channel = await client.channels.fetch(channelId);
//   if (channel && channel.isTextBased()) {
// 	const randomEmbed = new EmbedBuilder()
// 	.setColor("Random")
// 	.setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true })})
// 	.setThumbnail('https://cdn.discordapp.com/attachments/1180506583743090738/1183380629547667516/IMG_20231209_180240.png?ex=65915a98&is=657ee598&hm=6e683c50579bb0e6a9fe0fcf8572001b6efc7ed3dc4dd877317aed795898dfae&')
// 	.setImage('https://cdn.discordapp.com/attachments/1180506583743090738/1183380950390947941/Picsart_23-12-09_17-31-23-178.png?ex=65915ae4&is=657ee5e4&hm=9b271527bbdbe3f42288075410f21cb1fd6f5e63ac221b77ed0effc08edae143&')
// 	.setTitle(`**Biliyormuydun?**`)
// 	.setDescription(`${randomMessage}`)
// 	channel.send({embeds: [randomEmbed]})
//       .then(sentMessage => console.log(`"${randomMessage}" mesajı başarıyla gönderildi.`))
//       .catch(error => console.error('Mesaj gönderme hatası:', error));
//   } else {
//     console.error(`Belirtilen ID'ye sahip bir metin kanalı bulunamadı: ${channelId}`);
//   }
// }
