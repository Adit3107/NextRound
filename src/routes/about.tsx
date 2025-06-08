// src/pages/About.tsx
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Headings } from "@/components/headings";

export const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-2 py-6 space-y-6">
      <div className="space-y-3">
        <Headings title="About NextRound" isSubHeading />
        <p className="text-base text-muted-foreground leading-7">
          <span className="font-semibold text-[#937dbe]">NextRound</span> is an AI-powered mock interview platform designed to help developers prepare for technical job interviews. It simulates real interview environments, helping you build confidence and sharpen your skills.
        </p>
      </div>

      <Separator />

      <Card className="bg-muted/20 shadow-sm border-none">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-[#937dbe]">🚀 Key Features</h2>
          <ul className="list-disc list-inside text-base text-muted-foreground space-y-1">
            <li>🧠 Personalized questions based on your role and skills.</li>
            <li>🎤 Record answers using your mic or webcam.</li>
            <li>📊 Get visual feedback and performance breakdown.</li>
            <li>📁 Review all past interviews in your dashboard.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-muted/20 shadow-sm border-none">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-[#937dbe]">🛠️ Workflow</h2>
          <ol className="list-decimal list-inside text-base text-muted-foreground space-y-1">
            <li>Fill out your job role, description, experience, and tech stack.</li>
            <li>AI generates 5 beginner-friendly questions with ideal answers.</li>
            <li>Answer each question one by one — using voice if preferred.</li>
            <li>After completion, view feedback and insights.</li>
          </ol>
        </CardContent>
      </Card>

      <Card className="bg-muted/20 shadow-sm border-none">
        <CardContent className="p-4 space-y-2 text-base text-muted-foreground">
          <h2 className="text-lg font-semibold text-[#937dbe]">📚 Tech Stack</h2>
          <p>NextRound is built with:</p>
          <ul className="list-disc list-inside">
            <li>React + Vite</li>
            <li>TailwindCSS + ShadCN</li>
            <li>Firebase Firestore</li>
            <li>Clerk Authentication</li>
            <li>Google AI Studio API</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
