
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import EmbeddableExercise from "@/components/PromptEngineering/EmbeddableExercise";
import { exerciseDatabase } from "@/components/PromptEngineering/ExerciseData";

const ExerciseEmbed = () => {
  const [searchParams] = useSearchParams();
  const level = searchParams.get('level') as "beginner" | "intermediate" | "advanced" || "beginner";
  const exerciseId = searchParams.get('exercise') || "";
  const compact = searchParams.get('compact') === 'true';
  const showHeader = searchParams.get('header') !== 'false';
  const showLegend = searchParams.get('legend') !== 'false';

  const exercises = exerciseDatabase[level] || [];
  const exercise = exercises.find(ex => ex.id === exerciseId) || exercises[0];

  const handleComplete = (score: number) => {
    // Post message to parent window if embedded in iframe
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'exercise-complete',
        exerciseId: exercise?.id,
        level,
        score
      }, '*');
    }
    
    console.log(`Exercise completed with score: ${score}%`);
  };

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Exercise Not Found</h2>
          <p className="text-gray-600">The requested exercise could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 ${
      compact ? 'p-2' : 'p-4'
    }`}>
      <div className={`${compact ? 'max-w-4xl' : 'max-w-6xl'} mx-auto`}>
        <EmbeddableExercise
          exercise={exercise}
          showHeader={showHeader}
          showLegend={showLegend}
          compact={compact}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
};

export default ExerciseEmbed;
