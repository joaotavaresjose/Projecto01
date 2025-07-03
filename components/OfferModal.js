function OfferModal({ offer, isOpen, onClose, onComplete }) {
  try {
    const [step, setStep] = React.useState(1);
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      phone: ''
    });


    if (!isOpen || !offer) return null;

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        // Track conversion
        await TrackingManager.trackConversion(offer.id, formData);
        
        // Redirect to offer URL with tracking
        const trackingUrl = await TrackingManager.generateTrackingUrl(offer.url, offer.id);
        window.open(trackingUrl, '_blank');
        
        setStep(2);
        
        // Complete after 5 seconds
        setTimeout(() => {
          onComplete(offer);
          onClose();
          setStep(1);
        }, 5000);
        
      } catch (error) {
        console.error('Error submitting offer:', error);
        alert('Erro ao processar oferta. Tente novamente.');
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {step === 1 ? 'Complete seus Dados' : 'Redirecionando...'}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <div className="icon-x text-lg text-gray-600"></div>
              </button>
            </div>

            {step === 1 && (
              <div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl mb-6">
                  <div className="flex items-center space-x-3">
                    <img src={offer.logo} alt={offer.company} className="w-12 h-12 rounded-lg" />
                    <div>
                      <h4 className="font-bold text-gray-800">{offer.company}</h4>
                      <p className="text-green-600 font-semibold">R$ {offer.payout} por conversão</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Nome completo"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="E-mail"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Telefone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  
                  <button
                    type="submit"
                    className="w-full btn-success py-4 text-lg"
                  >
                    <div className="icon-arrow-right text-lg inline mr-2"></div>
                    Participar da Oferta
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-check text-2xl text-green-600"></div>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Sucesso!</h4>
                <p className="text-gray-600 mb-4">
                  Você será redirecionado para completar a oferta. 
                  Siga as instruções na nova página.
                </p>
                <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('OfferModal component error:', error);
  }
}