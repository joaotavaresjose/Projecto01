function FingerprintManager() {
  try {
    const [profiles, setProfiles] = React.useState([]);
    const [generating, setGenerating] = React.useState(false);

    const generateProfile = async () => {
      setGenerating(true);
      try {
        const profile = await FingerprintService.generateProfile();
        setProfiles([...profiles, profile]);
        alert('Perfil gerado com sucesso!');
      } catch (error) {
        alert('Erro ao gerar perfil: ' + error.message);
      } finally {
        setGenerating(false);
      }
    };

    const deleteProfile = async (profileId) => {
      try {
        await FingerprintService.deleteProfile(profileId);
        setProfiles(profiles.filter(p => p.id !== profileId));
      } catch (error) {
        alert('Erro ao deletar perfil: ' + error.message);
      }
    };

    React.useEffect(() => {
      const loadProfiles = async () => {
        const profileList = await FingerprintService.getProfiles();
        setProfiles(profileList);
      };
      loadProfiles();
    }, []);

    return (
      <div data-name="fingerprint-manager" data-file="components/FingerprintManager.js" 
           className="bg-white rounded-xl card-shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Perfis de Fingerprint</h3>
          <button
            onClick={generateProfile}
            disabled={generating}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50"
          >
            {generating ? 'Gerando...' : 'Gerar Perfil'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profiles.map((profile) => (
            <div key={profile.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{profile.name}</h4>
                <button
                  onClick={() => deleteProfile(profile.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Deletar
                </button>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div><strong>OS:</strong> {profile.os}</div>
                <div><strong>Browser:</strong> {profile.browser}</div>
                <div><strong>Resolução:</strong> {profile.resolution}</div>
                <div><strong>Timezone:</strong> {profile.timezone}</div>
                <div><strong>User Agent:</strong> {profile.userAgent.substring(0, 50)}...</div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    profile.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {profile.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    Criado: {new Date(profile.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('FingerprintManager component error:', error);
  }
}