import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import Header from "@/components/header";

function App() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPost, setGeneratedPost] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState(() => {
    const stored = localStorage.getItem("remainingAttempts");
    return stored ? parseInt(stored, 10) : 5; // Default to 5 if not set
  });

  const handleGenerate = async () => {
    if (remainingAttempts <= 0) {
      alert("You have reached your maximum number of generations.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/generate`,
        { content }
      );

      setGeneratedPost(response.data.post);

      // Update remaining attempts
      const newAttempts = remainingAttempts - 1;
      setRemainingAttempts(newAttempts);
      localStorage.setItem("remainingAttempts", newAttempts.toString());
    } catch (error) {
      console.error("Error generating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatText = (text) => {
    return text.split("\n\n");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200"
    >
      <Header />
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Viral LinkedIn Post Generator
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Create Engaging Content in Seconds
          </h2>
          <p className="text-gray-600">
            Turn your expertise into compelling LinkedIn posts that resonate
            with your audience and spark meaningful conversations
          </p>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's your story? Share a challenge you overcame, a lesson you learned, or an insight that changed your perspective..."
            className="min-h-[120px] resize-none"
          />

          <div className="flex">
            <Button
              className="flex-1"
              onClick={handleGenerate}
              size="lg"
              disabled={isLoading || remainingAttempts <= 0}
            >
              {isLoading ? (
                <span className="mr-2">Generating...</span>
              ) : (
                <>
                  <span className="mr-2">✨</span>
                  Generate Post
                </>
              )}
            </Button>
          </div>

          <div className="text-sm text-gray-500 text-center">
            {remainingAttempts} generations remaining
          </div>

          {generatedPost && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold">Generated Post:</h3>
              <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap font-mono text-sm leading-none">
                {formatText(generatedPost).map((part, index) => (
                  <>
                    <p key={index}>
                      <ReactMarkdown>{part}</ReactMarkdown>
                    </p>
                    <br />
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
