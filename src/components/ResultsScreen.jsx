import React, { useEffect, useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
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

  // Format data for Donut Chart
  const chartData = useMemo(() => {
    return allScores.filter(s => s.score > 0).map(s => ({
      name: s.name,
      value: s.score,
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

        {isTie ? (
          <h1 className="font-heading text-3xl md:text-4xl font-black text-quiz-text mb-2 text-center">
            You are a Hybrid Communicator
          </h1>
        ) : (
          <h1 className="font-heading text-3xl md:text-5xl font-black text-quiz-text mb-2 text-center">
            {topStyles[0].name}
          </h1>
        )}

        {isTie && (
          <p className="text-base font-medium text-quiz-text/80 mb-6 text-center">
            Your primary styles are {topStyles.map(s => <strong key={s.id} className="text-quiz-primary">{s.name}</strong>).reduce((prev, curr) => [prev, ' and ', curr])}
          </p>
        )}

        {/* DONUT CHART (Recharts) */}
        <div 
          className="w-full h-64 md:h-80 my-4 flex justify-center"
          aria-label={`Donut chart showing score breakdown. Highest scores are ${topStyles.map(s=>s.name).join(', ')}.`}
          role="img"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} Points`, name]}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* STYLE DESCRIPTIONS */}
        <div className="w-full flex flex-col gap-3 mt-3 text-left">
          {topStyles.map((style) => {
            const scored = allScores.find(s => s.id === style.id);
            return (
              <div key={style.id} className="bg-white p-3 rounded-2xl shadow-sm border border-orange-50 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-quiz-text flex items-start gap-3 min-w-0 break-words">
                    <span className="w-4 h-4 mt-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: style.color }}></span>
                    <span className="min-w-0 break-words">{style.name}</span>
                  </h3>
                  {scored && (
                    <span className="self-start flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full text-white whitespace-nowrap"
                      style={{ backgroundColor: style.color }}>
                      {scored.score}/{scored.maxPossible} pts
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-quiz-text/60 uppercase tracking-wide mb-4 mt-1">
                  {style.subtitle}
                </p>

                <div className="mb-4 text-quiz-text/90">
                  <strong className="text-quiz-primary">Priority:</strong> {style.priority} <span className="mx-1 text-quiz-text/40">|</span> <strong className="text-quiz-primary">Mantra:</strong> {style.mantra}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                        className="w-full flex items-center justify-between gap-2 text-left text-sm font-bold text-quiz-primary hover:text-[#7a0014] focus:outline-none focus:ring-2 focus:ring-quiz-primary/40 rounded-md px-1 py-1 transition-colors"
                      >
                        <span>{isOpen ? 'Hide full description' : 'Show full description'}</span>
                        <ChevronDown
                          size={18}
                          className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>

                      {isOpen && (
                        <div id={panelId} className="mt-4 grid md:grid-cols-2 gap-4 animate-fade-in">
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
            );
          })}
        </div>
      </div>

      {/* ACTION BUTTONS (Outside Capture Area) */}
      <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-4 sm:mt-6">
        <button
          onClick={handleShare}
          className="flex-1 max-w-xs min-h-[44px] flex items-center justify-center gap-2 px-6 py-4 bg-quiz-primary text-[#FFF9EF] rounded-xl font-bold text-base hover:bg-[#7a0014] focus:outline-none focus:ring-4 focus:ring-quiz-primary/50 transition-all shadow-md active:scale-95"
          aria-label="Share or download my result image"
        >
          <Share2 size={20} /> Share Result
        </button>
        
        <button
          onClick={onRestart}
          className="flex-1 max-w-xs min-h-[44px] flex items-center justify-center gap-2 px-6 py-4 bg-white text-quiz-primary border-2 border-quiz-primary rounded-xl font-bold text-base hover:bg-orange-50 focus:outline-none focus:ring-4 focus:ring-quiz-primary/30 transition-all active:scale-95"
          aria-label="Retake the quiz"
        >
          <RotateCcw size={20} /> Retake Quiz
        </button>
      </div>
    </div>
  );
}
