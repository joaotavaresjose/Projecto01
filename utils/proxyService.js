const ProxyService = {
  proxies: [],
  currentProxyIndex: 0,

  addProxy: async (proxyData) => {
    try {
      const proxy = {
        id: Date.now().toString(),
        ...proxyData,
        status: 'inactive',
        addedAt: new Date().toISOString()
      };

      await trickleCreateObject('proxy', proxy);
      ProxyService.proxies.push(proxy);
      
      return proxy;
    } catch (error) {
      console.error('Erro ao adicionar proxy:', error);
      throw error;
    }
  },

  getProxies: async () => {
    try {
      const result = await trickleListObjects('proxy', 50, true);
      ProxyService.proxies = result.items?.map(item => item.objectData) || [];
      return ProxyService.proxies;
    } catch (error) {
      console.error('Erro ao buscar proxies:', error);
      return [];
    }
  },

  testProxy: async (proxyId) => {
    try {
      const startTime = Date.now();
      
      // Simular teste de proxy
      await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));
      
      const responseTime = Date.now() - startTime;
      const status = Math.random() > 0.2 ? 'success' : 'failed';
      
      // Atualizar status do proxy
      const proxy = ProxyService.proxies.find(p => p.id === proxyId);
      if (proxy) {
        proxy.status = status === 'success' ? 'active' : 'inactive';
        proxy.lastTested = new Date().toISOString();
        proxy.responseTime = responseTime;
      }
      
      return { status, responseTime };
    } catch (error) {
      console.error('Erro ao testar proxy:', error);
      throw error;
    }
  },

  getRandomProxy: () => {
    const activeProxies = ProxyService.proxies.filter(p => p.status === 'active');
    if (activeProxies.length === 0) {
      return null;
    }
    return activeProxies[Math.floor(Math.random() * activeProxies.length)];
  },

  getCurrentIP: async () => {
    try {
      const proxy = ProxyService.getRandomProxy();
      return proxy ? proxy.ip : '192.168.1.' + Math.floor(Math.random() * 254 + 1);
    } catch (error) {
      return '192.168.1.100';
    }
  },

  rotateProxy: () => {
    ProxyService.currentProxyIndex = (ProxyService.currentProxyIndex + 1) % ProxyService.proxies.length;
    return ProxyService.proxies[ProxyService.currentProxyIndex];
  }
};