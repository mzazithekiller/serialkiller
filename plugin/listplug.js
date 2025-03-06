require('../setting/config')
const fs = require('fs');
const path = require('path');

module.exports = {
    command: 'listplug',
    async execute(conn, m, args, reply, Access) {
        if (!Access) return reply(mess.owner);
        const dirPath = path.join(__dirname);
        fs.readdir(dirPath, (err, files) => {
            if (err) return reply('failed to read directory.')
            const sortedFiles = files.sort((a, b) => a.localeCompare(b));
            if (sortedFiles.length === 0) return reply('no files found in command folder.')
            const response = `files available in the command folder:\n${sortedFiles.map(file => `- ${file}`).join('\n')}`;
            conn.sendMessage(m.chat, { text: response }, { quoted: m });
        });
    }
}
