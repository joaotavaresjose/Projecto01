function Stats() {
  try {
    const [stats, setStats] = React.useState({
      totalEarnings: 0,
      activeUsers: 0,
      completedOffers: 0,
      averagePayout: 0
    });

    React.useEffect(() => {
      const animateStats = () => {
        const targetStats = {
          totalEarnings: 285000,
          activeUsers: 12450,
          completedOffers: 45230,
          averagePayout: 28.50
        };

        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          
          setStats({
            totalEarnings: Math.floor(targetStats.totalEarnings * progress),
            activeUsers: Math.floor(targetStats.activeUsers * progress),
            completedOffers: Math.floor(targetStats.completedOffers * progress),
            averagePayout: (targetStats.averagePayout * progress).toFixed(2)
          });

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepDuration);
      };

      animateStats();
    }, []);


    return (
      <section data-name="stats" data-file="components/Stats.js" id="ganhos" className="py-20 gradient-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Números que Impressionam
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Veja o que nossa comunidade já conquistou e faça parte desse sucesso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="icon-dollar-sign text-2xl text-white"></div>
              </div>
              <div className="text-4xl font-bold mb-2">
                R$ {stats.totalEarnings.toLocaleString()}
              </div>
              <div className="text-white/80 font-medium">
                Total Pago aos Usuários
              </div>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="icon-users text-2xl text-white"></div>
              </div>
              <div className="text-4xl font-bold mb-2">
                {stats.activeUsers.toLocaleString()}
              </div>
              <div className="text-white/80 font-medium">
                Usuários Ativos
              </div>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="icon-check-circle text-2xl text-white"></div>
              </div>
              <div className="text-4xl font-bold mb-2">
                {stats.completedOffers.toLocaleString()}
              </div>
              <div className="text-white/80 font-medium">
                Ofertas Completadas
              </div>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="icon-trending-up text-2xl text-white"></div>
              </div>
              <div className="text-4xl font-bold mb-2">
                R$ {stats.averagePayout}
              </div>
              <div className="text-white/80 font-medium">
                Pagamento Médio
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <button className="btn-success text-xl px-12 py-6">
              <div className="icon-arrow-right text-xl inline mr-3"></div>
              Junte-se à Comunidade
            </button>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Stats component error:', error);
  }
}