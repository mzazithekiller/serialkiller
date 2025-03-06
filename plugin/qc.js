const axios = require("axios");
const sharp = require('sharp');
const fs = require('fs');
const { addExif } = require('../start/lib/exif')

module.exports = {
    command: 'qc', //gunakan ['qc','qcsticker'], untuk command nya lebih dari 1
    async execute(conn, m, args, reply, prefix, command) {
        const pushname = m.pushName || "No Name";
        const text = args.join(" ");
        if (!text) {
            return reply(`mana pesannya anjg, contoh: .qc peler`);
        }
        await conn.sendMessage(m.chat, {
            react: { text: "⚡",
                    key: m.key
                   }
        })
        
        const obj = {
            type: 'quote',
            format: 'png',
            backgroundColor: '#232023',
            width: 512,
            height: 768,
            scale: 2,
            messages: [{
                entities: [],
                avatar: true,
                from: {
                    id: 1,
                    name: `${pushname}`,
                    photo: {
                        url: await conn.profilePictureUrl(m.sender, "image").catch(() => 
                            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                        ),
                    }
                },
                text: text,
                replyMessage: {},
            }],
        };

        const response = await axios.post('https://bot.lyo.su/quote/generate', obj, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const buffer = Buffer.from(response.data.result.image, 'base64');
        const dataUrl = `data:image/png;base64,${buffer.toString('base64')}`;
        await makeStickerFromUrl(dataUrl, conn, m);
    }
};

const cina = ["https://files.catbox.moe/v1ulp7.jpg"]
 
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * cina.length);
    return cina[randomIndex];
}
const cinahitam = getRandomImage()

function getRandomFile(ext) {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
}

async function makeStickerFromUrl(imageUrl, conn, m) {
    try {
        let buffer;
        if (imageUrl.startsWith("data:")) {
            const base64Data = imageUrl.split(",")[1];
            buffer = Buffer.from(base64Data, 'base64');
        } else {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            buffer = Buffer.from(response.data, "binary");
        }
        
        const webpBuffer = await sharp(buffer)
            .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .webp({ quality: 70 })
            .toBuffer();
        
        const penis = await addExif(webpBuffer, global.packname, global.author)

        const fileName = getRandomFile(".webp");
        fs.writeFileSync(fileName, webpBuffer);

        await conn.sendMessage(m.chat, {
            sticker: penis,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: `ム Laurine`,
                    body: `tell me why i'm waiting?`,
                    mediaType: 3,
                    renderLargerThumbnail: false,
                    thumbnailUrl: cinahitam, 
                    sourceUrl: `https://kyuurzy.tech`
                }
            }
        }, { quoted: m });

        fs.unlinkSync(fileName);
    } catch (error) {
        console.error("Error creating sticker:", error);
    }
}