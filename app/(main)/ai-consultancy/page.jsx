"use client";

import { useState, useEffect, useRef } from "react";
import { askAIConsultant, getAIConsultationHistory } from "@/actions/ai-consultancy";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, User, Loader2, Sparkles, Mic, MicOff, Volume2, VolumeX, Languages } from "lucide-react";
import { toast } from "sonner";

const cleanTextForSpeech = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/#{1,6}\s?/g, "")
    .replace(/^[-•]\s?/gm, "")
    .replace(/`{1,3}/g, "")
    .replace(/\n{2,}/g, ". ")
    .replace(/\n/g, ", ")
    .trim();
};

export default function AIConsultancyPage() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);

  // ভয়েস ইনপুটের ভাষা টগল করার জন্য state — ডিফল্ট বাংলা
  const [voiceLang, setVoiceLang] = useState("bn-BD");

  const keepAliveInterval = useRef(null);

  useEffect(() => {
    loadHistory();
    return () => {
      window.speechSynthesis?.cancel();
      if (keepAliveInterval.current) clearInterval(keepAliveInterval.current);
    };
  }, []);

  async function loadHistory() {
    const res = await getAIConsultationHistory();
    if (res.success) {
      setHistory(res.data);
    }
  }

  const toggleVoiceLang = () => {
    setVoiceLang((prev) => (prev === "bn-BD" ? "en-US" : "bn-BD"));
  };

  // 1. Voice Input (Speech-to-Text)
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice input isn't supported in your browser (please use Chrome or Edge).");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = voiceLang; // এখন সিলেক্ট করা ভাষা অনুযায়ী সেট হবে
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      toast.info(
        voiceLang === "bn-BD"
          ? "কথা বলুন, শোনা হচ্ছে..."
          : "Listening... please speak now."
      );
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSymptoms((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
      toast.error("Couldn't hear you clearly, please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // 2. Read the answer aloud (Text-to-Speech)
  const speakText = (id, text) => {
    if (!("speechSynthesis" in window)) {
      toast.error("Voice playback isn't supported in your browser.");
      return;
    }

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      if (keepAliveInterval.current) clearInterval(keepAliveInterval.current);
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    if (keepAliveInterval.current) clearInterval(keepAliveInterval.current);

    const cleanedText = cleanTextForSpeech(text);
    const isBangla = /[\u0980-\u09FF]/.test(cleanedText);

    const speakWithVoice = () => {
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.lang = isBangla ? "bn-BD" : "en-US";
      utterance.rate = 0.9;
      utterance.pitch = 1;

      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find((v) =>
        isBangla
          ? v.lang === "bn-BD" || v.lang === "bn-IN" || v.lang.startsWith("bn")
          : v.lang.startsWith("en")
      );
      if (matchedVoice) utterance.voice = matchedVoice;

      utterance.onend = () => {
        setSpeakingId(null);
        if (keepAliveInterval.current) clearInterval(keepAliveInterval.current);
      };
      utterance.onerror = () => {
        setSpeakingId(null);
        if (keepAliveInterval.current) clearInterval(keepAliveInterval.current);
      };

      setSpeakingId(id);
      window.speechSynthesis.speak(utterance);

      keepAliveInterval.current = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(keepAliveInterval.current);
          return;
        }
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }, 14000);
    };

    const existingVoices = window.speechSynthesis.getVoices();
    if (existingVoices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        speakWithVoice();
      };
    } else {
      speakWithVoice();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      toast.error("Please describe your symptoms, either by typing or speaking.");
      return;
    }

    setLoading(true);
    const res = await askAIConsultant(symptoms);
    setLoading(false);

    if (res.success) {
      toast.success("AI consultation generated!");
      setSymptoms("");
      loadHistory();
    } else {
      toast.error(res.error || "Something went wrong, please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">AI Health Consultation (with Voice Support)</h1>
          <p className="text-muted-foreground">
            Tell us your symptoms by typing or speaking, and our AI will help you understand
            them and pick the right specialist doctor.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <Card className="mb-8 shadow-sm">
        <CardHeader>
          <CardTitle className="flex justify-between items-center flex-wrap gap-2">
            <span>Describe your symptoms</span>
            <div className="flex items-center gap-2">
              {/* Voice Language Toggle */}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={toggleVoiceLang}
                className="flex items-center gap-2"
                title="Change voice input language"
              >
                <Languages className="h-4 w-4" />
                {voiceLang === "bn-BD" ? "বাংলা" : "English"}
              </Button>

              {/* Voice Input Button */}
              <Button
                type="button"
                variant={isListening ? "destructive" : "outline"}
                size="sm"
                onClick={startListening}
                className="flex items-center gap-2"
              >
                {isListening ? (
                  <>
                    <MicOff className="h-4 w-4 animate-pulse" /> Listening...
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 text-primary" /> Speak
                  </>
                )}
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Tap the language button to choose বাংলা/English, then tap the mic to speak —
            or type your symptoms directly below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Example: I've had a high fever and body aches for the past two days..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={4}
            />
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                </>
              ) : (
                "Get AI Consultation"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Consultation History */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Previous Consultations</h2>
        {history.length === 0 ? (
          <p className="text-muted-foreground text-sm">No consultations yet.</p>
        ) : (
          history.map((item) => (
            <Card key={item.id} className="border-l-4 border-l-primary relative">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground">Your question/symptoms:</p>
                    <p className="text-base">{item.symptoms}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg relative">
                  <Bot className="h-5 w-5 text-primary mt-1" />
                  <div className="w-full pr-10">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-sm text-primary">AI's advice:</p>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => speakText(item.id, item.aiResponse)}
                        className="h-8 w-8 p-0"
                        title="Read aloud"
                      >
                        {speakingId === item.id ? (
                          <VolumeX className="h-5 w-5 text-destructive animate-bounce" />
                        ) : (
                          <Volume2 className="h-5 w-5 text-primary" />
                        )}
                      </Button>
                    </div>

                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {item.aiResponse}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-right">
                  {new Date(item.createdAt).toLocaleString("en-US")}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}