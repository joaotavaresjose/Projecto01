function Gallery({ language }) {
  try {
    const content = {
      en: {
        title: 'Photo Gallery',
        subtitle: 'Moments from our humanitarian activities',
        categories: ['All', 'Zakat Distribution', 'Education', 'Medical Camp', 'Water Projects']
      },
      bn: {
        title: 'ছবির গ্যালারি',
        subtitle: 'আমাদের মানবিক কার্যক্রমের মুহূর্তসমূহ',
        categories: ['সব', 'যাকাত বিতরণ', 'শিক্ষা', 'চিকিৎসা শিবির', 'পানি প্রকল্প']
      }
    };

    const [activeCategory, setActiveCategory] = React.useState(0);

    const galleryImages = [
      { id: 1, category: 1, src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400', alt: 'Zakat Distribution' },
      { id: 2, category: 2, src: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400', alt: 'Education Support' },
      { id: 3, category: 3, src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', alt: 'Medical Camp' },
      { id: 4, category: 4, src: 'https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=400', alt: 'Water Project' },
      { id: 5, category: 1, src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400', alt: 'Community Support' },
      { id: 6, category: 2, src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400', alt: 'School Program' }
    ];

    const filteredImages = activeCategory === 0 
      ? galleryImages 
      : galleryImages.filter(img => img.category === activeCategory);

    React.useEffect(() => {
      lucide.createIcons();
    }, []);

    return (
      <section data-name="gallery" data-file="components/Gallery.js" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold text-gray-800 mb-4 ${language === 'bn' ? 'bangla-text' : ''}`}>
              {content[language].title}
            </h2>
            <p className={`text-xl text-gray-600 ${language === 'bn' ? 'bangla-text' : ''}`}>
              {content[language].subtitle}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {content[language].categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === index
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600'
                } ${language === 'bn' ? 'bangla-text' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="relative group overflow-hidden rounded-xl card-shadow hover-lift">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i data-lucide="zoom-in" className="w-8 h-8 text-white"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Gallery component error:', error);
    reportError(error);
  }
}
