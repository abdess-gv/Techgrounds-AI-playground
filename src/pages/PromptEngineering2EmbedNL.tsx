import React from 'react';
import ReactMarkdown from 'react-markdown';
import { PromptLegend } from '@/components/PromptEngineering/PromptLegend'; // Assuming path is correct
import { promptEngineering2ExercisesNL } from '@/data/promptEngineering2ExercisesNL';
import { PromptEngineering2Exercise } from '@/types/PromptEngineering2';

const PromptEngineering2EmbedNL: React.FC = () => {
  // Group exercises by level
  const exercisesByLevel: { [level: number]: PromptEngineering2Exercise[] } =
    promptEngineering2ExercisesNL.reduce((acc, exercise) => {
      if (!acc[exercise.level]) {
        acc[exercise.level] = [];
      }
      acc[exercise.level].push(exercise);
      return acc;
    }, {} as { [level: number]: PromptEngineering2Exercise[] });

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800">Prompt Engineering 2.0 Oefeningen</h1>
        <p className="text-md text-slate-600 mt-2">Techgrounds AI-Playground</p>
      </header>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-10">
          <PromptLegend />
        </div>

        {Object.keys(exercisesByLevel).map((levelKey) => {
          const level = parseInt(levelKey, 10) as 1 | 2 | 3;
          const exercises = exercisesByLevel[level];
          // Sort exercises within the level by exerciseNumber
          const sortedExercises = exercises.sort((a, b) => a.exerciseNumber - b.exerciseNumber);

          return (
            <section key={level} className="mb-12">
              <h2 className="text-3xl font-semibold text-slate-700 mb-6 pb-2 border-b-2 border-blue-500">
                Level {level}
              </h2>
              {sortedExercises.map((exercise, index) => (
                <article key={exercise.id} className="mb-8 p-6 bg-slate-50 rounded-md shadow">
                  <h3 className="text-2xl font-medium text-slate-800 mb-3">
                    Oefening {exercise.exerciseNumber}: {exercise.title}
                  </h3>
                  <p className="text-slate-600 italic mb-4">{exercise.description}</p>

                  <div className="prose prose-slate max-w-none mb-4">
                    <h4 className="text-lg font-semibold text-slate-700 mb-1">Instructies:</h4>
                    <ReactMarkdown>{exercise.instructions}</ReactMarkdown>
                  </div>

                  {exercise.examplePrompt && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-slate-700 mb-1">Voorbeeld Prompt:</h4>
                      <pre className="bg-slate-100 p-3 rounded-md text-sm text-slate-700 whitespace-pre-wrap font-mono">
                        {exercise.examplePrompt}
                      </pre>
                    </div>
                  )}

                  {exercise.expectedOutput && (
                    <div>
                      <h4 className="text-lg font-semibold text-slate-700 mb-1">Verwachte Output:</h4>
                      <pre className="bg-slate-100 p-3 rounded-md text-sm text-slate-700 whitespace-pre-wrap font-mono">
                        {exercise.expectedOutput}
                      </pre>
                    </div>
                  )}
                </article>
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default PromptEngineering2EmbedNL;
