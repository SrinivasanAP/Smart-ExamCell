import React from 'react';
import { Package, Truck, CheckSquare, MapPin } from 'lucide-react';

const bundles = [
  { id: 'BND-2024-001', course: 'CS301', scripts: 58, status: 'Valuation Center', location: 'Room 304', handler: 'Dr. Smith' },
  { id: 'BND-2024-002', course: 'CS302', scripts: 60, status: 'In Transit', location: '-', handler: 'Transit Officer' },
  { id: 'BND-2024-003', course: 'EE204', scripts: 45, status: 'Exam Cell', location: 'Strong Room', handler: 'Mr. Johnson' },
  { id: 'BND-2024-004', course: 'ME401', scripts: 52, status: 'Valuation Completed', location: 'Store', handler: '-' },
];

export const ScriptTracking: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Answer Script Tracker</h2>
        <p className="text-slate-500">End-to-end chain of custody for exam bundles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Collected', 'In Transit', 'Valuation', 'Stored'].map((step, i) => (
           <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
              <span className="font-medium text-slate-700">{step}</span>
           </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4 font-semibold">Bundle ID</th>
              <th className="px-6 py-4 font-semibold">Course</th>
              <th className="px-6 py-4 font-semibold">Script Count</th>
              <th className="px-6 py-4 font-semibold">Current Status</th>
              <th className="px-6 py-4 font-semibold">Last Location</th>
              <th className="px-6 py-4 font-semibold">Custodian</th>
              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bundles.map((bundle) => (
              <tr key={bundle.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-2">
                  <Package size={16} className="text-slate-400"/>
                  {bundle.id}
                </td>
                <td className="px-6 py-4">{bundle.course}</td>
                <td className="px-6 py-4">{bundle.scripts}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                    bundle.status === 'Valuation Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                    bundle.status === 'In Transit' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                    'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {bundle.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <MapPin size={14} className="text-slate-400"/> {bundle.location}
                </td>
                <td className="px-6 py-4">{bundle.handler}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
         </table>
      </div>
    </div>
  );
};
