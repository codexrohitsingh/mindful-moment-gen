import { useState } from "react";
import { MoodInput } from "./MoodInput";
import { WellnessSuggestion } from "./WellnessSuggestion";
import { SavedTips } from "./SavedTips";
import { getWellnessSuggestionWithDelay } from "@/services/wellnessService";
import { Sparkles, Heart } from "lucide-react";

export const WellnessDashboard = () => {
  const [currentMood, setCurrentMood] = useState<string>("");
  const [suggestion, setSuggestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMoodSelect = async (mood: string) => {
    setCurrentMood(mood);
    setIsLoading(true);
    
    try {
      const newSuggestion = await getWellnessSuggestionWithDelay(mood);
      setSuggestion(newSuggestion);
    } catch (error) {
      console.error("Error generating suggestion:", error);
      setSuggestion("Take a moment to breathe deeply and be kind to yourself. Sometimes the best wellness practice is simply acknowledging how you feel.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!currentMood) return;
    
    setIsLoading(true);
    try {
      const newSuggestion = await getWellnessSuggestionWithDelay(currentMood);
      setSuggestion(newSuggestion);
    } catch (error) {
      console.error("Error refreshing suggestion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetDashboard = () => {
    setCurrentMood("");
    setSuggestion("");
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <Heart className="h-8 w-8 text-primary animate-glow" />
              <Sparkles className="h-4 w-4 text-primary-glow absolute -top-1 -right-1 animate-float" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-calm bg-clip-text text-transparent">
              Wellness Assistant
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your personal AI companion for mindful moments and gentle guidance. 
            Share how you're feeling and receive personalized wellness suggestions.
          </p>
        </div>

        <div className="space-y-8">
          {/* Mood Input Section */}
          {!suggestion && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-card shadow-card rounded-2xl p-8 border border-border/40">
                <MoodInput onMoodSelect={handleMoodSelect} isLoading={isLoading} />
              </div>
            </div>
          )}

          {/* Suggestion Display */}
          {suggestion && (
            <div className="space-y-6">
              <div className="max-w-3xl mx-auto">
                <WellnessSuggestion
                  mood={currentMood}
                  suggestion={suggestion}
                  onRefresh={handleRefresh}
                  isLoading={isLoading}
                />
              </div>

              {/* New Session Button */}
              <div className="text-center">
                <button
                  onClick={resetDashboard}
                  className="text-primary hover:text-primary/80 text-sm font-medium underline underline-offset-4 transition-colors"
                >
                  Check in with a new mood
                </button>
              </div>
            </div>
          )}

          {/* Saved Tips Section */}
          <div className="max-w-3xl mx-auto">
            <SavedTips />
          </div>

          {/* Footer */}
          <div className="text-center py-8">
            <p className="text-xs text-muted-foreground">
              Remember: This is a supportive tool, not a replacement for professional mental health care.
              If you're experiencing persistent distress, please reach out to a healthcare professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};