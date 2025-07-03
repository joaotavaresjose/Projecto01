function AutomationPanel() {
  try {
    const [isRunning, setIsRunning] = React.useState(false);
    const [stats, setStats] = React.useState({
      dailyLeads: 0,
      totalEarnings: 0,
      successRate: 0,
      activeProfiles: 0
    });
    const [settings, setSettings] = React.useState({
      dailyTarget: 500,
      offerValue: 2.00,
      delayBetween: 30,
      useProxyRotation: true,
      useFingerprintRotation: true
    });

    const startAutomation = async () => {
      setIsRunning(true);
      try {
        await AutomationManager.startLeadGeneration(settings);
        alert('Automação iniciada com sucesso!');
      } catch (error) {
        alert('Erro ao iniciar automação: ' + error.message);
        setIsRunning(false);
      }
    };

    const stopAutomation = () => {
      AutomationManager.stopLeadGeneration();
      setIsRunning(false);
    };

    React.useEffect(() => {
      const interval = setInterval(async () => {
        const currentStats = await AutomationManager.getStats();
        setStats(currentStats);
      }, 5000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div data-name="automation-panel" data-file="components/AutomationPanel.js" 
           className="bg-white rounded-xl card-shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Painel de Automação</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isRunning ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
          }`}>
            {isRunning ? 'Ativo' : 'Parado'}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.dailyLeads}</div>
            <div className="text-sm text-gray-600">Leads Hoje</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              ${stats.totalEarnings.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Ganhos Hoje</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.successRate}%</div>
            <div className="text-sm text-gray-600">Taxa Sucesso</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.activeProfiles}</div>
            <div className="text-sm text-gray-600">Perfis Ativos</div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Diária de Leads
              </label>
              <input
                type="number"
                value={settings.dailyTarget}
                onChange={(e) => setSettings({...settings, dailyTarget: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg"
                min="1"
                max="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor por Lead ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.offerValue}
                onChange={(e) => setSettings({...settings, offerValue: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          {!isRunning ? (
            <button
              onClick={startAutomation}
              className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
            >
              Iniciar Automação
            </button>
          ) : (
            <button
              onClick={stopAutomation}
              className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors"
            >
              Parar Automação
            </button>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('AutomationPanel component error:', error);
  }
}