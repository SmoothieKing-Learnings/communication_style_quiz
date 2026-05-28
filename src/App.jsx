import React, { useState, useCallback, useMemo } from 'react';
import LayoutWrapper from './components/LayoutWrapper';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import TieBreakerScreen from './components/TieBreakerScreen';
import { calculateResults } from './skills/calculateResults';
import {
  findTieBreakerCandidates,
  MAX_TIE_BREAKER_ATTEMPTS,
} from './skills/tieBreaker';
import { STYLES } from './data/stylesData';
import { useIframeBridge } from './utils/iframeBridge';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [resultsData, setResultsData] = useState(null);

  // Tie-breaker context (see leadership_style_quiz/src/App.jsx for the
  // full design notes — same shape and lifecycle across the three quizzes).
  const [tieBreakerCtx, setTieBreakerCtx] = useState(null);

  const startQuiz = useCallback(() => {
    setCurrentScreen('quiz');
  }, []);

  const finalizeOrTieBreak = useCallback((answers, shuffledQuestions, attemptIdx, usedCandidates) => {
    const results = calculateResults(answers, STYLES);
    const isTied = results.topStyles.length > 1;

    if (!isTied) {
      setResultsData(results);
      setTieBreakerCtx(null);
      setCurrentScreen('results');
      return;
    }

    if (attemptIdx >= MAX_TIE_BREAKER_ATTEMPTS) {
      setResultsData(results);
      setTieBreakerCtx(null);
      setCurrentScreen('results');
      return;
    }

    const tiedIds = new Set(results.topStyles.map(s => s.id));
    const pool = findTieBreakerCandidates(answers, tiedIds, usedCandidates);
    if (pool.length === 0) {
      setResultsData(results);
      setTieBreakerCtx(null);
      setCurrentScreen('results');
      return;
    }

    setTieBreakerCtx({
      answers,
      shuffledQuestions,
      tiedStyleIds: tiedIds,
      attemptIdx,
      usedCandidates,
    });
    setCurrentScreen('tieBreaker');
  }, []);

  const handleQuizComplete = useCallback((answers, shuffledQuestions) => {
    finalizeOrTieBreak(answers, shuffledQuestions, 0, new Set());
  }, [finalizeOrTieBreak]);

  const handleTieBreakerAttempt = useCallback((newAnswers, newUsedCandidates) => {
    if (!tieBreakerCtx) return;
    finalizeOrTieBreak(
      newAnswers,
      tieBreakerCtx.shuffledQuestions,
      tieBreakerCtx.attemptIdx + 1,
      newUsedCandidates,
    );
  }, [tieBreakerCtx, finalizeOrTieBreak]);

  const handleNoCandidates = useCallback(() => {
    if (!tieBreakerCtx) return;
    const results = calculateResults(tieBreakerCtx.answers, STYLES);
    setResultsData(results);
    setTieBreakerCtx(null);
    setCurrentScreen('results');
  }, [tieBreakerCtx]);

  const restartQuiz = useCallback(() => {
    setResultsData(null);
    setTieBreakerCtx(null);
    setCurrentScreen('welcome');
  }, []);

  // Universal LMS embed wiring: ready event, resize/wheel forwarding,
  // ?autostart=1 deep link, host commands, screen-transition events,
  // and Rise 360 completion fire on the results screen.
  const screenEvents = useMemo(() => ({
    quiz:    { event: 'start' },
    results: {
      event: 'results',
      payload: resultsData
        ? {
            topStyles: resultsData.topStyles?.map(s => s.name),
            allScores: resultsData.allScores?.map(s => ({ name: s.name, score: s.score })),
          }
        : {},
      complete: true,
    },
    welcome: { whenFrom: ['results'], event: 'restart' },
  }), [resultsData]);

  useIframeBridge({
    onStart: startQuiz,
    onRestart: restartQuiz,
    screen: currentScreen,
    screenEvents,
  });

  return (
    <LayoutWrapper>
      {currentScreen === 'welcome' && <WelcomeScreen onStart={startQuiz} />}
      {currentScreen === 'quiz' && <QuizScreen onComplete={handleQuizComplete} />}
      {currentScreen === 'tieBreaker' && tieBreakerCtx && (
        <TieBreakerScreen
          key={`tb-${tieBreakerCtx.attemptIdx}`}
          answers={tieBreakerCtx.answers}
          shuffledQuestions={tieBreakerCtx.shuffledQuestions}
          tiedStyleIds={tieBreakerCtx.tiedStyleIds}
          attemptIdx={tieBreakerCtx.attemptIdx}
          usedCandidates={tieBreakerCtx.usedCandidates}
          onAttemptComplete={handleTieBreakerAttempt}
          onNoCandidates={handleNoCandidates}
        />
      )}
      {currentScreen === 'results' && resultsData && (
        <ResultsScreen resultsData={resultsData} onRestart={restartQuiz} />
      )}
    </LayoutWrapper>
  );
}

export default App;
