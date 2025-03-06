require('../setting/config')
const fs = require('fs');
const path = require('path');

module.exports = {
    command: 'delplug',
    async execute(conn, m, args, reply, Access) {
        if (!Access) return reply(mess.owner);
        const fileName = args[0];
        if (!fileName) return reply('plugin apa yang mau di hapus? contoh .delplug tiktok');
        const filePath = path.join(__dirname, `${fileName}.js`);
        fs.unlink(filePath, (err) => {
            if (err) return reply(`failed to delete file: ${fileName}.js`)
            reply(`${fileName}.js file was successfully deleted.`)
        });
    }
}