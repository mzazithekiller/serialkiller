require('../setting/config');
const fs = require('fs');
const path = require('path');

module.exports = {
    command: 'getplug',
    async execute(conn, m, args, reply, Access, command) {
        if (!Access) return reply(mess.owner);
        const fileName = args[0];
        if (!fileName) return reply(`plugin apa yang mau di ambil? contoh .getplug tiktok`)
        const filePath = path.join(__dirname, `${fileName}.js`);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return reply(`failed to retrieve file: ${fileName}.js`);
            reply(`${data}`)
        });
    }
}