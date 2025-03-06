require('../setting/config')
const fs = require('fs');
const kripto = require('crypto');

module.exports = {
    command: ['ambilq','getq'],
    async execute(conn, m, args, reply, Access, prefix, command) {
        if (!Access) return reply(mess.owner)
        if (!m.quoted) return reply(`reply pesan yang quotednya mau diambil`);
        let penis = JSON.stringify({ [m.quoted.mtype]: m.quoted }, null, 2);
        let jeneng = `MessageData_${kripto.randomBytes(8).toString('hex')}.json`;

        await fs.writeFileSync(jeneng, penis);
        await conn.sendMessage(m.chat, { document: { url: `./${jeneng}` }, fileName: jeneng, mimetype: '*/*' }, { quoted: m });
        await fs.unlinkSync(jeneng);
    }
};