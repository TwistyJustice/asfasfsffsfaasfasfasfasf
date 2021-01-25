const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'erkek',
    aliases: ['erkek', 'e', 'man', 'boy'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('kaizen🖤');
        let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#640032').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('kaizen🖤');

        if (!client.config.mods.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!"))
        }
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi!"))
      
        let name = args[1]
        if (!name) return message.channel.send(embed.setDescription("Kullanıcı için bi isim yazılmak zorunda!"))

        let age = args[2]
        if (!age) return message.channel.send(embed.setDescription("Kullanıcı için bir yaş yazılmak zorunda!"))

        if (!["ス"].some(ss => member.user.username.toLowerCase().includes(ss)) && member.user.discriminator !== "etiket varsa koyun yoksa 0000 yapın örnek : 0099 şeklinde yazın" && !message.guild.members.cache.get(member.id).roles.cache.has('800350448434937916' && '765591026709561345')) {
            return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription("Kullanıcının kayıt olabilmesi için boost basmalı veya tag almalı!").setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Vip almak için : .vip @kaizen/id'))
        }
        message.guild.members.cache.get(member.id).setNickname(`• ${name} | ${age}`)
        db.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (<@&800350462129340437>)`);
        db.set(`kayıt_${member.id}`, true)
        db.add(`erkek_${message.author.id}`, 1)
        await message.guild.members.cache.get(member.id).roles.remove(client.config.unregisteres)
        await message.guild.members.cache.get(member.id).roles.add(client.config.maleRoles)
        message.channel.send(embed2.setDescription(`${member} adlı kullanıcı\`${name} | ${age}\` isminde  kayıt edildi! (<@&800350462129340437>)`)

        )
    }
}