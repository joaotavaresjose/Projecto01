function Footer() {
  try {

    return (
      <footer data-name="footer" data-file="components/Footer.js" className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                  <div className="icon-dollar-sign text-xl text-white"></div>
                </div>
                <h3 className="text-2xl font-bold">CPA Ofertas</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                A plataforma mais confiável para ganhar dinheiro com ofertas CPA. 
                Milhares de usuários já estão lucrando conosco.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <div className="icon-facebook text-lg"></div>
                </button>
                <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <div className="icon-twitter text-lg"></div>
                </button>
                <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <div className="icon-instagram text-lg"></div>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                <li><a href="#ofertas" className="text-gray-300 hover:text-white transition-colors">Ofertas</a></li>
                <li><a href="#como-funciona" className="text-gray-300 hover:text-white transition-colors">Como Funciona</a></li>
                <li><a href="#ganhos" className="text-gray-300 hover:text-white transition-colors">Ganhos</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Suporte</h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <div className="icon-mail text-sm text-gray-400"></div>
                  <span className="text-gray-300 text-sm">suporte@cpaofertas.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="icon-phone text-sm text-gray-400"></div>
                  <span className="text-gray-300 text-sm">(11) 9999-9999</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="icon-clock text-sm text-gray-400"></div>
                  <span className="text-gray-300 text-sm">24h por dia</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 CPA Ofertas. Todos os direitos reservados. 
              Ganhe dinheiro de forma legal e transparente.
            </p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
  }
}