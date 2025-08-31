const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    console.log('Scan this QR code with your WhatsApp app:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp bot is ready and connected!');
});

client.on('message', async message => {
    if (message.isGroupMsg) {
        const chat = await message.getChat();

        // /announce <text> command
        if (message.body.startsWith('/announce ')) {
            const announcement = message.body.replace('/announce ', '');
            chat.sendMessage(`📢 Announcement:\n${announcement}`);
        }

        // /help command
        if (message.body === '/help') {
            chat.sendMessage(
                `*Group Management Bot*\n` +
                `Commands:\n` +
                `• /announce <text> — Send group announcement\n` +
                `• /help — List commands`
            );
        }
    }
});

client.initialize();