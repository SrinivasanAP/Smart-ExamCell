import React, { useState } from 'react';
import { Save, AlertCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

interface StudentMark {
  id: string;
  name: string;
  marks: string;
  max: number;
}

export const MarkEntry: React.FC = () => {
  const [course, setCourse] = useState('CS301');
  const [examType, setExamType] = useState('Internal 1');
  const [saved, setSaved] = useState(false);

  // Mock student list
  const [students, setStudents] = useState<StudentMark[]>([
    { id: '1RV21CS001', name: 'Aditya Rao', marks: '45', max: 50 },
    { id: '1RV21CS002', name: 'Bhumika S', marks: '42', max: 50 },
    { id: '1RV21CS003', name: 'Chirag M', marks: '', max: 50 },
    { id: '1RV21CS004', name: 'Deepa K', marks: '38', max: 50 },
    { id: '1RV21CS005', name: 'Eric John', marks: '49', max: 50 },
    { id: '1RV21CS006', name: 'Farhan Z', marks: 'AB', max: 50 }, // AB for Absent
  ]);

  const handleMarkChange = (id: string, val: string) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        // Validate input: numbers or AB
        if (val === '' || val === 'AB' || (!isNaN(Number(val)) && Number(val) <= s.max && Number(val) >= 0)) {
           return { ...s, marks: val };
        }
      }
      return s;
    }));
    setSaved(false);
  };

  const handleSave = () => {
    // Simulate save
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Subject Mark Entry</h2>
          <p className="text-slate-500">Digitize scores for internals and semester exams.</p>
        </div>
        {saved && (
           <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg animate-fade-in text-sm font-medium">
             <CheckCircle2 size={16} /> Marks Saved Successfully
           </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full md:w-auto">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Course</label>
          <div className="relative">
            <select 
              className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 font-medium"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="CS301">CS301 - Data Structures</option>
              <option value="CS302">CS302 - Algorithms</option>
              <option value="CS303">CS303 - Operating Systems</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full md:w-auto">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Exam Type</label>
           <div className="relative">
            <select 
              className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 font-medium"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
            >
              <option>Internal Assessment 1</option>
              <option>Internal Assessment 2</option>
              <option>Internal Assessment 3</option>
              <option>Semester End Exam</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        <div className="flex-1 w-full md:w-auto">
           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Max Marks</label>
           <div className="py-2 px-4 bg-slate-100 rounded-lg text-slate-600 font-medium border border-slate-200">
             50
           </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Student USN</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4 w-40">Marks Obtained</th>
              <th className="px-6 py-4">Percentage</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {students.map((student) => {
              const isAbsent = student.marks === 'AB';
              const marksNum = parseFloat(student.marks);
              const percentage = isAbsent || student.marks === '' ? '-' : ((marksNum / student.max) * 100).toFixed(1) + '%';
              const status = isAbsent ? 'Absent' : student.marks === '' ? 'Pending' : marksNum >= (student.max * 0.4) ? 'Pass' : 'Fail';
              const statusColor = status === 'Pass' ? 'bg-green-100 text-green-700' : status === 'Fail' ? 'bg-red-100 text-red-700' : status === 'Absent' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500';

              return (
                <tr key={student.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-medium text-slate-700">{student.id}</td>
                  <td className="px-6 py-3 text-slate-600">{student.name}</td>
                  <td className="px-6 py-3">
                    <input 
                      type="text" 
                      className={`w-full border rounded px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none transition font-medium text-center ${
                        isAbsent ? 'text-orange-600 border-orange-300 bg-orange-50' : 'text-slate-800 border-slate-300'
                      }`}
                      placeholder="0-50"
                      value={student.marks}
                      onChange={(e) => handleMarkChange(student.id, e.target.value)}
                    />
                  </td>
                  <td className="px-6 py-3 text-slate-600">{percentage}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor}`}>
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
           <button 
             onClick={handleSave}
             className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 font-medium"
           >
             <Save size={18} /> Save Marks
           </button>
        </div>
      </div>
      
      <div className="flex gap-2 items-start text-xs text-slate-500 px-2">
        <AlertCircle size={14} className="mt-0.5" />
        <p>Type 'AB' for absent students. Marks are automatically saved to the draft. Click 'Save Marks' to commit changes to the central database.</p>
      </div>
    </div>
  );
};
