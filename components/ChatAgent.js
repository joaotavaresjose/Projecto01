function ChatAgent({ language, onResponse }) {
  try {
    const generateResponse = async (userMessage) => {
      try {
        const systemPrompt = `You are a helpful assistant for Hasirpara Islamic Welfare Organization in Bangladesh. 
        Respond in ${language === 'bn' ? 'Bengali' : 'English'} language. 
        Be polite, Islamic in nature, and helpful about the organization's services like Zakat distribution, orphan support, education, medical aid, and donations.
        Keep responses concise and under 100 words.`;
        
        const response = await invokeAIAgent(systemPrompt, userMessage);
        return response;
      } catch (error) {
        return language === 'en' 
          ? 'Thank you for your message. Our team will get back to you soon.'
          : 'আপনার বার্তার জন্য ধন্যবাদ। আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।';
      }
    };

    const handleAutoResponse = async (message) => {
      // Check for common queries
      const lowerMessage = message.toLowerCase();
      const bengaliKeywords = ['দান', 'যাকাত', 'সাহায্য', 'এতিম', 'শিক্ষা'];
      const englishKeywords = ['donate', 'zakat', 'help', 'orphan', 'education'];
      
      let quickResponse = '';
      
      if (language === 'bn') {
        if (bengaliKeywords.some(keyword => lowerMessage.includes(keyword))) {
          quickResponse = await generateResponse(message);
        }
      } else {
        if (englishKeywords.some(keyword => lowerMessage.includes(keyword))) {
          quickResponse = await generateResponse(message);
        }
      }
      
      if (quickResponse) {
        setTimeout(() => {
          onResponse(quickResponse);
        }, 1500);
      }
    };

    return { handleAutoResponse };
  } catch (error) {
    console.error('ChatAgent component error:', error);
    reportError(error);
  }
}
