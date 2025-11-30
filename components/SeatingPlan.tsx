import React from 'react';

// Mock Data for a Hall
const generateSeats = (rows: number, cols: number) => {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isOccupied = Math.random() > 0.3;
      seats.push({
        id: `${String.fromCharCode(65 + r)}${c + 1}`,
        status: isOccupied ? 'Occupied' : 'Empty',
        studentId: isOccupied ? `USN${100 + r * cols + c}` : null
      });
    }
  }
  return seats;
};

const HallVisual = ({ name, seats }: { name: string, seats: any[] }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-slate-700">{name}</h3>
      <div className="flex gap-4 text-xs">
         <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div> Occupied</div>
         <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-50 border border-slate-200 rounded"></div> Empty</div>
      </div>
    </div>
    <div className="grid grid-cols-6 gap-2">
      {seats.map((seat) => (
        <div 
          key={seat.id} 
          title={seat.studentId || 'Empty'}
          className={`h-10 rounded border text-[10px] flex items-center justify-center font-medium transition cursor-help
            ${seat.status === 'Occupied' 
              ? 'bg-blue-50 border-blue-200 text-blue-700' 
              : 'bg-slate-50 border-slate-100 text-slate-300'
            }`}
        >
          {seat.id}
        </div>
      ))}
    </div>
    <div className="mt-4 text-center">
      <div className="inline-block px-8 py-1 bg-slate-200 rounded-t-lg text-slate-500 text-xs font-bold uppercase tracking-widest w-1/2">
        Instructor Desk
      </div>
    </div>
  </div>
);

export const SeatingPlan: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Seating & Duties</h2>
        <p className="text-slate-500">Visual management of exam halls and faculty allocation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HallVisual name="LH-101 (Computer Science Block)" seats={generateSeats(5, 6)} />
        <HallVisual name="LH-102 (Mechanical Block)" seats={generateSeats(5, 6)} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-700">Faculty Duty Roster (Today)</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline">Download PDF</button>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-3 font-semibold">Faculty Name</th>
              <th className="px-6 py-3 font-semibold">Designation</th>
              <th className="px-6 py-3 font-semibold">Assigned Hall</th>
              <th className="px-6 py-3 font-semibold">Time</th>
              <th className="px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { name: "Prof. Alan Turing", role: "Professor", hall: "LH-101", time: "09:30 AM - 12:30 PM", status: "Active" },
              { name: "Dr. Grace Hopper", role: "Assoc. Prof", hall: "LH-102", time: "09:30 AM - 12:30 PM", status: "Active" },
              { name: "Prof. Ada Lovelace", role: "Asst. Prof", hall: "Reserve", time: "Standby", status: "Waiting" },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-medium text-slate-800">{row.name}</td>
                <td className="px-6 py-4">{row.role}</td>
                <td className="px-6 py-4">{row.hall}</td>
                <td className="px-6 py-4">{row.time}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
