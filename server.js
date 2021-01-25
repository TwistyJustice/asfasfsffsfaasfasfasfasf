////----------------------- ALTYAPI NİWREN TARAFINDAN YAPILMIŞTIR PAYLAŞILMASI YASAKTIR -----------------------\\\\
////----------------------- ALTYAPIDA ÇIKACAK ARIZALAR İÇİN Reco#0099 ULAŞABİLİRSİNİZ -----------------------\\\\
////----------------------- 30 STARDA PUBLİC İÇİN TASARLANMIŞ EMOJİLİ KAYIT BOTU PAYLAŞILACAKTIR -----------------------\\\\

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const moment = require('moment')
require('moment-duration-format')
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();

fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})



//  WATCHING  : !ping izliyor
//  LISTENING : !ping dinliyor
//  PLAYING   : !ping oynuyor 
//  STREAMING : !ping yayında
////----------------------- READY KISMI -----------------------\\\\
client.on('ready', () => {
    client.user.setPresence({ activity: { name: 'kaizen🖤kain' }, status: 'idle' })
    client.channels.cache.get('800350539325636648').join() // ses kanalı İD
    console.log(`Bot ${client.user.tag} Adı İle Giriş Yaptı!`);
  })
////----------------------- CONFİG KISMI -----------------------\\\\
client.config = {
    vipRoles: ['800350448434937916'], //vip
    unregisteres: ['800350458820558858'], // kayıtsız
    maleRoles: ['800350462129340437'], // erkek
    girlRoles: ['800350460573777930'], // bayan
    mods: ["800350422309011486"], // yetkili
    channelID: '800350540193988608', // kayıt kanalı
    yönetim: ['800350416206037043'] // üst yönetim
}
////----------------------- PREFİX KISMI -----------------------\\\\
client.on('message', message => {
    const prefix = ".";// prefix
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})
////----------------------- HEM ETİKET HEMDE TAG ROL KISMI -----------------------\\\\
client.on("userUpdate", async function(oldUser, newUser) { // kod codaredan alınıp editlenmiştir!
    const guildID = "765194683047477258"//sunucu
    const roleID = "800350447717974037"//taglırolü
    const tag = "ス"//tag
    const chat = '800350600415805460'// chat
    const log2 = '800350629104844840' // log kanalı
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setFooter('🎄Developed by Niwren🎄');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(` ${newUser} isminden \`ス\` çıakrtarak ailemizden ayrıldı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`<a:redanme:802959776241025135> Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tag})`)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} ismine \`ス\` alarak ailemize katıldı`))
        }
    }
})

////----------------------- HOŞGELDİN MESAJI KISMI -----------------------\\\\
client.on('guildMemberAdd', (member) => {

    const mapping = {
        " ": "",
        "0": "\`0\`", // sayı iDleri
        "1": "\`1\`",
        "2": "\`2\`",
        "3": "\`3\`",
        "4": "\`4\`",
        "5": "\`5\`",
        "6": "\`6\`",
        "7": "\`7\`",
        "8": "\`8\`",
        "9": "\`9\`",
    };
    var toplamüye = member.guild.memberCount
    var emotoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
    let memberDay = (Date.now() - member.user.createdTimestamp);
    let createAt = moment.duration(memberDay).format("Y [Yıl], M [Ay], W [Hafta], DD [Gün]")
    let createAt2 = moment.duration(memberDay).format("DD [Gün], HH [saat], mm [dakika]")
    if (memberDay > 604800000) {
        client.channels.cache.get(client.config.channelID).send(` Suncumuza hoşgeldin ${member} - \`${member.id}\`

 Hesabını \`${createAt}\` tarihinde oluşturmuşsun <a:tik:802945756754345985>
 
 Seninle beraber \`${emotoplamüye}\` kişi olduk!
 
 Kayıt olmak için kayıt odalarının birine giriş yapıp bekleyebilirsiniz! Sunucumuzdaki kurallara uymak zorunludur, <#776716998062637087> Kuralara göz atabilirsin, Unutma sunucu içindeki ceza işlemleri kuralları okuduğunu varsayılarak gerçekleşecektir!

<@&800350422309011486> rolündeki yetkililer seninle ilgilenecektir :tada: :tada: :tada:`)
    } else {
        client.channels.cache.get(client.config.channelID).send(
            new Discord.MessageEmbed()
            .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
            .setDescription(`${member}, Adlı Kullanıcı Sunucuya Katıldı Hesabı **${createAt2}** Önce Açıldığı İçin Karantinaya atıldı!`)
            .setTimestamp()
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setFooter(`kaizen🖤kain`))
    }
})

////----------------------- TAG MESAJ KISMI -----------------------\\\\
client.on('message', msg => {
    if (msg.content === '!tag') {
        msg.channel.send(`ス`); // tagı yazınız
    } else if (msg.content === 'tag') {
        msg.channel.send(`ス`);// tagı yazınız
    } else if (msg.content === '.tag') {
        msg.channel.send(`ス`);// tagı yazınız
    } else if (msg.content === ".kaizen") {
        msg.guild.members.cache.forEach(x => {
            x.roles.add("803376530142003271")
        })
    }
});


////----------------------- TAG TARAMASI KISMI -----------------------\\\\
setInterval(() => {
    const server = client.guilds.cache.get("765194683047477258"); //Server ID 
    server.members.cache.forEach(async member => {
        if (member.roles.cache.has("800350448434937916") || member.roles.cache.has("765591026709561345")) return; //VİP&BOOSTER ROL İD

/*   Yasaklı Tag    */
   if(member.user.username.includes("ฬ")){
        member.roles.set(["800350455728963608"]).catch(() => {}) 
    }


 if (member.user.username.includes("ス")) {
            await member.roles.add("800350447717974037").catch(() => {})
        }
        if (!member.user.username.includes("ス")) {
            await member.roles.set("800350458820558858")
        }
    })
}, 60 * 1000)// 60(60 saniye) kısmını değiştirebilirsiniz

client.login('ODAzMzMzMTI5NzIwMTY4NDU4.YA8QRw.OIOCgy75GzoZFuIlYBLQdbTcQY4')//token
