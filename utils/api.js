const ApiManager = {
  // News management
  getNews: async () => {
    try {
      const news = await trickleListObjects('news', 10, true);
      return news.items || [];
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  },

  createNews: async (newsData) => {
    try {
      return await trickleCreateObject('news', newsData);
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  },

  // Donation management
  createDonation: async (donationData) => {
    try {
      const donation = {
        ...donationData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      return await trickleCreateObject('donation', donation);
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    }
  },

  getDonations: async () => {
    try {
      const donations = await trickleListObjects('donation', 50, true);
      return donations.items || [];
    } catch (error) {
      console.error('Error fetching donations:', error);
      return [];
    }
  },

  // Contact form submissions
  submitContact: async (contactData) => {
    try {
      const contact = {
        ...contactData,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      return await trickleCreateObject('contact', contact);
    } catch (error) {
      console.error('Error submitting contact:', error);
      throw error;
    }
  },

  // Gallery management
  getGalleryImages: async () => {
    try {
      const images = await trickleListObjects('gallery', 20, true);
      return images.items || [];
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }
  },

  createGalleryImage: async (imageData) => {
    try {
      return await trickleCreateObject('gallery', imageData);
    } catch (error) {
      console.error('Error creating gallery image:', error);
      throw error;
    }
  }
};
