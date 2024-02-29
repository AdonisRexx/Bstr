const Discord = require("discord.js");
const db = require("croxydb");
const moment = require("moment");

module.exports = {
    name: Discord.Events.VoiceStateUpdate,
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').VoiceState} oldState 
     * @param {import('discord.js').VoiceState} newState 
     */
    run: async(client, oldState, newState) => {
    
  

    }
}
