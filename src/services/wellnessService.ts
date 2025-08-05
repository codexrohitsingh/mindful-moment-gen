// AI-powered wellness suggestion service
// This uses rule-based logic mimicking AI behavior for consistent, helpful responses

interface WellnessTip {
  activity: string;
  explanation: string;
  duration?: string;
}

const wellnessDatabase: Record<string, WellnessTip[]> = {
  tired: [
    {
      activity: "Take a 10-minute power nap or rest with your eyes closed",
      explanation: "Short rest periods can help restore mental clarity without entering deep sleep cycles that might leave you groggier.",
      duration: "10 minutes"
    },
    {
      activity: "Try the 4-7-8 breathing technique",
      explanation: "Inhale for 4 counts, hold for 7, exhale for 8. This activates your parasympathetic nervous system to promote relaxation and energy restoration.",
      duration: "5 minutes"
    },
    {
      activity: "Step outside for fresh air and gentle movement",
      explanation: "Natural light and movement help regulate circadian rhythms and boost alertness naturally.",
      duration: "15 minutes"
    },
    {
      activity: "Hydrate and have a healthy snack",
      explanation: "Dehydration and low blood sugar are common causes of fatigue. Try water with lemon and a piece of fruit or nuts.",
      duration: "5 minutes"
    }
  ],
  
  anxious: [
    {
      activity: "Practice the 5-4-3-2-1 grounding technique",
      explanation: "Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. This brings you back to the present moment.",
      duration: "5 minutes"
    },
    {
      activity: "Try progressive muscle relaxation",
      explanation: "Tense and release each muscle group starting from your toes up to your head. This helps release physical tension that accompanies anxiety.",
      duration: "10 minutes"
    },
    {
      activity: "Write down your worries in a journal",
      explanation: "Externalize anxious thoughts by writing them down. This helps create distance from the worry and often makes solutions clearer.",
      duration: "10 minutes"
    },
    {
      activity: "Practice box breathing",
      explanation: "Breathe in for 4 counts, hold for 4, out for 4, hold for 4. Repeat. This regulates your nervous system and reduces anxiety symptoms.",
      duration: "5 minutes"
    }
  ],
  
  happy: [
    {
      activity: "Savor this positive moment mindfully",
      explanation: "Take time to fully experience and appreciate your happiness. Notice how it feels in your body and what thoughts accompany it.",
      duration: "5 minutes"
    },
    {
      activity: "Share your joy with someone you care about",
      explanation: "Positive emotions are amplified when shared. Reach out to a friend or family member and spread the good vibes.",
      duration: "10 minutes"
    },
    {
      activity: "Engage in a creative activity",
      explanation: "Channel your positive energy into something creative - draw, write, dance, or play music. Happiness often fuels creativity.",
      duration: "20 minutes"
    },
    {
      activity: "Practice gratitude meditation",
      explanation: "Reflect on three things you're grateful for right now. This helps consolidate positive emotions and builds resilience.",
      duration: "5 minutes"
    }
  ],
  
  stressed: [
    {
      activity: "Try the STOP technique",
      explanation: "Stop what you're doing, Take a breath, Observe your thoughts and feelings, Proceed with intention. This creates space between stress and reaction.",
      duration: "2 minutes"
    },
    {
      activity: "Do some gentle stretching or yoga",
      explanation: "Physical movement helps metabolize stress hormones and releases tension. Focus on neck, shoulders, and back stretches.",
      duration: "10 minutes"
    },
    {
      activity: "Prioritize your tasks using the 'urgent vs important' matrix",
      explanation: "Write down everything on your mind and categorize by urgency and importance. This brings clarity and control to overwhelming situations.",
      duration: "15 minutes"
    },
    {
      activity: "Listen to calming music or nature sounds",
      explanation: "Certain frequencies and rhythms can activate your relaxation response and lower cortisol levels naturally.",
      duration: "10 minutes"
    }
  ],
  
  energetic: [
    {
      activity: "Channel your energy into a workout or brisk walk",
      explanation: "Physical activity helps regulate energy levels and releases endorphins that sustain positive mood.",
      duration: "30 minutes"
    },
    {
      activity: "Tackle a challenging project or learn something new",
      explanation: "High energy states are perfect for focused work or skill development. Use this momentum for growth activities.",
      duration: "45 minutes"
    },
    {
      activity: "Organize or clean your space",
      explanation: "Transform your energetic state into productive action that creates a sense of accomplishment and improved environment.",
      duration: "20 minutes"
    },
    {
      activity: "Connect with friends or engage socially",
      explanation: "High energy is contagious and perfect for meaningful social connections. Reach out and strengthen relationships.",
      duration: "30 minutes"
    }
  ],
  
  peaceful: [
    {
      activity: "Practice mindful meditation",
      explanation: "Sit quietly and focus on your breath. When thoughts arise, acknowledge them gently and return to breathing. This deepens your sense of peace.",
      duration: "15 minutes"
    },
    {
      activity: "Enjoy some gentle reading or journaling",
      explanation: "Peaceful states are perfect for reflective activities. Read something inspiring or write about your thoughts and feelings.",
      duration: "20 minutes"
    },
    {
      activity: "Spend time in nature",
      explanation: "Natural environments enhance feelings of peace and connection. Sit outside, tend to plants, or simply observe the sky.",
      duration: "25 minutes"
    },
    {
      activity: "Practice loving-kindness meditation",
      explanation: "Send good wishes to yourself, loved ones, and even difficult people. This expands your sense of peace and compassion.",
      duration: "10 minutes"
    }
  ]
};

