import React, { useEffect, useMemo, useState } from 'react';
import { Share2, RotateCcw, ChevronDown } from 'lucide-react';
import { exportAndShare } from '../skills/exportAndShare';
import { announceToScreenReader } from '../skills/a11yUtils';

export default function ResultsScreen({ resultsData, onRestart }) {
  const { allScores, topStyles } = resultsData;
  const [expandedStyleIds, setExpandedStyleIds] = useState({});

  const toggleExpanded = (styleId) => {
    setExpandedStyleIds((prev) => ({ ...prev, [styleId]: !prev[styleId] }));
  };

  useEffect(() => {
    const styleNames = topStyles.map(s => s.name).join(' and ');
    announceToScreenReader(`Quiz complete. Your primary style is ${styleNames}.`);
  }, [topStyles]);

  const handleShare = () => {
    exportAndShare('result-capture-area', 'my-communication-style.png');
  };

  // Stacked-bar segment data — all 4 styles, sorted high → low by score so
  // the dominant style appears at the leading (left) edge of the bar and
  // the legend reads dominant → recessive. Percentages sum to 100 (within
  // ±1 from rounding), one segment per style.
  const chartData = useMemo(() => {
    return [...allScores]
      .sort((a, b) => b.score - a.score)
      .map(s => ({
        name: s.name,
        subtitle: s.subtitle,
        percentage: s.percentage,
        score: s.score,
        maxPossible: s.maxPossible,
        color: s.color
      }));
  }, [allScores]);

  const isTie = topStyles.length > 1;

  return (
    <div className="w-full animate-fade-in flex flex-col items-center">

      {/* CAPTURE AREA */}
      <div id="result-capture-area" className="w-full flex flex-col items-center p-2 rounded-2xl">
        <h2 className="text-xs font-extrabold text-quiz-primary uppercase tracking-widest mb-2">
          Your Results
        </h2>

        {/* PRIMARY RESULT — H1 sits right above the detail tile(s) */}
        {isTie ? (
          <h1 className="font-heading text-3xl md:text-4xl font-black text-quiz-text mt-4 mb-2 text-center">
            You are a Hybrid Communicator
          </h1>
        ) : (
          <h1 className="font-heading text-3xl md:text-5xl font-black text-quiz-text mt-4 mb-2 text-center">
            {topStyles[0].name}
          </h1>
        )}

        {/* HASHTAG(S) — one per top style (multiple in tie) */}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-6">
          {topStyles.map((s) => (
            <span key={s.id} className="text-sm sm:text-base font-semibold text-quiz-primary">
              #{s.subtitle}
            </span>
          ))}
        </div>

        {/* STYLE DETAIL TILE(S) — chrome stripped (no bg, no rounded corners,
            no colored top border). Each tile is a flat content section.
            Strengths and Blind Spots stack vertically. In a tie, multiple
            tiles are separated by gap-8 vertical breathing room. */}
        <div className="w-full flex flex-col gap-8 text-left">
          {topStyles.map((style) => (
            <div key={style.id}>
              <div className="mb-4 text-quiz-text/90">
                <strong className="text-quiz-primary">Priority:</strong> {style.priority}
                <span className="mx-1 text-quiz-text/40">|</span>
                <strong className="text-quiz-primary">Mantra:</strong> {style.mantra}
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-green-50/50 p-3 rounded-xl border border-green-100">
                  <strong className="block text-green-800 mb-2 text-xs uppercase">Strengths</strong>
                  <ul className="list-disc pl-5 text-xs text-quiz-text/80 space-y-1">
                    {style.strengths.map((str, i) => <li key={i}>{str}</li>)}
                  </ul>
                </div>

                <div className="bg-red-50/50 p-3 rounded-xl border border-red-100">
                  <strong className="block text-quiz-primary mb-2 text-xs uppercase">Blind Spots</strong>
                  <ul className="list-disc pl-5 text-xs text-quiz-text/80 space-y-1">
                    {style.blindSpots.map((bs, i) => <li key={i}>{bs}</li>)}
                  </ul>
                </div>
              </div>

              {/* FULL DESCRIPTION ACCORDION */}
              {(style.strengthsDetailed?.length || style.blindSpotsDetailed?.length) && (() => {
                const isOpen = !!expandedStyleIds[style.id];
                const panelId = `style-details-${style.id}`;
                return (
                  <div className="mt-4 border-t border-orange-100 pt-3">
                    <button
                      type="button"
                      onClick={() => toggleExpanded(style.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full flex items-center justify-between gap-2 text-left text-sm font-bold text-quiz-primary hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-quiz-primary/40 rounded-md px-1 py-1 transition-colors"
                    >
                      <span>{isOpen ? 'Hide full description' : 'Show full description'}</span>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <div id={panelId} className="mt-4 flex flex-col gap-3 animate-fade-in">
                        <div className="bg-green-50/50 p-3 rounded-xl border border-green-100">
                          <strong className="block text-green-800 mb-3 text-xs uppercase">Where You Might Shine</strong>
                          <ul className="space-y-3 text-xs text-quiz-text/85">
                            {style.strengthsDetailed.map((item, i) => (
                              <li key={i}>
                                <p className="font-bold text-quiz-text mb-1">{item.title}</p>
                                <p className="leading-relaxed">{item.description}</p>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-red-50/50 p-3 rounded-xl border border-red-100">
                          <strong className="block text-quiz-primary mb-3 text-xs uppercase">Where You Might Struggle</strong>
                          <ul className="space-y-3 text-xs text-quiz-text/85">
                            {style.blindSpotsDetailed.map((item, i) => (
                              <li key={i}>
                                <p className="font-bold text-quiz-text mb-1">{item.title}</p>
                                <p className="leading-relaxed">{item.description}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          ))}
        </div>

        {/*
          PROPORTIONAL STACKED BAR + LEGEND — moved below the detail tile(s).
          One horizontal bar = 100% of answers, divided into colored segments
          per style; widths come from `flex: <percentage>` so segments
          auto-size relative to each other. Zero-score styles are dropped
          from the bar (the legend still lists them).
          minWidth: 4px keeps very small (1–3%) segments visible as a sliver
          instead of collapsing to nothing. Native `title` gives a desktop
          hover tooltip; the legend covers the same info on mobile.
        */}
        <div
          className="w-full h-8 md:h-10 mt-8 flex rounded-full overflow-hidden shadow-sm"
          role="img"
          aria-label={`Score breakdown. ${chartData.map(s => `${s.subtitle} ${s.percentage} percent`).join(', ')}.`}
        >
          {chartData.filter(s => s.percentage > 0).map((s) => (
            <div
              key={s.name}
              className="h-full"
              style={{
                flex: s.percentage,
                backgroundColor: s.color,
                minWidth: '4px'
              }}
              title={`${s.subtitle}: ${s.percentage}% (${s.score}/${s.maxPossible} pts)`}
            />
          ))}
        </div>

        {/* LEGEND — color swatch + subtitle + percentage, horizontal wrap */}
        <div className="w-full flex flex-wrap justify-center gap-x-3 gap-y-1.5 mt-2 text-[9px] sm:text-[10px]">
          {chartData.map((s) => (
            <div key={s.name} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: s.color }}
                aria-hidden="true"
              />
              <span className="font-semibold text-quiz-text">{s.subtitle}</span>
              <span className="text-quiz-text/60">{s.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS (outside capture area) */}
      <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-4 sm:mt-6">
        <button
          onClick={handleShare}
          className="flex-1 max-w-xs min-h-[44px] flex items-center justify-center gap-2 px-6 py-4 bg-quiz-primary text-quiz-bg rounded-xl font-bold text-base hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-quiz-primary/50 transition-all shadow-md active:scale-95"
          aria-label="Share or download my result image"
        >
          <Share2 size={20} /> Share Result
        </button>

        <button
          onClick={onRestart}
          className="flex-1 max-w-xs min-h-[44px] flex items-center justify-center gap-2 px-6 py-4 bg-white text-quiz-primary border-2 border-quiz-primary rounded-xl font-bold text-base hover:bg-interactive-cream focus:outline-none focus:ring-4 focus:ring-quiz-primary/30 transition-all active:scale-95"
          aria-label="Retake the quiz"
        >
          <RotateCcw size={20} /> Retake Quiz
        </button>
      </div>
    </div>
  );
}
