import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { PaperSubmission } from './components/PaperSubmission';
import { Scheduler } from './components/Scheduler';
import { SeatingPlan } from './components/SeatingPlan';
import { Analytics } from './components/Analytics';
import { ScriptTracking } from './components/ScriptTracking';
import { HallTicket } from './components/HallTicket';
import { MarkEntry } from './components/MarkEntry';
import { ResultAnalysis } from './components/ResultAnalysis';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/papers" element={<PaperSubmission />} />
          <Route path="/schedule" element={<Scheduler />} />
          <Route path="/hall-tickets" element={<HallTicket />} />
          <Route path="/duties" element={<SeatingPlan />} />
          <Route path="/marks" element={<MarkEntry />} />
          <Route path="/results" element={<ResultAnalysis />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/scripts" element={<ScriptTracking />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
