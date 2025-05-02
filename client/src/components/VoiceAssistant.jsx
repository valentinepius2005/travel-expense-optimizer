import React, { useEffect, useState } from "react";

const VoiceAssistant = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice Recognition not supported in your browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript;
      setTranscript(speech);
      handleCommand(speech.toLowerCase());
    };

    const handleCommand = (speech) => {
      if (speech.includes("show travel")) {
        onCommand("travel");
      } else if (speech.includes("budget status")) {
        onCommand("budget");
      } else if (speech.includes("reset")) {
        onCommand("reset");
      } else {
        onCommand("unknown");
      }
    };

    if (isListening) {
      recognition.start();
    }

    return () => recognition.stop();
  }, [isListening, onCommand]);

  return (
    <div className="mt-8 text-center">
      <button
        onClick={() => setIsListening(true)}
        className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700"
      >
        🎙️ Speak Now
      </button>
      {transcript && (
        <p className="mt-2 text-sm text-gray-600">
          You said: <strong>{transcript}</strong>
        </p>
      )}
    </div>
  );
};

export default VoiceAssistant;
