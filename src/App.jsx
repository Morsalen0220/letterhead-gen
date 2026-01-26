import React, { useState, useRef, useEffect } from 'react'; // useEffect যুক্ত করা হয়েছে
import { useReactToPrint } from 'react-to-print';
import Editor from './components/Editor';
import { Preview } from './components/Preview'; 
import { Download, Layout, Eye, Edit3 } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('editor'); // মোবাইল ট্যাবের জন্য স্টেট
  const [info, setInfo] = useState({
    companyName: 'TECH SOLUTIONS LTD.',
    tagline: 'EMPOWERING INNOVATION',
    logo: null,
    contact: {
      email: 'contact@techsolutions.com',
      phone: '+880 1700-000000',
      website: 'www.techsolutions.com',
      address: '123 Business Avenue, Dhaka, Bangladesh'
    },
    letter: {
      date: new Date().toISOString().split('T')[0],
      recipient: 'To,\nThe Manager,\nABC Corporation,\nDhaka, Bangladesh',
      subject: 'Business Proposal for Software Services',
      body: '<p>Dear Sir,</p><p>We are pleased to submit our proposal for the software development services...</p>'
    },
    design: {
      layout: 'modern', 
      primaryColor: '#2563eb',
      fontFamily: 'sans-serif',
      showWatermark: true,
      logoSize: 60,
    },
    signature: {
      mode: 'type', 
      name: 'M. Morsalen',
      designation: 'Managing Director',
      image: null,
      typedFont: "'Dancing Script', cursive"
    }
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({ 
    contentRef: componentRef,
    documentTitle: info.companyName + "_Letterhead"
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setInfo({ ...info, logo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setInfo({ ...info, signature: { ...info.signature, image: reader.result } });
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem('letterheadData');
    if (savedData) setInfo(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    localStorage.setItem('letterheadData', JSON.stringify(info));
  }, [info]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col md:flex-row h-screen overflow-hidden font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Pacifico&family=Great+Vibes&display=swap');
        @media print {
          @page { size: A4; margin: 0mm !important; }
          body { margin: 0 !important; -webkit-print-color-adjust: exact; }
        }
      `}</style>

      {/* মোবাইল ট্যাব নেভিগেশন - শুধুমাত্র মোবাইলে দেখাবে */}
      <div className="md:hidden flex bg-slate-900 border-b border-white/10 shrink-0">
        <button 
          onClick={() => setActiveTab('editor')}
          className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'editor' ? 'text-blue-500 border-b-2 border-blue-500 bg-white/5' : 'text-slate-500'}`}
        >
          <Edit3 size={14} /> Editor
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'text-blue-500 border-b-2 border-blue-500 bg-white/5' : 'text-slate-500'}`}
        >
          <Eye size={14} /> Preview
        </button>
      </div>

      {/* Sidebar: Editor */}
     
<div className={`${activeTab === 'editor' ? 'flex' : 'hidden'} md:flex w-full md:w-[450px] bg-slate-900 border-r border-white/10 p-6 shadow-2xl flex-col shrink-0 h-[calc(100vh-60px)] md:h-screen overflow-y-auto`}>
  <header className="mb-8 flex items-center gap-3 shrink-0">
    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
      <Layout className="text-white" size={20} />
    </div>
    <h1 className="text-lg font-black uppercase tracking-tighter">Letterhead Pro</h1>
  </header>
  <div className="flex-1">
    <Editor 
      info={info} 
      setInfo={setInfo} 
      handleLogoChange={handleLogoChange} 
      handleSignatureChange={handleSignatureChange} 
    />
  </div>
</div>

      {/* Main Preview Area */}
      <div className={`${activeTab === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-950 overflow-y-auto p-4 md:p-10 flex-col items-center`}>
        <div className="w-full max-w-[21cm] flex justify-end mb-8 sticky top-0 z-20">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase shadow-xl transition-all active:scale-95"
          >
            <Download size={14} /> Export PDF
          </button>
        </div>

        <div className="transform scale-[0.35] sm:scale-[0.5] lg:scale-100 origin-top shadow-2xl mb-10 border border-white/5">
           <Preview ref={componentRef} info={info} />
        </div>
      </div>
    </div>
  );
}

export default App;