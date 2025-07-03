function Header() {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);


    return (
      <header data-name="header" data-file="components/Header.js" className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                <div className="icon-dollar-sign text-xl text-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">CPA Ofertas</h1>
                <p className="text-sm text-gray-600">Ganhe dinheiro online</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#ofertas" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Ofertas
              </a>
              <a href="#como-funciona" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Como Funciona
              </a>
              <a href="#ganhos" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Ganhos
              </a>
              <button className="btn-primary">
                Começar Agora
              </button>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-purple-600"
            >
              <div className={`icon-${isMenuOpen ? 'x' : 'menu'} text-xl`}></div>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t bg-white py-4">
              <div className="space-y-4">
                <a href="#ofertas" className="block text-gray-700 hover:text-purple-600 font-medium">
                  Ofertas
                </a>
                <a href="#como-funciona" className="block text-gray-700 hover:text-purple-600 font-medium">
                  Como Funciona
                </a>
                <a href="#ganhos" className="block text-gray-700 hover:text-purple-600 font-medium">
                  Ganhos
                </a>
                <button className="btn-primary w-full">
                  Começar Agora
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
  }
}