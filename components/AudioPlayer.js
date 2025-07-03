function AudioPlayer({ audioUrl, duration, language }) {
  try {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [audioElement, setAudioElement] = React.useState(null);

    const content = {
      en: {
        play: 'Play',
        pause: 'Pause',
        download: 'Download Audio'
      },
      bn: {
        play: 'চালু',
        pause: 'বন্ধ',
        download: 'অডিও ডাউনলোড'
      }
    };

    React.useEffect(() => {
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        
        audio.addEventListener('loadedmetadata', () => {
          setAudioElement(audio);
        });
        
        audio.addEventListener('timeupdate', () => {
          setCurrentTime(audio.currentTime);
        });
        
        audio.addEventListener('ended', () => {
          setIsPlaying(false);
          setCurrentTime(0);
        });
        
        return () => {
          audio.pause();
          audio.removeEventListener('loadedmetadata', () => {});
          audio.removeEventListener('timeupdate', () => {});
          audio.removeEventListener('ended', () => {});
        };
      }
    }, [audioUrl]);

    const togglePlayPause = () => {
      if (audioElement) {
        if (isPlaying) {
          audioElement.pause();
        } else {
          audioElement.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const downloadAudio = () => {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `voice_message_${Date.now()}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    React.useEffect(() => {
      lucide.createIcons();
    }, [isPlaying]);

    return (
      <div data-name="audioplayer" data-file="components/AudioPlayer.js" className="flex items-center space-x-3 w-full">
        <button
          onClick={togglePlayPause}
          className="flex-shrink-0 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
        >
          <i data-lucide={isPlaying ? 'pause' : 'play'} className="w-4 h-4 text-white"></i>
        </button>
        
        <div className="flex-1 bg-white bg-opacity-20 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <span className="text-xs text-white font-mono">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        
        <button
          onClick={downloadAudio}
          className="flex-shrink-0 w-6 h-6 text-white hover:text-green-200 transition-colors"
          title={content[language].download}
        >
          <i data-lucide="download" className="w-4 h-4"></i>
        </button>
      </div>
    );
  } catch (error) {
    console.error('AudioPlayer component error:', error);
    reportError(error);
  }
}
