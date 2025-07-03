const ChatStorage = {
  // Save chat session to database
  saveChatSession: async (sessionData) => {
    try {
      const chatSession = {
        ...sessionData,
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      return await trickleCreateObject('chat_session', chatSession);
    } catch (error) {
      console.error('Error saving chat session:', error);
      throw error;
    }
  },

  // Save individual message with media support
  saveMessage: async (messageData) => {
    try {
      const message = {
        ...messageData,
        timestamp: new Date().toISOString()
      };
      
      // Handle file uploads for images and audio
      if (messageData.type === 'image' || messageData.type === 'voice') {
        message.mediaUrl = messageData.mediaUrl;
        message.fileName = messageData.fileName;
        message.fileSize = messageData.fileSize;
      }
      
      return await trickleCreateObject('chat_message', message);
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  },

  // Save media file
  saveMediaFile: async (file, messageId) => {
    try {
      const mediaData = {
        messageId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadedAt: new Date().toISOString()
      };
      
      return await trickleCreateObject('chat_media', mediaData);
    } catch (error) {
      console.error('Error saving media file:', error);
      throw error;
    }
  },

  // Get chat history with media
  getChatHistory: async (sessionId) => {
    try {
      const messages = await trickleListObjects(`chat_message:${sessionId}`, 50, false);
      return messages.items || [];
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  },

  // Update chat session status
  updateChatStatus: async (sessionId, status) => {
    try {
      return await trickleUpdateObject('chat_session', sessionId, { status });
    } catch (error) {
      console.error('Error updating chat status:', error);
      throw error;
    }
  },

  // Get active chat sessions for admin
  getActiveSessions: async () => {
    try {
      const sessions = await trickleListObjects('chat_session', 20, true);
      return sessions.items?.filter(session => session.objectData.status === 'active') || [];
    } catch (error) {
      console.error('Error fetching active sessions:', error);
      return [];
    }
  },

  // Download media file
  downloadMedia: async (mediaId) => {
    try {
      const media = await trickleGetObject('chat_media', mediaId);
      return media;
    } catch (error) {
      console.error('Error downloading media:', error);
      throw error;
    }
  }
};
