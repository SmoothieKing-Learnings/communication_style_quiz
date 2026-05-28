import React from 'react';
import logo from '../assets/logo.png';
import { isEmbedded } from '../skills/embed';

export default function WelcomeScreen({ onStart }) {
  // When embedded, fill the iframe viewport vertically and center content.
  // Welcome content is short, so vertical centering is safe (no overflow).
  const embedded = isEmbedded();

  return (
    <div className={`w-full animate-fade-in flex flex-col items-center ${embedded ? 'min-h-[80vh] justify-center' : ''}`}>
      <img src={logo} alt="Smoothie King Logo" className="w-24 h-auto mb-5 animate-fade-in" />
      <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-quiz-primary mb-6 tracking-tight">
        Discover Your Communication Style
      </h1>
      <p className="text-base md:text-lg text-quiz-text/80 mb-10 max-w-md">
        Take this short assessment to uncover your primary style, strengths, and blind spots as a communicator.
      </p>

      <button
        onClick={onStart}
        className="min-h-[44px] min-w-[44px] px-8 py-4 bg-quiz-primary text-[#FFF9EF] rounded-xl font-bold text-base hover:bg-[#7a0014] focus:outline-none focus:ring-4 focus:ring-quiz-primary/50 transition-all shadow-lg hover:shadow-xl active:scale-95"
        aria-label="Start the Communication Style Quiz"
      >
        Let's Blend!
      </button>
    </div>
  );
}
