client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // ✅ Only act inside 👻☆chat☆
  if (message.channel.name === '👻☆chat☆') {
    const hasAttachment = message.attachments.size > 0;
    const hasSticker = message.stickers.size > 0;

    // Matches links ending with image/video file types
    const imageOrVideoLinkRegex = /\.(jpg|jpeg|png|gif|bmp|webp|mp4|mov|webm)$/i;
    const hasEmbeddedMedia = imageOrVideoLinkRegex.test(message.content);

    if (hasAttachment || hasSticker || hasEmbeddedMedia) {
      try {
        await message.delete();
        await message.channel.send({
          content: `${message.author}, you can't send images, videos, or stickers in this channel.`,
        });
      } catch (err) {
        console.error("Failed to delete media message:", err);
      }
    }
  }
});
