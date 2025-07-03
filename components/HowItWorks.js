function HowItWorks() {
  try {
    const steps = [
      {
        step: 1,
        title: 'Escolha uma Oferta',
        description: 'Navegue pelas ofertas disponíveis e escolha a que mais se adequa ao seu perfil',
        icon: 'search'
      },
      {
        step: 2,
        title: 'Preencha o Formulário',
        description: 'Complete o formulário da oferta com suas informações reais e válidas',
        icon: 'edit'
      },
      {
        step: 3,
        title: 'Confirme sua Participação',
        description: 'Valide seu e-mail e complete qualquer ação adicional solicitada',
        icon: 'check-circle'
      },
      {
        step: 4,
        title: 'Receba seu Pagamento',
        description: 'Ganhe dinheiro automaticamente após a confirmação da conversão',
        icon: 'credit-card'
      }
    ];


    return (
      <section data-name="how-it-works" data-file="components/HowItWorks.js" id="como-funciona" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Processo simples e transparente para você começar a ganhar dinheiro hoje mesmo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="text-center relative">
                <div className="bg-gradient-to-br from-purple-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg">
                  {step.step}
                </div>
                
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className={`icon-${step.icon} text-2xl text-gray-600`}></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full">
                    <div className="w-full h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 relative">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                        <div className="icon-arrow-right text-lg text-purple-400"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Pronto para Começar?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Junte-se a milhares de pessoas que já estão ganhando dinheiro com ofertas CPA
            </p>
            <button className="btn-success text-xl px-12 py-4">
              <div className="icon-rocket text-xl inline mr-3"></div>
              Começar Agora
            </button>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('HowItWorks component error:', error);
  }
}
