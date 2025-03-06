const fs = require('fs')

//info id
global.owner = "254108595201@s.whatsapp.net"
global.idch = "120363344028484832@newsletter"

 //jika bernilai "true" berarti aktif, dan sebaliknya kalau "false"
global.status = true
global.welcome = false
global.antispam = true
global.autoread = false

global.prefa = ['','!','.',',','🐤','🗿']

//sticker watermark
global.packname = 'www.Tennor.tech'
global.author = 'Teddy Dommie'

//link group atau link channel WhatsApp
global.linkch = 'https://whatsapp.com/channel/0029VafrbsKG8l5EFBDDCy41'

//limit user premium dan bukan premium 
global.gcount = {
    prem : 500,
    user: 15
}

//limit
global.limitCount = 10,

//message 
global.mess = {
    group: "hey? Group only",
    admin: "hey? bot must be admin",
    owner: "  owner only",
    premium: "you are not a premium user",
    botadmin: "bot bukan admin",
    limited: "limitmu habis, kembali besok/sore nanti"
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