// Fallback suggestions for uncommon moods
const genericSuggestions: WellnessTip[] = [
  {
    activity: "Take three deep, conscious breaths",
    explanation: "Conscious breathing is a universal tool that helps regulate emotions and brings you back to the present moment.",
    duration: "2 minutes"
  },
  {
    activity: "Write about your current feelings",
    explanation: "Journaling helps process emotions and often provides clarity about what you're experiencing and what you might need.",
    duration: "10 minutes"
  },
  {
    activity: "Do a quick body scan meditation",
    explanation: "Start from your toes and work up to your head, noticing any tension or sensations. This builds self-awareness and promotes relaxation.",
    duration: "8 minutes"
  },
  {
    activity: "Step away from screens and technology",
    explanation: "Digital breaks help reset your nervous system and create space for natural emotional regulation.",
    duration: "15 minutes"
  }
];

export const generateWellnessSuggestion = (mood: string): string => {
  const normalizedMood = mood.toLowerCase().trim();
  
  // Try to find exact match first
  let suggestions = wellnessDatabase[normalizedMood];
  
  // If no exact match, try to find partial matches
  if (!suggestions) {
    const moodKeywords = Object.keys(wellnessDatabase);
    const partialMatch = moodKeywords.find(keyword => 
      normalizedMood.includes(keyword) || keyword.includes(normalizedMood)
    );
    
    if (partialMatch) {
      suggestions = wellnessDatabase[partialMatch];
    }
  }
  
  // If still no match, check for emotional synonyms
  if (!suggestions) {
    const emotionMap: Record<string, string> = {
      'overwhelmed': 'stressed',
      'worried': 'anxious',
      'nervous': 'anxious',
      'excited': 'energetic',
      'joyful': 'happy',
      'content': 'peaceful',
      'calm': 'peaceful',
      'exhausted': 'tired',
      'sleepy': 'tired',
      'frustrated': 'stressed',
      'angry': 'stressed',
      'sad': 'anxious',
      'lonely': 'anxious'
    };
    
    const synonymMatch = emotionMap[normalizedMood];
    if (synonymMatch) {
      suggestions = wellnessDatabase[synonymMatch];
    }
  }
  
  // Use generic suggestions as fallback
  if (!suggestions) {
    suggestions = genericSuggestions;
  }
  
  // Select a random suggestion
  const randomIndex = Math.floor(Math.random() * suggestions.length);
  const selectedTip = suggestions[randomIndex];
  
  // Format the response with a personal touch
  const response = `${selectedTip.activity}. ${selectedTip.explanation}`;
  
  return response;
};

// Simulate AI thinking delay for better UX
export const getWellnessSuggestionWithDelay = async (mood: string): Promise<string> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
  
  return generateWellnessSuggestion(mood);
};