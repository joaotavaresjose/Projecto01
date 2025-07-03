const FingerprintService = {
  profiles: [],

  generateProfile: async () => {
    try {
      const osOptions = ['Windows 10', 'Windows 11', 'macOS 12', 'Ubuntu 20.04'];
      const browserOptions = ['Chrome 119', 'Firefox 120', 'Edge 119', 'Safari 17'];
      const resolutions = ['1920x1080', '1366x768', '1440x900', '1600x900', '1280x720'];
      const timezones = ['America/Sao_Paulo', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];
      
      const profile = {
        id: Date.now().toString(),
        name: `Profile_${Date.now()}`,
        os: osOptions[Math.floor(Math.random() * osOptions.length)],
        browser: browserOptions[Math.floor(Math.random() * browserOptions.length)],
        resolution: resolutions[Math.floor(Math.random() * resolutions.length)],
        timezone: timezones[Math.floor(Math.random() * timezones.length)],
        userAgent: FingerprintService.generateUserAgent(),
        webgl: FingerprintService.generateWebGL(),
        canvas: FingerprintService.generateCanvas(),
        audio: FingerprintService.generateAudio(),
        status: 'active',
        createdAt: new Date().toISOString()
      };

      await trickleCreateObject('fingerprint_profile', profile);
      FingerprintService.profiles.push(profile);
      
      return profile;
    } catch (error) {
      console.error('Erro ao gerar perfil:', error);
      throw error;
    }
  },

  generateUserAgent: () => {
    const agents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0'
    ];
    return agents[Math.floor(Math.random() * agents.length)];
  },

  generateWebGL: () => {
    return {
      vendor: 'Google Inc.',
      renderer: 'ANGLE (Intel, Intel(R) HD Graphics 620 Direct3D11 vs_5_0 ps_5_0, D3D11-27.20.100.8935)',
      version: 'WebGL 1.0 (OpenGL ES 2.0 Chromium)'
    };
  },

  generateCanvas: () => {
    return Math.random().toString(36).substring(2, 15);
  },

  generateAudio: () => {
    return (Math.random() * 100).toFixed(6);
  },

  getProfiles: async () => {
    try {
      const result = await trickleListObjects('fingerprint_profile', 50, true);
      FingerprintService.profiles = result.items?.map(item => item.objectData) || [];
      return FingerprintService.profiles;
    } catch (error) {
      console.error('Erro ao buscar perfis:', error);
      return [];
    }
  },

  deleteProfile: async (profileId) => {
    try {
      await trickleDeleteObject('fingerprint_profile', profileId);
      FingerprintService.profiles = FingerprintService.profiles.filter(p => p.id !== profileId);
    } catch (error) {
      console.error('Erro ao deletar perfil:', error);
      throw error;
    }
  },

  getRandomUserAgent: () => {
    const activeProfiles = FingerprintService.profiles.filter(p => p.status === 'active');
    if (activeProfiles.length === 0) {
      return FingerprintService.generateUserAgent();
    }
    const profile = activeProfiles[Math.floor(Math.random() * activeProfiles.length)];
    return profile.userAgent;
  }
};