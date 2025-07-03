function About({ language }) {
  try {
    const content = {
      en: {
        title: 'About Our Organization',
        mission: 'Our Mission',
        vision: 'Our Vision',
        missionText: 'To serve humanity through Islamic principles, providing aid to the needy, supporting education, and fostering community development in rural Bangladesh.',
        visionText: 'A prosperous and self-reliant community where Islamic values guide social welfare and every individual has access to basic necessities and opportunities.',
        history: 'Our History',
        historyText: 'Established in 2010, Hasirpara Islamic Welfare Organization has been serving the rural communities of Bangladesh with dedication and Islamic values. We started with a small group of volunteers and have grown into a trusted organization.',
        values: ['Transparency', 'Islamic Values', 'Community Focus', 'Sustainability']
      },
      bn: {
        title: 'আমাদের সংস্থা সম্পর্কে',
        mission: 'আমাদের মিশন',
        vision: 'আমাদের দৃষ্টিভঙ্গি',
        missionText: 'ইসলামী নীতিমালার মাধ্যমে মানবসেবা করা, অভাবগ্রস্তদের সাহায্য করা, শিক্ষায় সহায়তা প্রদান এবং গ্রামীণ বাংলাদেশে সমাজ উন্নয়নে অবদান রাখা।',
        visionText: 'একটি সমৃদ্ধ ও স্বনির্ভর সমাজ যেখানে ইসলামী মূল্যবোধ সমাজকল্যাণে পথ দেখায় এবং প্রতিটি ব্যক্তির মৌলিক প্রয়োজন ও সুযোগের অধিকার থাকে।',
        history: 'আমাদের ইতিহাস',
        historyText: '২০১০ সালে প্রতিষ্ঠিত, হাছিরপাড়া ইসলামী সমাজকল্যাণ পরিষদ নিষ্ঠা ও ইসলামী মূল্যবোধ নিয়ে বাংলাদেশের গ্রামীণ সমাজে সেবা করে আসছে। আমরা স্বেচ্ছাসেবকদের ছোট দল নিয়ে শুরু করে একটি বিশ্বস্ত সংস্থায় পরিণত হয়েছি।',
        values: ['স্বচ্ছতা', 'ইসলামী মূল্যবোধ', 'সমাজ কেন্দ্রিক', 'টেকসইতা']
      }
    };

    React.useEffect(() => {
      lucide.createIcons();
    }, []);

    return (
      <section data-name="about" data-file="components/About.js" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold text-gray-800 mb-4 ${language === 'bn' ? 'bangla-text' : ''}`}>
              {content[language].title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-green-50 p-8 rounded-xl card-shadow">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <i data-lucide="target" className="w-6 h-6 text-white"></i>
                </div>
                <h3 className={`text-2xl font-bold text-green-600 ${language === 'bn' ? 'bangla-text' : ''}`}>
                  {content[language].mission}
                </h3>
              </div>
              <p className={`text-gray-700 leading-relaxed ${language === 'bn' ? 'bangla-text' : ''}`}>
                {content[language].missionText}
              </p>
            </div>

            <div className="bg-amber-50 p-8 rounded-xl card-shadow">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                  <i data-lucide="eye" className="w-6 h-6 text-white"></i>
                </div>
                <h3 className={`text-2xl font-bold text-amber-600 ${language === 'bn' ? 'bangla-text' : ''}`}>
                  {content[language].vision}
                </h3>
              </div>
              <p className={`text-gray-700 leading-relaxed ${language === 'bn' ? 'bangla-text' : ''}`}>
                {content[language].visionText}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <i data-lucide="book-open" className="w-6 h-6 text-white"></i>
              </div>
              <h3 className={`text-2xl font-bold text-blue-600 ${language === 'bn' ? 'bangla-text' : ''}`}>
                {content[language].history}
              </h3>
            </div>
            <p className={`text-gray-700 leading-relaxed ${language === 'bn' ? 'bangla-text' : ''}`}>
              {content[language].historyText}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {content[language].values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl card-shadow hover-lift">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i data-lucide="check-circle" className="w-8 h-8 text-green-500"></i>
                </div>
                <h4 className={`font-semibold text-gray-800 ${language === 'bn' ? 'bangla-text' : ''}`}>
                  {value}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('About component error:', error);
    reportError(error);
  }
}
