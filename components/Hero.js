function Hero() {
  try {

    return (
      <section data-name="hero" data-file="components/Hero.js" className="gradient-primary money-bg py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-in">
              <div className="w-24 h-24 gradient-success rounded-full flex items-center justify-center mx-auto mb-8 pulse-animation">
                <div className="icon-trending-up text-4xl text-white"></div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Ganhe Dinheiro
                <span className="block text-yellow-300">Preenchendo Formulários</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
                Descubra ofertas exclusivas CPA e ganhe até R$ 50 por formulário preenchido. 
                Simples, rápido e lucrativo!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <button className="btn-success text-xl px-12 py-6">
                <div className="icon-rocket text-xl inline mr-3"></div>
                Começar a Ganhar Agora
              </button>
              
              <div className="flex items-center space-x-2 text-yellow-300">
                <div className="icon-users text-xl"></div>
                <span className="text-lg font-semibold">+10.000 usuários ganhando</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: 'dollar-sign', value: 'R$ 2.850', label: 'Ganho médio mensal' },
                { icon: 'clock', value: '5-10 min', label: 'Por formulário' },
                { icon: 'zap', value: '24h', label: 'Pagamento rápido' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className={`icon-${stat.icon} text-2xl text-white`}></div>
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
  }
}