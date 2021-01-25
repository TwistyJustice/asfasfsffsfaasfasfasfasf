const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'say',
    aliases: ['say'],
    run: async(client, message, args) => {
       /* const mapping = {
            " ": "",
         "0": "\`0\`",
        "1": "\`1\`",
        "2": "\`2\`",
        "3": "\`3\`",
        "4": "\`4\`",
        "5": "\`5\`",
        "6": "\`6\`",
        "7": "\`7\`",
        "8": "\`8\`",
        "9": "\`9\`",
        };*/
        var tag = 'tag'//tagınızı yazınız
        var etiket =  message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.discriminator == "0099").size;
        var toplamAile = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(tag) || member.user.discriminator == "0099").size;
        var toplamüye = message.guild.memberCount
        var online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
        var Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
        var tag = message.guild.members.cache.filter(a => a.user.username.includes(tag)).size
       /* var emotoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
        var emotag = `${tag}`.split("").map(c => mapping[c] || c).join("")
        var emoses = `${Sesli}`.split("").map(c => mapping[c] || c).join("")
        var emoetiket = `${etiket}`.split("").map(c => mapping[c] || c).join("")
        var emotoplam = `${toplamAile}`.split("").map(c => mapping[c] || c).join("")*/

        const embed = new MessageEmbed()
            .setColor('BLACK')
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))    
            .setDescription(`• Sunucuda toplam **${toplamüye}** üye bulunmakta.
            • Sunucuda **${online}** aktif üye bulunmakta.
            • Sunucuda toplam tagımızı alan **${tag}** üye bulunmakta.
            • Sunucuda sesli sohbetlerde toplam **${Sesli}** üye bulunmakta`)
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setThumbnail(message.member.displayName, message.author.avatarURL({ dynamic: true }))
            .setThumbnail(message.author.avatarURL)
            .setFooter('kaizen 🧡 was here')
        message.channel.send(embed)
    }
}