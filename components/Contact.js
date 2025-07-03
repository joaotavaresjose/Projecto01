function Contact({ language }) {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      phone: '',
      message: ''
    });

    const content = {
      en: {
        title: 'Contact Us',
        subtitle: 'Get in touch with us for any queries or support',
        form: {
          name: 'Full Name',
          email: 'Email Address',
          phone: 'Phone Number',
          message: 'Your Message',
          submit: 'Send Message'
        },
        info: {
          address: 'Hasirpara, Rangpur, Bangladesh',
          phone: '+880 1XXX-XXXXXX',
          email: 'info@hasirparaislamic.org',
          hours: 'Sunday - Thursday: 9:00 AM - 5:00 PM'
        }
      },
      bn: {
        title: 'যোগাযোগ করুন',
        subtitle: 'যেকোনো প্রশ্ন বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন',
        form: {
          name: 'পূর্ণ নাম',
          email: 'ইমেইল ঠিকানা',
          phone: 'ফোন নম্বর',
          message: 'আপনার বার্তা',
          submit: 'বার্তা পাঠান'
        },
        info: {
          address: 'হাছিরপাড়া, রংপুর, বাংলাদেশ',
          phone: '+৮৮০ ১XXX-XXXXXX',
          email: 'info@hasirparaislamic.org',
          hours: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০'
        }
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert(language === 'en' ? 'Message sent successfully!' : 'বার্তা সফলভাবে পাঠানো হয়েছে!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } catch (error) {
        alert(language === 'en' ? 'Error sending message' : 'বার্তা পাঠাতে ত্রুটি');
      }
    };

    React.useEffect(() => {
      lucide.createIcons();
    }, []);

    return (
      <section data-name="contact" data-file="components/Contact.js" className="py-20 bg-gray-50">
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
            <div className="bg-white p-8 rounded-xl card-shadow">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder={content[language].form.name}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder={content[language].form.email}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder={content[language].form.message}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
                <button type="submit" className={`w-full btn-primary ${language === 'bn' ? 'bangla-text' : ''}`}>
                  {content[language].form.submit}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              {[
                { icon: 'map-pin', label: content[language].info.address },
                { icon: 'phone', label: content[language].info.phone },
                { icon: 'mail', label: content[language].info.email },
                { icon: 'clock', label: content[language].info.hours }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <i data-lucide={item.icon} className="w-6 h-6 text-white"></i>
                  </div>
                  <span className={`text-gray-700 ${language === 'bn' ? 'bangla-text' : ''}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Contact component error:', error);
    reportError(error);
  }
}
