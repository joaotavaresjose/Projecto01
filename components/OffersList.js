function OffersList({ onOfferSelect }) {
  try {
    const [offers, setOffers] = React.useState([]);
    const [filter, setFilter] = React.useState('all');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const loadOffers = async () => {
        try {
          const offersData = await OffersManager.getAvailableOffers();
          setOffers(offersData);
        } catch (error) {
          console.error('Error loading offers:', error);
        } finally {
          setLoading(false);
        }
      };

      loadOffers();
    }, []);

    const filteredOffers = offers.filter(offer => {
      if (filter === 'all') return true;
      if (filter === 'high-pay') return parseFloat(offer.payout) >= 30;
      if (filter === 'easy') return offer.difficulty === 'Fácil';
      if (filter === 'quick') return offer.timeEstimate.includes('5 min') || offer.timeEstimate.includes('3 min');
      return true;
    });


    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      );
    }

    return (
      <section data-name="offers-list" data-file="components/OffersList.js" id="ofertas" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Ofertas Disponíveis Agora
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha entre dezenas de ofertas verificadas e comece a ganhar dinheiro hoje mesmo
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'all', label: 'Todas as Ofertas', icon: 'grid' },
              { id: 'high-pay', label: 'Alto Pagamento', icon: 'dollar-sign' },
              { id: 'easy', label: 'Fáceis', icon: 'smile' },
              { id: 'quick', label: 'Rápidas', icon: 'zap' }
            ].map(filterOption => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 ${
                  filter === filterOption.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-purple-100'
                }`}
              >
                <div className={`icon-${filterOption.icon} text-lg`}></div>
                <span>{filterOption.label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onSelect={onOfferSelect}
              />
            ))}
          </div>

          {filteredOffers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="icon-search text-2xl text-gray-400"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhuma oferta encontrada
              </h3>
              <p className="text-gray-500">
                Tente ajustar os filtros ou volte mais tarde para novas ofertas
              </p>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('OffersList component error:', error);
  }
}