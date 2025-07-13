import { Client, GatewayIntentBits, Events } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, () => {
  console.log(`🟢 Logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  // Only delete messages in the specified channel
  if (message.channel.id !== CHANNEL_ID) return;

  const hasMedia =
    message.attachments.size > 0 ||                         // images, videos, files
    message.stickers.size > 0 ||                            // stickers
    /(tenor|giphy)\.com/.test(message.content.toLowerCase()); // GIFs via URL

  if (hasMedia) {
    try {
      await message.delete();
      console.log(`🧹 Deleted media from ${message.author.tag} in ${message.channel.name}`);
    } catch (err) {
      console.error('❌ Error deleting message:', err);
    }
  }
});

client.login(TOKEN);
