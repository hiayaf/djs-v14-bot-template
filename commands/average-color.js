const Canvas = require('@napi-rs/canvas');
const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('average-color')
        .setDescription('average color'),
    async execute(interaction) {
        await interaction.deferReply();
        const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/1018882936105353306/1028483222914486412/average-color.png');
        const canvas = Canvas.createCanvas(background.width, background.height);
        const ctx = canvas.getContext && canvas.getContext('2d');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'average-color.png' });
        function getAverageRGB(img) {
            i = -4,
                count = 0;
            rgb = { r: 0, g: 0, b: 0 },
                ctx.drawImage(img, 0, 0);
            try {
                data = ctx.getImageData(0, 0, canvas.width, canvas.height);
            } catch (e) {
                console.log(e)
            }
            length = data.data.length;
            while ((i += 20 * 4) < length) {
                ++count;
                rgb.r += data.data[i];
                rgb.g += data.data[i + 1];
                rgb.b += data.data[i + 2];
            }
            rgb.r = ~~(rgb.r / count);
            rgb.g = ~~(rgb.g / count);
            rgb.b = ~~(rgb.b / count);
            return rgb;
        }
        rgb = getAverageRGB(background)
        function RgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
        const canvas2 = Canvas.createCanvas(background.width, background.height);
        const ctx2 = canvas.getContext && canvas2.getContext('2d');
        ctx2.drawImage(background, 0, 0, canvas2.width, canvas2.height);
        ctx2.fillStyle = RgbToHex(rgb.r, rgb.g, rgb.b);
        ctx2.fillRect(0, 0, canvas.width, canvas.height);
        const color = new AttachmentBuilder(await canvas2.encode('png'), { name: 'average-color.png' });
        await interaction.editReply({ files: [attachment, color], content: `\`${rgb.r}, ${rgb.g}, ${rgb.b} | ${RgbToHex(rgb.r, rgb.g, rgb.b)}\`` });
    }
};	
