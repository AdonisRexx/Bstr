const Discord = require("discord.js");
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const db = require("croxydb");
const moment = require("moment");

module.exports = {
    name: Discord.Events.GuildMemberAdd,

    run: async(client, member) => {
		
	

        const tag = db.get(`ototag_${member.guild.id}`)
        if(tag) {
        member.setNickname(`${tag} | ${member.displayName}`)
		}

        const acc = member.user.bot ? db.fetch(`botrol_${member.guild.id}`) : db.fetch(`otorol_${member.guild.id}`);
        if(acc) {
        member.roles.add(acc).catch(() => {})
        }


            //
        }

      

    }// 
