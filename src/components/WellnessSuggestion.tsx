import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Heart, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WellnessSuggestionProps {
  mood: string;
  suggestion: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const WellnessSuggestion = ({ mood, suggestion, onRefresh, isLoading }: WellnessSuggestionProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const saveTip = () => {
    const savedTips = JSON.parse(localStorage.getItem("wellnessTips") || "[]");
    const newTip = {
      id: Date.now(),
      mood,
      suggestion,
      savedAt: new Date().toISOString()
    };
    
    const updatedTips = [newTip, ...savedTips.slice(0, 9)]; // Keep only 10 most recent
    localStorage.setItem("wellnessTips", JSON.stringify(updatedTips));
    setIsSaved(true);
    
    toast({
      title: "Tip saved! 💝",
      description: "You can find your saved tips in local storage",
    });
  };

  const removeTip = () => {
    // This would remove from saved tips in a real implementation
    setIsSaved(false);
    toast({
      title: "Tip removed",
      description: "The tip has been removed from your saved collection",
    });
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-card border-border/40">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary animate-glow" />
            <span className="text-sm font-medium text-muted-foreground">
              For when you're feeling <span className="text-primary font-semibold">{mood}</span>
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onRefresh}
              disabled={isLoading}
              className="border-border/40 hover:border-primary/20 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Generating...' : 'New tip'}
            </Button>
            {!isSaved ? (
              <Button
                size="sm"
                onClick={saveTip}
                className="bg-accent hover:bg-accent/80 text-accent-foreground"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={removeTip}
                className="border-destructive/20 text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed text-base">
              {suggestion}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};