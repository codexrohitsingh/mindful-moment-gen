import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Trash2, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SavedTip {
  id: number;
  mood: string;
  suggestion: string;
  savedAt: string;
}

export const SavedTips = () => {
  const [savedTips, setSavedTips] = useState<SavedTip[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const tips = JSON.parse(localStorage.getItem("wellnessTips") || "[]");
    setSavedTips(tips);
  }, []);

  const deleteTip = (id: number) => {
    const updatedTips = savedTips.filter(tip => tip.id !== id);
    setSavedTips(updatedTips);
    localStorage.setItem("wellnessTips", JSON.stringify(updatedTips));
    
    toast({
      title: "Tip removed",
      description: "The tip has been removed from your collection",
    });
  };

  const clearAllTips = () => {
    setSavedTips([]);
    localStorage.removeItem("wellnessTips");
    
    toast({
      title: "All tips cleared",
      description: "Your saved tips collection has been cleared",
    });
  };

  if (savedTips.length === 0) {
    return (
      <Card className="p-6 bg-gradient-card shadow-soft border-border/40">
        <div className="text-center space-y-2 text-muted-foreground">
          <BookOpen className="h-8 w-8 mx-auto opacity-50" />
          <p className="text-sm">No saved tips yet</p>
          <p className="text-xs">Save helpful tips to revisit them later</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-card shadow-soft border-border/40">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">
              Saved Tips ({savedTips.length})
            </h3>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="border-border/40"
            >
              {isExpanded ? 'Collapse' : 'View All'}
            </Button>
            {savedTips.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={clearAllTips}
                className="border-destructive/20 text-destructive hover:bg-destructive/10"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        <div className={`space-y-3 ${!isExpanded ? 'max-h-32 overflow-hidden' : ''}`}>
          {savedTips.map((tip) => (
            <div
              key={tip.id}
              className="p-4 bg-background/60 rounded-lg border border-border/20 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary capitalize">
                    {tip.mood}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteTip(tip.id)}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {tip.suggestion}
              </p>
              <p className="text-xs text-muted-foreground">
                Saved {new Date(tip.savedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {!isExpanded && savedTips.length > 2 && (
          <div className="text-center">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(true)}
              className="text-primary hover:bg-primary/10"
            >
              Show {savedTips.length - 2} more tips
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};