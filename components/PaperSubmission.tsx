import React, { useState } from 'react';
import { Upload, Sparkles, AlertCircle, Check, FileText } from 'lucide-react';
import { analyzeQuestionPaper } from '../services/geminiService';
import { QuestionPaperAnalysis } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

export const PaperSubmission: React.FC = () => {
  const [course, setCourse] = useState('');
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<QuestionPaperAnalysis | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!content.trim() || !course) return;
    
    setIsAnalyzing(true);
    setError('');
    try {
      const analysis = await analyzeQuestionPaper(content, course);
      setResult(analysis);
    } catch (err) {
      setError("Failed to analyze paper. Please check your API key or try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Question Paper Smart-Audit</h2>
          <p className="text-slate-500">Submit question papers for AI-driven Bloom's Taxonomy and syllabus verification.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition">
          View All Submissions
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-blue-500"/> Paper Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Course Name / Code</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="e.g., CS402 - Database Management Systems"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Paste Question Paper Content</label>
                <div className="relative">
                  <textarea 
                    className="w-full h-64 border border-slate-300 rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Q1. Define Normalization. (5 Marks)&#10;Q2. Compare SQL and NoSQL databases... (10 Marks)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                    {content.length} chars
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                 <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !content || !course}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                    isAnalyzing || !content || !course 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Analyze with AI
                    </>
                  )}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
           {result ? (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h3 className="text-lg font-semibold text-slate-800">Audit Report</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-bold border ${
                  result.qualityScore > 80 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                }`}>
                  Quality Score: {result.qualityScore}/100
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                   <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Syllabus Coverage</p>
                   <p className="text-2xl font-bold text-slate-800">{result.syllabusCoverage}%</p>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                   <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Missing Topics</p>
                   <p className="text-lg font-bold text-red-500">{result.missingTopics.length}</p>
                 </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Bloom's Taxonomy Distribution</h4>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={Object.entries(result.bloomsDistribution).map(([name, value]) => ({ name, value }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {Object.keys(result.bloomsDistribution).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" wrapperStyle={{fontSize: '11px'}} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">AI Suggestions</h4>
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-sm text-slate-600">
                      <AlertCircle size={16} className="text-blue-500 mt-0.5 shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center gap-2">
                  <Check size={16} /> Approve Paper
                </button>
              </div>

            </div>
           ) : (
             <div className="h-full bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-8">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                 <Sparkles size={24} className="text-slate-300" />
               </div>
               <p className="font-medium">Ready to Analyze</p>
               <p className="text-sm text-center mt-2 max-w-xs">
                 Paste the question paper content on the left to generate an instant AI audit report.
               </p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
