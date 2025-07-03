function LiveChat({ language }) {
  try {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState('');
    const [isRecording, setIsRecording] = React.useState(false);
    const [isTyping, setIsTyping] = React.useState(false);
    const [recordingTime, setRecordingTime] = React.useState(0);
    const [recordingTimer, setRecordingTimer] = React.useState(null);

    const content = {
      en: {
        title: 'Live Chat Support',
        placeholder: 'Type your message...',
        send: 'Send',
        typing: 'Agent is typing...',
        online: 'We are online',
        offline: 'Leave a message',
        recording: 'Recording...',
        download: 'Download'
      },
      bn: {
        title: 'লাইভ চ্যাট সাপোর্ট',
        placeholder: 'আপনার বার্তা লিখুন...',
        send: 'পাঠান',
        typing: 'এজেন্ট টাইপ করছে...',
        online: 'আমরা অনলাইনে আছি',
        offline: 'বার্তা রেখে যান',
        recording: 'রেকর্ড করছি...',
        download: 'ডাউনলোড'
      }
    };

    const sendMessage = async () => {
      if (!newMessage.trim()) return;
      
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      setIsTyping(true);

      setTimeout(() => {
        const response = {
          id: Date.now() + 1,
          text: language === 'en' ? 'Thank you for contacting us. How can we help you?' : 'আমাদের সাথে যোগাযোগের জন্য ধন্যবাদ। কিভাবে সাহায্য করতে পারি?',
          sender: 'agent',
          timestamp: new Date().toLocaleTimeString(),
          type: 'text'
        };
        setMessages(prev => [...prev, response]);
        setIsTyping(false);
      }, 2000);
    };

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const message = {
          id: Date.now(),
          image: URL.createObjectURL(file),
          fileName: file.name,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString(),
          type: 'image'
        };
        setMessages(prev => [...prev, message]);
      }
    };

    const downloadImage = (imageUrl, fileName) => {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = fileName || 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const startRecording = () => {
      setIsRecording(true);
      setRecordingTime(0);
      
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 300) { // 5 minutes = 300 seconds
            stopRecording();
            return 300;
          }
          return prev + 1;
        });
      }, 1000);
      
      setRecordingTimer(timer);
    };

    const stopRecording = () => {
      setIsRecording(false);
      if (recordingTimer) {
        clearInterval(recordingTimer);
        setRecordingTimer(null);
      }
      
      const voiceMessage = {
        id: Date.now(),
        text: `🎵 ${language === 'en' ? 'Voice message' : 'ভয়েস বার্তা'} (${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')})`,
        audioUrl: 'data:audio/wav;base64,mock_audio_data',
        duration: recordingTime,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
        type: 'voice'
      };
      setMessages(prev => [...prev, voiceMessage]);
      setRecordingTime(0);
    };

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    React.useEffect(() => {
      lucide.createIcons();
    }, [isOpen, messages]);

    return (
      <div data-name="livechat" data-file="components/LiveChat.js">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <i data-lucide={isOpen ? 'x' : 'message-circle'} className="w-8 h-8"></i>
        </button>

        {isOpen && (
          <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl z-50 flex flex-col border">
            <div className="bg-green-500 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-semibold ${language === 'bn' ? 'bangla-text' : ''}`}>
                    {content[language].title}
                  </h3>
                  <p className={`text-xs opacity-90 ${language === 'bn' ? 'bangla-text' : ''}`}>
                    {content[language].online}
                  </p>
                </div>
                <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.type === 'image' && (
                      <div className="relative">
                        <img src={msg.image} alt="Shared" className="w-full h-32 object-cover rounded mb-2" />
                        <button
                          onClick={() => downloadImage(msg.image, msg.fileName)}
                          className="absolute top-1 right-1 bg-black bg-opacity-50 text-white p-1 rounded text-xs hover:bg-opacity-75"
                        >
                          <i data-lucide="download" className="w-3 h-3"></i>
                        </button>
                      </div>
                    )}
                    
                    {msg.type === 'voice' && (
                      <div className="flex items-center space-x-2">
                        <button className="text-white">
                          <i data-lucide="play" className="w-4 h-4"></i>
                        </button>
                        <div className="flex-1 bg-white bg-opacity-20 h-1 rounded">
                          <div className="h-full bg-white rounded" style={{width: '30%'}}></div>
                        </div>
                      </div>
                    )}
                    
                    <p className={`text-sm ${language === 'bn' ? 'bangla-text' : ''}`}>{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className={`text-sm text-gray-600 ${language === 'bn' ? 'bangla-text' : ''}`}>
                      {content[language].typing}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {isRecording && (
              <div className="px-4 py-2 bg-red-50 border-t flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className={`text-sm text-red-600 ${language === 'bn' ? 'bangla-text' : ''}`}>
                    {content[language].recording}
                  </span>
                </div>
                <span className="text-sm font-mono text-red-600">{formatTime(recordingTime)}/5:00</span>
              </div>
            )}

            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={content[language].placeholder}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={isRecording}
                />
                
                <label className="cursor-pointer p-2 text-gray-500 hover:text-green-500">
                  <i data-lucide="image" className="w-5 h-5"></i>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-2 rounded-lg transition-colors ${
                    isRecording ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:text-green-500'
                  }`}
                >
                  <i data-lucide={isRecording ? 'square' : 'mic'} className="w-5 h-5"></i>
                </button>

                <button
                  onClick={sendMessage}
                  disabled={isRecording}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  <i data-lucide="send" className="w-4 h-4"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('LiveChat component error:', error);
    reportError(error);
  }
}
