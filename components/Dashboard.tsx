import React from 'react';
import { FileWarning, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'CS Dept', submission: 85 },
  { name: 'EC Dept', submission: 60 },
  { name: 'ME Dept', submission: 45 },
  { name: 'CV Dept', submission: 90 },
  { name: 'EE Dept', submission: 70 },
];

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
    <p className="text-xs text-slate-400 mt-4">{sub}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Exam Cell Overview</h2>
        <p className="text-slate-500">Real-time insights into the examination process.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Papers Submitted" 
          value="142/180" 
          sub="38 Pending Submission" 
          icon={FileWarning} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Verified Papers" 
          value="98" 
          sub="Passed Bloom's Check" 
          icon={CheckCircle} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Active Duties" 
          value="24" 
          sub="Faculty currently in halls" 
          icon={Clock} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Compliance Issues" 
          value="12" 
          sub="Requires immediate attention" 
          icon={AlertTriangle} 
          color="bg-red-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Paper Submission Status by Department</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" tick={{fontSize: 12}} width={70} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="submission" radius={[0, 4, 4, 0]} barSize={30}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.submission < 50 ? '#ef4444' : entry.submission < 80 ? '#f59e0b' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            {[
              { text: "ME-301 Set B submission overdue by 2 days", time: "2 hrs ago", type: "urgent" },
              { text: "Hall 204 maintenance scheduled during Exam A", time: "5 hrs ago", type: "warning" },
              { text: "CS-502 Bloom's Analysis completed: 92% score", time: "1 day ago", type: "success" },
              { text: "New seating plan generated for Final Years", time: "1 day ago", type: "info" },
            ].map((alert, i) => (
              <div key={i} className="flex gap-3 items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                  alert.type === 'urgent' ? 'bg-red-500' : 
                  alert.type === 'warning' ? 'bg-orange-500' :
                  alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="text-sm text-slate-700 font-medium">{alert.text}</p>
                  <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
