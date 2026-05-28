import React from 'react';
import { isEmbedded } from '../skills/embed';

export default function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100);
  const embedded = isEmbedded();

  return (
    <div className={`w-full flex items-center gap-3 ${embedded ? '' : 'mb-4'}`} aria-hidden="true">
      <span className="text-xs font-bold text-quiz-primary uppercase tracking-wider whitespace-nowrap">
        Question {current} of {total}
      </span>
      <div className="flex-1 h-2 bg-orange-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-quiz-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
