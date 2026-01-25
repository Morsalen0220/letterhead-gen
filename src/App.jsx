import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Editor from './components/Editor';
import { Preview } from './components/Preview'; 
import { Download, Layout } from 'lucide-react';

function App() {
  const [info, setInfo] = useState({
    companyName: 'TECH SOLUTIONS LTD.',
    tagline: 'EMPOWERING INNOVATION',
    contact: {
      email: 'contact@techsolutions.com',
      phone: '+880 1700-000000',
      website: 'www.techsolutions.com',
      address: '123 Business Avenue, Dhaka, Bangladesh'
    },
    letter: {
      date: new Date().toLocaleDateString(),
      recipient: 'To,\nThe Manager,\nABC Corporation,\nDhaka, Bangladesh',
      subject: 'Business Proposal for Software Services',
      body: 'Dear Sir,\n\nWe are pleased to submit our proposal for the software development services...'
    },
    design: {
      primaryColor: '#2563eb',
      secondaryColor: '#64748b',
      fontFamily: 'sans-serif',
      showWatermark: true
    }
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col md:flex-row h-screen overflow-hidden font-sans">
      <div className="w-full md:w-[400px] bg-slate-900 border-r border-white/10 overflow-y-auto p-6 shadow-2xl flex flex-col">
        <header className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <Layout className="text-white" size={20} />
          </div>
          <h1 className="text-lg font-black uppercase tracking-tighter">Letterhead Pro</h1>
        </header>
        <Editor info={info} setInfo={setInfo} />
      </div>

      <div className="flex-1 bg-slate-950 overflow-y-auto p-4 md:p-10 flex flex-col items-center">
        <div className="w-full max-w-[21cm] flex justify-end mb-8">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase shadow-xl"
          >
            <Download size={14} /> Export PDF
          </button>
        </div>

        <div className="transform scale-[0.5] sm:scale-[0.7] lg:scale-100 origin-top transition-all duration-500">
           <Preview ref={componentRef} info={info} />
        </div>
      </div>
    </div>
  );
}

export default App;