function News({ language }) {
  try {
    const content = {
      en: {
        title: 'Latest News & Events',
        subtitle: 'Stay updated with our recent activities and announcements',
        readMore: 'Read More'
      },
      bn: {
        title: 'সাম্প্রতিক সংবাদ ও ঘটনা',
        subtitle: 'আমাদের সাম্প্রতিক কার্যক্রম ও ঘোষণা সম্পর্কে জানুন',
        readMore: 'আরও পড়ুন'
      }
    };

    const newsItems = {
      en: [
        {
          id: 1,
          title: 'Ramadan Food Distribution Program 2024',
          excerpt: 'Successfully distributed food packages to 200 families during the holy month of Ramadan.',
          date: '2024-04-15',
          image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400'
        },
        {
          id: 2,
          title: 'New Tube Well Installation Project',
          excerpt: 'Installed 5 new tube wells in remote villages to provide clean drinking water access.',
          date: '2024-03-20',
          image: 'https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=400'
        },
        {
          id: 3,
          title: 'Educational Scholarship Program Launch',
          excerpt: 'Launched scholarship program for 50 underprivileged students in our community.',
          date: '2024-02-10',
          image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400'
        }
      ],
      bn: [
        {
          id: 1,
          title: 'রমজান খাদ্য বিতরণ কার্যক্রম ২০২৪',
          excerpt: 'পবিত্র রমজান মাসে ২০০টি পরিবারে সফলভাবে খাদ্য প্যাকেজ বিতরণ করা হয়েছে।',
          date: '২০২৪-০৪-১৫',
          image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400'
        },
        {
          id: 2,
          title: 'নতুন নলকূপ স্থাপন প্রকল্প',
          excerpt: 'দুর্গম গ্রামে বিশুদ্ধ পানীয় জলের সুবিধার জন্য ৫টি নতুন নলকূপ স্থাপন করা হয়েছে।',
          date: '২০২৪-০৩-২০',
          image: 'https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=400'
        },
        {
          id: 3,
          title: 'শিক্ষা বৃত্তি কার্যক্রম চালু',
          excerpt: 'আমাদের সমাজের ৫০ জন অসহায় শিক্ষার্থীর জন্য বৃত্তি কার্যক্রম চালু করা হয়েছে।',
          date: '২০২৪-০২-১০',
          image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400'
        }
      ]
    };

    React.useEffect(() => {
      lucide.createIcons();
    }, []);

    return (
      <section data-name="news" data-file="components/News.js" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold text-gray-800 mb-4 ${language === 'bn' ? 'bangla-text' : ''}`}>
              {content[language].title}
            </h2>
            <p className={`text-xl text-gray-600 ${language === 'bn' ? 'bangla-text' : ''}`}>
              {content[language].subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems[language].map((item) => (
              <article key={item.id} className="bg-white rounded-xl card-shadow hover-lift overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-green-600 font-medium mb-2">
                    {item.date}
                  </div>
                  <h3 className={`text-xl font-bold text-gray-800 mb-3 ${language === 'bn' ? 'bangla-text' : ''}`}>
                    {item.title}
                  </h3>
                  <p className={`text-gray-600 mb-4 ${language === 'bn' ? 'bangla-text' : ''}`}>
                    {item.excerpt}
                  </p>
                  <button className={`text-green-600 font-medium hover:text-green-700 transition-colors ${language === 'bn' ? 'bangla-text' : ''}`}>
                    {content[language].readMore}
                    <i data-lucide="arrow-right" className="w-4 h-4 inline ml-1"></i>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('News component error:', error);
    reportError(error);
  }
}
