const OffersManager = {
  getAvailableOffers: async () => {
    try {
      // Simulate API call to get offers
      const offers = [
        {
          id: 'offer-1',
          company: 'Netflix',
          title: 'Cadastro Grátis Netflix - 30 dias',
          description: 'Cadastre-se no Netflix e ganhe 30 dias grátis. Oferta válida para novos usuários.',
          payout: '45.00',
          difficulty: 'Fácil',
          timeEstimate: '5 min',
          conversionRate: '85%',
          expires: '31/12/2024',
          logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100',
          url: 'https://netflix.com/signup'
        },
        {
          id: 'offer-2',
          company: 'Spotify',
          title: 'Spotify Premium - 3 meses grátis',
          description: 'Experimente o Spotify Premium por 3 meses sem pagar nada.',
          payout: '32.50',
          difficulty: 'Fácil',
          timeEstimate: '3 min',
          conversionRate: '92%',
          expires: '30/12/2024',
          logo: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=100',
          url: 'https://spotify.com/premium'
        },
        {
          id: 'offer-3',
          company: 'Nubank',
          title: 'Cartão de Crédito sem Anuidade',
          description: 'Solicite seu cartão Nubank sem anuidade e sem complicação.',
          payout: '55.00',
          difficulty: 'Médio',
          timeEstimate: '10 min',
          conversionRate: '78%',
          expires: '15/01/2025',
          logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100',
          url: 'https://nubank.com.br/cartao'
        },
        {
          id: 'offer-4',
          company: 'Amazon Prime',
          title: 'Amazon Prime - 30 dias grátis',
          description: 'Teste o Amazon Prime por 30 dias com frete grátis e Prime Video.',
          payout: '28.00',
          difficulty: 'Fácil',
          timeEstimate: '5 min',
          conversionRate: '89%',
          expires: '25/12/2024',
          logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100',
          url: 'https://amazon.com.br/prime'
        },
        {
          id: 'offer-5',
          company: 'Uber Eats',
          title: 'Primeira Entrega Grátis',
          description: 'Cadastre-se no Uber Eats e ganhe sua primeira entrega grátis.',
          payout: '15.50',
          difficulty: 'Fácil',
          timeEstimate: '3 min',
          conversionRate: '95%',
          expires: '31/12/2024',
          logo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100',
          url: 'https://ubereats.com'
        },
        {
          id: 'offer-6',
          company: 'iFood',
          title: 'Cupom de R$ 20 OFF',
          description: 'Novo no iFood? Ganhe R$ 20 de desconto no seu primeiro pedido.',
          payout: '22.00',
          difficulty: 'Fácil',
          timeEstimate: '4 min',
          conversionRate: '87%',
          expires: '28/12/2024',
          logo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100',
          url: 'https://ifood.com.br'
        }
      ];

      return offers;
    } catch (error) {
      console.error('Error fetching offers:', error);
      return [];
    }
  },

  getOfferById: async (offerId) => {
    try {
      const offers = await OffersManager.getAvailableOffers();
      return offers.find(offer => offer.id === offerId);
    } catch (error) {
      console.error('Error fetching offer:', error);
      return null;
    }
  },

  validateOffer: (offer) => {
    if (!offer.id || !offer.company || !offer.payout) {
      return false;
    }
    return true;
  }
};