import React, { useState } from 'react';
import { Search, Printer, Download, User } from 'lucide-react';

export const HallTicket: React.FC = () => {
  const [usn, setUsn] = useState('');
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!usn.trim()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTicket({
        name: "Rahul Sharma",
        usn: usn.toUpperCase(),
        course: "B.Tech Computer Science",
        semester: 6,
        photo: "https://picsum.photos/150/150",
        center: "Main Block, Exam Hall 1",
        exams: [
          { date: "2024-05-15", time: "09:30 AM - 12:30 PM", code: "CS601", subject: "Machine Learning" },
          { date: "2024-05-17", time: "09:30 AM - 12:30 PM", code: "CS602", subject: "Compiler Design" },
          { date: "2024-05-20", time: "09:30 AM - 12:30 PM", code: "CS603", subject: "Computer Networks" },
          { date: "2024-05-22", time: "09:30 AM - 12:30 PM", code: "CS604", subject: "Web Technologies" },
          { date: "2024-05-24", time: "09:30 AM - 12:30 PM", code: "CS605", subject: "Cloud Computing" },
        ]
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Hall Ticket Generation</h2>
        <p className="text-slate-500">Search and generate exam hall tickets for students.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Enter Student USN / ID</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 1RV20CS001"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>
        <button 
          onClick={handleSearch}
          disabled={loading || !usn}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Generate Ticket'}
        </button>
      </div>

      {ticket && (
        <div className="animate-fade-in">
          <div className="flex justify-end gap-3 mb-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
              <Download size={16} /> Download PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800">
              <Printer size={16} /> Print
            </button>
          </div>

          <div className="bg-white p-8 rounded-none shadow-lg border border-slate-200 max-w-3xl mx-auto print:shadow-none print:border-0">
            <div className="border-b-2 border-slate-800 pb-6 mb-6 flex justify-between items-start">
              <div className="flex gap-4 items-center">
                 <div className="w-16 h-16 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-3xl">U</div>
                 <div>
                   <h1 className="text-xl font-bold text-slate-900 uppercase tracking-wide">ExamFlow University</h1>
                   <p className="text-sm text-slate-500">Office of the Controller of Examinations</p>
                   <p className="text-xs font-bold mt-1 uppercase text-slate-800">Hall Ticket - May/June 2024 Exams</p>
                 </div>
              </div>
              <div className="w-24 h-24 bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-300">
                {ticket.photo ? <img src={ticket.photo} alt="Student" className="w-full h-full object-cover" /> : <User size={32} />}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 text-sm">
              <div>
                <p className="text-slate-500 text-xs uppercase font-semibold">Student Name</p>
                <p className="font-bold text-slate-800 text-lg">{ticket.name}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase font-semibold">USN / Roll No</p>
                <p className="font-bold text-slate-800 text-lg">{ticket.usn}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase font-semibold">Course & Semester</p>
                <p className="font-medium text-slate-800">{ticket.course} - Sem {ticket.semester}</p>
              </div>
               <div>
                <p className="text-slate-500 text-xs uppercase font-semibold">Exam Center</p>
                <p className="font-medium text-slate-800">{ticket.center}</p>
              </div>
            </div>

            <table className="w-full text-left text-sm border-collapse mb-8">
              <thead>
                <tr className="border-y-2 border-slate-800">
                  <th className="py-2 font-bold text-slate-800">Date</th>
                  <th className="py-2 font-bold text-slate-800">Time</th>
                  <th className="py-2 font-bold text-slate-800">Sub Code</th>
                  <th className="py-2 font-bold text-slate-800">Subject Name</th>
                  <th className="py-2 font-bold text-slate-800 text-right">Invigilator Sign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {ticket.exams.map((exam: any, idx: number) => (
                  <tr key={idx}>
                    <td className="py-3 text-slate-700">{exam.date}</td>
                    <td className="py-3 text-slate-700">{exam.time}</td>
                    <td className="py-3 font-medium text-slate-900">{exam.code}</td>
                    <td className="py-3 text-slate-700">{exam.subject}</td>
                    <td className="py-3 border-b border-slate-100"></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-end pt-8 mt-12 border-t border-slate-200">
              <div className="text-center">
                <div className="w-32 border-b border-slate-400 mb-2"></div>
                <p className="text-xs font-bold text-slate-500 uppercase">Student Signature</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-10 mb-2 mx-auto flex items-end justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" className="h-8 opacity-60" alt="Sign" />
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase">Controller of Examinations</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-slate-50 text-xs text-slate-500 rounded border border-slate-100">
              <p className="font-bold mb-1">Instructions:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Candidates must carry this hall ticket and a valid college ID card to the exam hall.</li>
                <li>Report to the exam center 30 minutes before the scheduled time.</li>
                <li>Electronic gadgets, smartwatches, and programmable calculators are strictly prohibited.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
