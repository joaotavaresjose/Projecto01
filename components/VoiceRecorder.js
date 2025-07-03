function VoiceRecorder({ onRecordingComplete, isRecording, setIsRecording, language }) {
  try {
    const [mediaRecorder, setMediaRecorder] = React.useState(null);
    const [audioChunks, setAudioChunks] = React.useState([]);
    const [recordingTime, setRecordingTime] = React.useState(0);
    const [maxDuration] = React.useState(300); // 5 minutes in seconds

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100
          }
        });
        
        const recorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm;codecs=opus'
        });
        
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setAudioChunks(prev => [...prev, event.data]);
          }
        };
        
        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          
          onRecordingComplete({
            audioUrl,
            duration: recordingTime,
            blob: audioBlob
          });
          
          setAudioChunks([]);
          setRecordingTime(0);
          stream.getTracks().forEach(track => track.stop());
        };
        
        setMediaRecorder(recorder);
        recorder.start(1000); // Collect data every second
        
        // Start timer
        const timer = setInterval(() => {
          setRecordingTime(prev => {
            if (prev >= maxDuration - 1) {
              stopRecording();
              return maxDuration;
            }
            return prev + 1;
          });
        }, 1000);
        
        setRecordingTimer(timer);
        
      } catch (error) {
        console.error('Error accessing microphone:', error);
        const message = language === 'bn' 
          ? 'মাইক্রোফোন অ্যাক্সেস অনুমতি প্রয়োজন' 
          : 'Microphone access permission required';
        alert(message);
      }
    };

    const stopRecording = () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        setIsRecording(false);
        
        if (recordingTimer) {
          clearInterval(recordingTimer);
          setRecordingTimer(null);
        }
      }
    };

    const [recordingTimer, setRecordingTimer] = React.useState(null);

    React.useEffect(() => {
      if (isRecording && !mediaRecorder) {
        startRecording();
      } else if (!isRecording && mediaRecorder && mediaRecorder.state === 'recording') {
        stopRecording();
      }
      
      return () => {
        if (recordingTimer) {
          clearInterval(recordingTimer);
        }
      };
    }, [isRecording]);

    // Cleanup on unmount
    React.useEffect(() => {
      return () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
        if (recordingTimer) {
          clearInterval(recordingTimer);
        }
      };
    }, []);

    return null; // This is a utility component
  } catch (error) {
    console.error('VoiceRecorder component error:', error);
    reportError(error);
  }
}
