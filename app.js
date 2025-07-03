class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Oops! Algo deu errado
            </h1>
            <p className="text-gray-600 mb-6">
              Recarregue a página para tentar novamente
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [selectedOffer, setSelectedOffer] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
      // Track page view
      TrackingManager.trackPageView('home');
    }, []);

    const handleOfferSelect = async (offer) => {
      try {
        // Track offer click
        await TrackingManager.trackOfferClick(offer.id);
        
        setSelectedOffer(offer);
        setShowModal(true);
      } catch (error) {
        console.error('Error selecting offer:', error);
      }
    };

    const handleOfferComplete = async (offer) => {
      try {
        // Simulate earning tracking
        await TrackingManager.trackEarning('user_123', offer.id, offer.payout);
        
        alert(`Parabéns! Você ganhou R$ ${offer.payout}!`);
      } catch (error) {
        console.error('Error completing offer:', error);
      }
    };

    return (
      <div className="min-h-screen">
        <Header />
        <Hero />
        <OffersList onOfferSelect={handleOfferSelect} />
        <Stats />
        <HowItWorks />
        <Footer />
        
        <OfferModal
          offer={selectedOffer}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onComplete={handleOfferComplete}
        />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return <div>Erro ao carregar aplicação</div>;
  }
}

// Initialize the React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);