function Programs({ language }) {
  try {
    const content = {
      en: {
        title: 'Our Programs',
        subtitle: 'Comprehensive welfare programs serving our community',
        programs: [
          {
            id: 'zakat',
            title: 'Zakat Distribution',
            description: 'Systematic distribution of Zakat to eligible recipients during Ramadan and throughout the year.',
            icon: 'hand-heart',
            color: 'green'
          },
          {
            id: 'orphan',
            title: 'Orphan Support',
            description: 'Educational support, healthcare, and monthly stipends for orphaned children in our community.',
            icon: 'baby',
            color: 'blue'
          },
          {
            id: 'education',
            title: 'Education Support',
            description: 'Scholarships, free books, and educational materials for underprivileged students.',
            icon: 'graduation-cap',
            color: 'purple'
          },
          {
            id: 'water',
            title: 'Clean Water Projects',
            description: 'Installing tube wells and water purification systems in rural areas.',
            icon: 'droplets',
            color: 'cyan'
          },
          {
            id: 'food',
            title: 'Food Distribution',
            description: 'Regular food packages for needy families and special Ramadan food programs.',
            icon: 'utensils',
            color: 'orange'
          },
          {
            id: 'medical',
            title: 'Medical Assistance',
            description: 'Free medical camps, medicine distribution, and emergency medical support.',
            icon: 'stethoscope',
            color: 'red'
          }
        ]
      },
      bn: {
        title: 'আমাদের কার্যক্রম',
        subtitle: 'আমাদের সমাজের জন্য ব্যাপক কল্যাণমূলক কার্যক্রম',
        programs: [
          {
            id: 'zakat',
            title: 'যাকাত বিতরণ',
            description: 'রমজান মাসে এবং বছরব্যাপী যোগ্য প্রাপকদের মধ্যে নিয়মতান্ত্রিক যাকাত বিতরণ।',
            icon: 'hand-heart',
            color: 'green'
          },
          {
            id: 'orphan',
            title: 'এতিম সহায়তা',
            description: 'আমাদের সমাজের এতিম শিশুদের শিক্ষা সহায়তা, স্বাস্থ্যসেবা এবং মাসিক বৃত্তি।',
            icon: 'baby',
            color: 'blue'
          },
          {
            id: 'education',
            title: 'শিক্ষা সহায়তা',
            description: 'অসহায় শিক্ষার্থীদের জন্য বৃত্তি, বিনামূল্যে বই এবং শিক্ষা উপকরণ।',
            icon: 'graduation-cap',
            color: 'purple'
          },
          {
            id: 'water',
            title: 'বিশুদ্ধ পানি প্রকল্প',
            description: 'গ্রামীণ এলাকায় নলকূপ স্থাপন এবং পানি বিশুদ্ধকরণ ব্যবস্থা।',
            icon: 'droplets',
            color: 'cyan'
          },
          {
            id: 'food',
            title: 'খাদ্য বিতরণ',
            description: 'অভাবগ্রস্ত পরিবারের জন্য নিয়মিত খাদ্য প্যাকেজ এবং বিশেষ রমজান খাদ্য কার্যক্রম।',
            icon: 'utensils',
            color: 'orange'
          },
          {
            id: 'medical',
            title: 'চিকিৎসা সহায়তা',
            description: 'বিনামূল্যে চিকিৎসা শিবির, ওষুধ বিতরণ এবং জরুরি চিকিৎসা সহায়তা।',
            icon: 'stethoscope',
            color: 'red'
          }
        ]
      }
    };

    const colorClasses = {
      green: 'bg-green-500 text-white',
      blue: 'bg-blue-500 text-white',
      purple: 'bg-purple-500 text-white',
      cyan: 'bg-cyan-500 text-white',
      orange: 'bg-orange-500 text-white',
      red: 'bg-red-500 text-white'
    };

    React.useEffect(() => {
      lucide.createIcons();
    }, []);

    return (
      <section data-name="programs" data-file="components/Programs.js" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold text-gray-800 mb-4 ${language === 'bn' ? 'bangla-text' : ''}`}>
              {content[language].title}
            </h2>
            <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${language === 'bn' ? 'bangla-text' : ''}`}>
              {content[language].subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content[language].programs.map((program) => (
              <div key={program.id} className="bg-white p-8 rounded-xl card-shadow hover-lift transition-all duration-300">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 ${colorClasses[program.color]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i data-lucide={program.icon} className="w-8 h-8"></i>
                  </div>
                  <h3 className={`text-xl font-bold text-gray-800 mb-3 ${language === 'bn' ? 'bangla-text' : ''}`}>
                    {program.title}
                  </h3>
                </div>
                <p className={`text-gray-600 text-center leading-relaxed ${language === 'bn' ? 'bangla-text' : ''}`}>
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Programs component error:', error);
    reportError(error);
  }
}
