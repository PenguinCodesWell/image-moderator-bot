client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // 🔒 Only act inside 👻☆chat☆
  if (message.channel.name === '👻☆chat☆') {
    const hasAttachment = message.attachments.size > 0;
    const hasSticker = message.stickers.size > 0;

    // Check for image or video links
    const mediaLinkRegex = /\.(jpg|jpeg|png|gif|bmp|webp|mp4|mov|webm)$/i;
    const hasMediaLink = mediaLinkRegex.test(message.content);

    if (hasAttachment || hasSticker || hasMediaLink) {
      try {
        await message.delete();
      } catch (err) {
        console.error("❌ Failed to delete a message:", err);
      }
    }
  }
});
