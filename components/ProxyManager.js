function ProxyManager() {
  try {
    const [proxies, setProxies] = React.useState([]);
    const [newProxy, setNewProxy] = React.useState({
      ip: '',
      port: '',
      username: '',
      password: '',
      country: ''
    });

    const addProxy = async () => {
      try {
        const proxy = await ProxyService.addProxy(newProxy);
        setProxies([...proxies, proxy]);
        setNewProxy({ ip: '', port: '', username: '', password: '', country: '' });
        alert('Proxy adicionado com sucesso!');
      } catch (error) {
        alert('Erro ao adicionar proxy: ' + error.message);
      }
    };

    const testProxy = async (proxyId) => {
      try {
        const result = await ProxyService.testProxy(proxyId);
        alert(`Proxy testado: ${result.status} - ${result.responseTime}ms`);
      } catch (error) {
        alert('Erro ao testar proxy: ' + error.message);
      }
    };

    React.useEffect(() => {
      const loadProxies = async () => {
        const proxyList = await ProxyService.getProxies();
        setProxies(proxyList);
      };
      loadProxies();
    }, []);

    return (
      <div data-name="proxy-manager" data-file="components/ProxyManager.js" 
           className="bg-white rounded-xl card-shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Gerenciador de Proxies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          <input
            type="text"
            placeholder="IP"
            value={newProxy.ip}
            onChange={(e) => setNewProxy({...newProxy, ip: e.target.value})}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Porta"
            value={newProxy.port}
            onChange={(e) => setNewProxy({...newProxy, port: e.target.value})}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Usuário"
            value={newProxy.username}
            onChange={(e) => setNewProxy({...newProxy, username: e.target.value})}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Senha"
            value={newProxy.password}
            onChange={(e) => setNewProxy({...newProxy, password: e.target.value})}
            className="px-3 py-2 border rounded-lg"
          />
          <button
            onClick={addProxy}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Adicionar
          </button>
        </div>

        <div className="space-y-3">
          {proxies.map((proxy, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  proxy.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="font-medium">{proxy.ip}:{proxy.port}</span>
                <span className="text-sm text-gray-600">{proxy.country}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => testProxy(proxy.id)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                >
                  Testar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProxyManager component error:', error);
  }
}