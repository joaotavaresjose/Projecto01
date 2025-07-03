function OfferCard({ offer, onSelect }) {
  try {
    const getDifficultyColor = (difficulty) => {
      switch (difficulty) {
        case 'Fácil': return 'bg-green-100 text-green-800';
        case 'Médio': return 'bg-yellow-100 text-yellow-800';
        case 'Difícil': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };


    return (
      <div data-name="offer-card" data-file="components/OfferCard.js" 
           className="bg-white rounded-2xl card-shadow hover-lift p-6 border border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src={offer.logo} 
              alt={offer.company}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-bold text-gray-800">{offer.company}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(offer.difficulty)}`}>
                {offer.difficulty}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">R$ {offer.payout}</div>
            <div className="text-sm text-gray-500">por conversão</div>
          </div>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 mb-3">{offer.title}</h4>
        <p className="text-gray-600 mb-4 line-clamp-2">{offer.description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Tempo estimado:</span>
            <span className="font-medium">{offer.timeEstimate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Taxa de conversão:</span>
            <span className="font-medium text-green-600">{offer.conversionRate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Disponível até:</span>
            <span className="font-medium text-orange-600">{offer.expires}</span>
          </div>
        </div>

        <button 
          onClick={() => onSelect(offer)}
          className="w-full btn-success py-3 text-base"
        >
          <div className="icon-arrow-right text-lg inline mr-2"></div>
          Participar Agora
        </button>
      </div>
    );
  } catch (error) {
    console.error('OfferCard component error:', error);
  }
}