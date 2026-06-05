import React from 'react';
import logo from '../assets/logo.png';

export default function WelcomeScreen({ onStart }) {
  // The h-[640px] wrapper matches the QuizScreen's fixed height rule —
  // keeps the iframe content stack identical across welcome → quiz
  // transitions so embedders (Rise 360 etc.) see no jump in card height.
  // Welcome content is short; `justify-center` centers it vertically
  // inside the 640px container so there's no top-anchored gap below.
  return (
    <div className="w-full h-[640px] flex flex-col items-center justify-center">
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
      <h1 className="font-heading text-[36px] font-bold text-quiz-text mb-4 tracking-tight animate-welcome-headline">
        Discover Your Communication Style
      </h1>
      <div
        aria-hidden="true"
        className="h-0.5 w-16 bg-quiz-primary/40 mb-6 animate-welcome-divider"
      />
      <p className="text-base md:text-lg text-quiz-text mb-10 max-w-md animate-welcome-body">
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
