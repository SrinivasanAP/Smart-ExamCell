import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const poData = [
  { subject: 'PO1', A: 120, B: 110, fullMark: 150 },
  { subject: 'PO2', A: 98, B: 130, fullMark: 150 },
  { subject: 'PO3', A: 86, B: 130, fullMark: 150 },
  { subject: 'PO4', A: 99, B: 100, fullMark: 150 },
  { subject: 'PO5', A: 85, B: 90, fullMark: 150 },
  { subject: 'PO6', A: 65, B: 85, fullMark: 150 },
];

const coData = [
  { name: 'CO1', target: 70, achieved: 75 },
  { name: 'CO2', target: 70, achieved: 62 },
  { name: 'CO3', target: 65, achieved: 68 },
  { name: 'CO4', target: 65, achieved: 55 },
  { name: 'CO5', target: 60, achieved: 60 },
];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Outcome Based Education Analytics</h2>
          <p className="text-slate-500">Tracking CO/PO attainment for accreditation (NBA/NAAC).</p>
        </div>
        <select className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500">
          <option>Batch 2021-2025</option>
          <option>Batch 2022-2026</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PO Attainment Radar */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6 text-center">Program Outcome (PO) Attainment</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={poData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="CS Batch '24" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
                <Radar name="Target Level" dataKey="B" stroke="#94a3b8" strokeDasharray="4 4" fill="transparent" />
                <Legend />
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">Comparison of Actual Attainment vs Target</p>
        </div>

        {/* CO Attainment Bar */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6 text-center">Course Outcome (CO) Attainment - CS301</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Bar dataKey="target" name="Target %" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="achieved" name="Achieved %" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">Individual Course Performance Metric</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">Course-PO Mapping Matrix (Sample)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-slate-600 text-center">
            <thead className="bg-slate-50 text-slate-500 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Course</th>
                <th className="px-4 py-3">PO1</th>
                <th className="px-4 py-3">PO2</th>
                <th className="px-4 py-3">PO3</th>
                <th className="px-4 py-3">PO4</th>
                <th className="px-4 py-3">PO5</th>
                <th className="px-4 py-3">PSO1</th>
                <th className="px-4 py-3">PSO2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-3 text-left font-medium">CS301 - Data Structures</td>
                <td className="px-4 py-3 bg-green-50 text-green-700">3</td>
                <td className="px-4 py-3 bg-green-50 text-green-700">3</td>
                <td className="px-4 py-3 bg-yellow-50 text-yellow-700">2</td>
                <td className="px-4 py-3">-</td>
                <td className="px-4 py-3 bg-red-50 text-red-700">1</td>
                <td className="px-4 py-3 bg-green-50 text-green-700">3</td>
                <td className="px-4 py-3 bg-yellow-50 text-yellow-700">2</td>
              </tr>
               <tr>
                <td className="px-4 py-3 text-left font-medium">CS302 - Algorithms</td>
                <td className="px-4 py-3 bg-green-50 text-green-700">3</td>
                <td className="px-4 py-3 bg-green-50 text-green-700">3</td>
                <td className="px-4 py-3 bg-green-50 text-green-700">3</td>
                <td className="px-4 py-3 bg-yellow-50 text-yellow-700">2</td>
                <td className="px-4 py-3">-</td>
                <td className="px-4 py-3 bg-green-50 text-green-700">3</td>
                <td className="px-4 py-3 bg-green-50 text-green-700">3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};