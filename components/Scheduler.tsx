import React, { useState } from 'react';
import { Calendar as CalendarIcon, Wand2, ArrowRight } from 'lucide-react';
import { suggestTimetable } from '../services/geminiService';

export const Scheduler: React.FC = () => {
  const [courses, setCourses] = useState<string>('CS301, CS302, CS303, CS304, CS305, CS306');
  const [startDate, setStartDate] = useState<string>('2024-05-15');
  const [scheduleHtml, setScheduleHtml] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const courseList = courses.split(',').map(c => c.trim()).filter(c => c);
    const html = await suggestTimetable(courseList, startDate);
    setScheduleHtml(html);
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
       <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Exam Scheduler</h2>
          <p className="text-slate-500">AI-assisted timetable generation and conflict resolution.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Wand2 size={18} className="text-purple-500"/> Generator Config
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Courses (comma separated)</label>
                <textarea 
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none h-32 resize-none"
                  value={courses}
                  onChange={(e) => setCourses(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Start Date</label>
                <input 
                  type="date"
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-lg shadow-purple-500/20 disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Draft Schedule'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
           <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm min-h-[400px]">
             {scheduleHtml ? (
               <div className="animate-fade-in">
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="font-semibold text-slate-800">Draft Schedule</h3>
                   <div className="flex gap-2">
                     <button className="text-xs border border-slate-300 px-3 py-1 rounded hover:bg-slate-50">Edit</button>
                     <button className="text-xs bg-slate-900 text-white px-3 py-1 rounded hover:bg-slate-800">Publish</button>
                   </div>
                 </div>
                 <div 
                  className="prose prose-sm max-w-none prose-table:w-full prose-th:text-left prose-td:py-3 prose-th:py-3 prose-tr:border-b prose-tr:border-slate-100"
                  dangerouslySetInnerHTML={{ __html: scheduleHtml }} 
                 />
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <CalendarIcon size={48} className="text-slate-200 mb-4" />
                  <p>No schedule generated yet.</p>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};
