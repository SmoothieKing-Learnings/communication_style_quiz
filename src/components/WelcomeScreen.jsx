import React from 'react';
import logo from '../assets/logo.png';
import { isEmbedded } from '../skills/embed';

export default function WelcomeScreen({ onStart }) {
  // When embedded, fill the iframe viewport vertically and center content.
  // Welcome content is short, so vertical centering is safe (no overflow).
  const embedded = isEmbedded();

  return (
    <div className={`w-full flex flex-col items-center ${embedded ? 'min-h-[80vh] justify-center' : ''}`}>
      {/*
        Staggered entrance — each element runs its own CSS keyframe with a
        slightly later delay so the page assembles top-down. Timing values
        live in src/index.css alongside the keyframes. The wrapper itself
        no longer animates; each child owns its own entrance.
      */}
      <img
        src={logo}
        alt="Smoothie King Logo"
        className="w-24 h-auto mb-5 animate-welcome-logo"
      />
      <h1 className="font-heading text-[36px] font-extrabold text-quiz-primary mb-4 tracking-tight animate-welcome-headline">
        Discover Your Communication Style
      </h1>
      <div
        aria-hidden="true"
        className="h-0.5 w-16 bg-quiz-primary/40 mb-6 animate-welcome-divider"
      />
      <p className="text-base md:text-lg text-quiz-text/80 mb-10 max-w-md animate-welcome-body">
        Take this short assessment to uncover your primary style, strengths, and blind spots as a communicator.
      </p>

      {/*
        Element 5 — CTA block. The entrance animation lives on a wrapper div
        (motion.div in the spec) so the button itself keeps a clean
        transition-all for hover / focus / active without colliding with the
        rise-in keyframe.
      */}
      <div className="animate-welcome-cta w-full">
        <button
          onClick={onStart}
          className="w-full min-h-[44px] px-8 py-4 bg-quiz-primary text-quiz-bg rounded-xl font-bold text-base hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-quiz-primary/50 transition-all shadow-lg hover:shadow-xl active:scale-95"
          aria-label="Start the Communication Style Quiz"
        >
          Let's Blend!
        </button>
      </div>
    </div>
  );
}
