const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// ✅ Create bot client with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ✅ Event: when bot is online
client.once('ready', () => {
  console.log(`🟢 Logged in as ${client.user.tag}`);
});

// ✅ Event: when a message is sent
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // 🔒 Only filter 👻☆chat☆ channel
  if (message.channel.name === '👻☆chat☆') {
    const hasAttachment = message.attachments.size > 0;
    const hasSticker = message.stickers.size > 0;
    const mediaRegex = /\.(jpg|jpeg|png|gif|bmp|webp|mp4|mov|webm)$/i;
    const hasLink = mediaRegex.test(message.content);

    if (hasAttachment || hasSticker || hasLink) {
      try {
        await message.delete();
      } catch (err) {
        console.error('❌ Could not delete message:', err);
      }
    }
  }
});

// ✅ Start the bot
client.login(process.env.DISCORD_TOKEN);

