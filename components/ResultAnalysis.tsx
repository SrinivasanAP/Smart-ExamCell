import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Trophy, Users, TrendingUp, AlertTriangle } from 'lucide-react';

const subjectPerformance = [
  { subject: 'Data Structures', avg: 72, pass: 88 },
  { subject: 'Algorithms', avg: 65, pass: 75 },
  { subject: 'OS', avg: 68, pass: 82 },
  { subject: 'DBMS', avg: 74, pass: 90 },
  { subject: 'Maths IV', avg: 58, pass: 65 },
  { subject: 'Networks', avg: 70, pass: 85 },
];

const passDistribution = [
  { name: 'Distinction (>75%)', value: 45 },
  { name: 'First Class (60-75%)', value: 85 },
  { name: 'Second Class (50-60%)', value: 40 },
  { name: 'Fail (<50%)', value: 25 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

const StatCard = ({ label, value, sub, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
        <Icon size={20} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
    <p className="text-xs text-slate-400 mt-2">{sub}</p>
  </div>
);

export const ResultAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Result Analysis</h2>
          <p className="text-slate-500">Academic performance insights for Batch 2021-2025.</p>
        </div>
        <select className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
          <option>Semester 6 (Current)</option>
          <option>Semester 5</option>
          <option>Semester 4</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Students" value="195" sub="Appeared for exams" icon={Users} color="bg-blue-500" />
        <StatCard label="Overall Pass %" value="87.2%" sub="+2.5% from last sem" icon={TrendingUp} color="bg-green-500" />
        <StatCard label="Class Topper" value="9.8 SGPA" sub="Aditya Rao (CS)" icon={Trophy} color="bg-purple-500" />
        <StatCard label="Critical Subjects" value="Maths IV" sub="Lowest pass percentage" icon={AlertTriangle} color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Subject-wise Average Marks</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="avg" name="Average Marks" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Grade Distribution</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={passDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {passDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-semibold text-slate-700">Top Performers</h3>
          <button className="text-xs text-blue-600 font-medium hover:underline">View Full Merit List</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-slate-500 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 font-semibold">Rank</th>
              <th className="px-6 py-3 font-semibold">Student Name</th>
              <th className="px-6 py-3 font-semibold">USN</th>
              <th className="px-6 py-3 font-semibold">Total Marks</th>
              <th className="px-6 py-3 font-semibold">Percentage</th>
              <th className="px-6 py-3 font-semibold">SGPA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { rank: 1, name: "Aditya Rao", usn: "1RV21CS001", total: 585, per: "97.5%", sgpa: 9.8 },
              { rank: 2, name: "Sneha Gupta", usn: "1RV21CS045", total: 578, per: "96.3%", sgpa: 9.7 },
              { rank: 3, name: "Mohammed Zaid", usn: "1RV21CS088", total: 572, per: "95.3%", sgpa: 9.6 },
              { rank: 4, name: "Priya Menon", usn: "1RV21CS112", total: 568, per: "94.6%", sgpa: 9.5 },
              { rank: 5, name: "John D'Souza", usn: "1RV21CS023", total: 565, per: "94.1%", sgpa: 9.5 },
            ].map((student) => (
              <tr key={student.rank} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    student.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    student.rank === 2 ? 'bg-slate-100 text-slate-700' :
                    student.rank === 3 ? 'bg-orange-100 text-orange-700' : 'text-slate-500'
                  }`}>
                    {student.rank}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-800">{student.name}</td>
                <td className="px-6 py-4 text-slate-500">{student.usn}</td>
                <td className="px-6 py-4 text-slate-700">{student.total}/600</td>
                <td className="px-6 py-4 font-bold text-green-600">{student.per}</td>
                <td className="px-6 py-4 font-bold text-blue-600">{student.sgpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
