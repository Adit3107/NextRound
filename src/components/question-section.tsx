import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Volume2, VolumeX } from "lucide-react";
import { RecordAnswer } from "./record-answer";

interface QuestionSectionProps {
  questions: { question: string; answer: string }[];
}

export const QuestionSection = ({ questions }: QuestionSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWebCam, setIsWebCam] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState<SpeechSynthesisUtterance | null>(null);
  const [activeQuestion, setActiveQuestion] = useState(questions[0]?.question);

  const handlePlayQuestion = (qst: string) => {
    if (isPlaying && currentSpeech) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(qst);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
        setCurrentSpeech(speech);

        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  const handleViewFeedback = () => {
    // Your navigation or modal logic here
    alert("Redirect to Feedback Page or Show Modal");
  };

  const isLastQuestion = activeQuestion === questions[questions.length - 1]?.question;

  return (
    <div className="w-full min-h-96 border rounded-md p-4">
      <Tabs
        defaultValue={questions[0]?.question}
        className="w-full space-y-12"
        orientation="vertical"
        value={activeQuestion}
        onValueChange={setActiveQuestion}
      >
        <TabsList className="bg-transparent w-full flex flex-wrap items-center justify-start gap-4">
          {questions?.map((tab, i) => (
            <TabsTrigger
              className={cn(
                "data-[state=active]:bg-[#937dbe] data-[state=active]:shadow-md text-xs px-2"
              )}
              key={tab.question}
              value={tab.question}
            >
              {`Question #${i + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>

        {questions?.map((tab, i) => (
          <TabsContent key={i} value={tab.question}>
            <p className="text-base text-left tracking-wide text-neutral-500">{tab.question}</p>

            <div className="w-full flex items-center justify-end">
              <TooltipButton
                content={isPlaying ? "Stop" : "Start"}
                icon={
                  isPlaying ? (
                    <VolumeX className="min-w-5 min-h-5 text-muted-foreground" />
                  ) : (
                    <Volume2 className="min-w-5 min-h-5 text-muted-foreground" />
                  )
                }
                onClick={() => handlePlayQuestion(tab.question)}
              />
            </div>

            <RecordAnswer
              question={tab}
              isWebCam={isWebCam}
              setIsWebCam={setIsWebCam}
            />

            {isLastQuestion && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleViewFeedback}
                  className="bg-[#937dbe] hover:bg-[#7b68a0] text-white font-medium py-2 px-4 rounded-md shadow"
                >
                  View Feedback
                </button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
