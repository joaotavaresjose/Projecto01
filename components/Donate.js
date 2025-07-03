function Donate({ language }) {
  try {
    const [donationType, setDonationType] = React.useState('general');
    const [amount, setAmount] = React.useState('');
    const [zakatWealth, setZakatWealth] = React.useState('');

    const content = {
      en: {
        title: 'Support Our Cause',
        subtitle: 'Your donation helps us serve the community better',
        donationTypes: {
          general: 'General Donation',
          zakat: 'Zakat',
          sadaqah: 'Sadaqah',
          orphan: 'Orphan Support'
        },
        zakatCalculator: 'Zakat Calculator',
        totalWealth: 'Total Wealth (BDT)',
        calculateZakat: 'Calculate Zakat',
        donateNow: 'Donate Now',
        paymentMethods: 'Payment Methods'
      },
      bn: {
        title: 'আমাদের সহায়তা করুন',
        subtitle: 'আপনার দান আমাদের সমাজসেবায় আরও ভালো কাজ করতে সাহায্য করে',
        donationTypes: {
          general: 'সাধারণ দান',
          zakat: 'যাকাত',
          sadaqah: 'সদকা',
          orphan: 'এতিম সহায়তা'
        },
        zakatCalculator: 'যাকাত ক্যালকুলেটর',
        totalWealth: 'মোট সম্পদ (টাকা)',
        calculateZakat: 'যাকাত হিসাব করুন',
        donateNow: 'এখনই দান করুন',
        paymentMethods: 'পেমেন্ট পদ্ধতি'
      }
    };

    const calculateZakat = () => {
      const wealth = parseFloat(zakatWealth);
      if (wealth >= 87000) { // Nisab amount in BDT
        const zakatAmount = wealth * 0.025;
        setAmount(zakatAmount.toFixed(2));
        setDonationType('zakat');
      }
    };

    React.useEffect(() => {
      lucide.createIcons();
    }, []);

    return (
      <section data-name="donate" data-file="components/Donate.js" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold text-gray-800 mb-4 ${language === 'bn' ? 'bangla-text' : ''}`}>
              {content[language].title}
            </h2>
            <p className={`text-xl text-gray-600 ${language === 'bn' ? 'bangla-text' : ''}`}>
              {content[language].subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-green-50 p-8 rounded-xl">
              <h3 className={`text-2xl font-bold text-green-600 mb-6 ${language === 'bn' ? 'bangla-text' : ''}`}>
                {content[language].zakatCalculator}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-gray-700 font-medium mb-2 ${language === 'bn' ? 'bangla-text' : ''}`}>
                    {content[language].totalWealth}
                  </label>
                  <input
                    type="number"
                    value={zakatWealth}
                    onChange={(e) => setZakatWealth(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <button
                  onClick={calculateZakat}
                  className={`w-full btn-primary ${language === 'bn' ? 'bangla-text' : ''}`}
                >
                  {content[language].calculateZakat}
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl card-shadow">
              <h3 className={`text-2xl font-bold text-gray-800 mb-6 ${language === 'bn' ? 'bangla-text' : ''}`}>
                {content[language].donateNow}
              </h3>
              <div className="space-y-6">
                <div>
                  <label className={`block text-gray-700 font-medium mb-3 ${language === 'bn' ? 'bangla-text' : ''}`}>
                    Donation Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(content[language].donationTypes).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setDonationType(key)}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          donationType === key
                            ? 'border-green-500 bg-green-50 text-green-600'
                            : 'border-gray-200 hover:border-green-300'
                        } ${language === 'bn' ? 'bangla-text' : ''}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-gray-700 font-medium mb-2 ${language === 'bn' ? 'bangla-text' : ''}`}>
                    Amount (BDT)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className={`block text-gray-700 font-medium mb-3 ${language === 'bn' ? 'bangla-text' : ''}`}>
                    {content[language].paymentMethods}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['bKash', 'Nagad', 'Card'].map((method) => (
                      <button
                        key={method}
                        className="p-3 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors text-center"
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <button className={`w-full btn-primary text-lg py-4 ${language === 'bn' ? 'bangla-text' : ''}`}>
                  <i data-lucide="heart" className="w-5 h-5 inline mr-2"></i>
                  {content[language].donateNow}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Donate component error:', error);
    reportError(error);
  }
}
