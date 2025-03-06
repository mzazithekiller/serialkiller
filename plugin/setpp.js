require('../setting/config');

module.exports = {
    command: ['setpp', 'setppbot'],
    async execute(conn, m, args, reply, Access, prefix, command, botNumber, quoted) {
        try {
            let mime = quoted?.mimetype || "";

            if (!Access) return reply(mess.owner);
            if (!quoted) return reply(`mana fotonya bang`);
            if (/webp/.test(mime)) return reply(`jangan sticker njrrr`);

            let pukii = await quoted.download();
            await conn.updateProfilePicture(botNumber, pukii); 
            reply(`horee, foto profil berhasil di update`);
        } catch (error) {
            console.error(error);
            reply(`aduhh, error le` + error);
        }
    }
};