import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Cloud, Sun, Moon, Zap, Coffee } from "lucide-react";

interface MoodInputProps {
  onMoodSelect: (mood: string) => void;
  isLoading?: boolean;
}

const commonMoods = [
  { emotion: "tired", icon: Moon, color: "text-blue-500" },
  { emotion: "anxious", icon: Cloud, color: "text-purple-500" },
  { emotion: "happy", icon: Sun, color: "text-yellow-500" },
  { emotion: "stressed", icon: Zap, color: "text-red-400" },
  { emotion: "energetic", icon: Coffee, color: "text-green-500" },
  { emotion: "peaceful", icon: Heart, color: "text-pink-400" }
];

export const MoodInput = ({ onMoodSelect, isLoading }: MoodInputProps) => {
  const [customMood, setCustomMood] = useState("");

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMood.trim()) {
      onMoodSelect(customMood.trim());
      setCustomMood("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">How are you feeling?</h2>
        <p className="text-muted-foreground">Select a mood or describe how you feel</p>
      </div>

      {/* Common Moods */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {commonMoods.map((mood) => {
          const IconComponent = mood.icon;
          return (
            <Button
              key={mood.emotion}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 bg-gradient-card shadow-soft hover:shadow-card transition-all duration-300 border-border/40 hover:border-primary/20 group"
              onClick={() => onMoodSelect(mood.emotion)}
              disabled={isLoading}
            >
              <IconComponent className={`h-6 w-6 ${mood.color} group-hover:scale-110 transition-transform`} />
              <span className="text-sm font-medium capitalize">{mood.emotion}</span>
            </Button>
          );
        })}
      </div>

      {/* Custom Mood Input */}
      <div className="space-y-3">
        <Label htmlFor="custom-mood" className="text-sm font-medium">
          Or describe your mood:
        </Label>
        <form onSubmit={handleCustomSubmit} className="flex gap-2">
          <Input
            id="custom-mood"
            type="text"
            placeholder="e.g., overwhelmed, excited, confused..."
            value={customMood}
            onChange={(e) => setCustomMood(e.target.value)}
            className="flex-1 bg-background/80 border-border/40 focus:border-primary transition-colors"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={!customMood.trim() || isLoading}
            className="bg-gradient-calm hover:opacity-90 shadow-soft"
          >
            Share
          </Button>
        </form>
      </div>
    </div>
  );
};