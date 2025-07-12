// Load discord.js and dotenv
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Create the bot client with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// When bot starts up
client.once('ready', () => {
  console.log(`🟢 Logged in as ${client.user.tag}`);
});

// When a new message is sent
client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignore bot messages

  // Allow media ONLY in 📸☆media☆ channel
  if (message.channel.name !== '📸☆media☆') {
    const hasAttachment = message.attachments.size > 0;
    const hasSticker = message.stickers.size > 0;

    // Match links like .jpg, .mp4, etc.
    const mediaLinkRegex = /\.(jpg|jpeg|png|gif|bmp|webp|mp4|mov|webm)$/i;
    const hasMediaLink = mediaLinkRegex.test(message.content);

    // If any media detected, delete the message
    if (hasAttachment || hasSticker || hasMediaLink) {
      try {
        await message.delete();
        console.log(`🧹 Deleted media message from ${message.author.tag} in #${message.channel.name}`);
      } catch (err) {
        console.error('❌ Could not delete message:', err);
      }
    }
  }
});

// Log in to Discord using your token
client.login(process.env.DISCORD_TOKEN);
