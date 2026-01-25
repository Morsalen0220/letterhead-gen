import React from 'react';
import { Palette, Mail, FileText, Globe, MapPin, Calendar, User, CheckCircle2 } from 'lucide-react';

const Editor = ({ info, setInfo }) => {
  // হেন্ডলার যা অবজেক্টের গভীরের ডাটাও আপডেট করতে পারে
  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section) {
      setInfo({ ...info, [section]: { ...info[section], [name]: value } });
    } else {
      setInfo({ ...info, [name]: value });
    }
  };

  return (
    <div className="space-y-8 pb-10 text-left">
      {/* ১. ব্র্যান্ডিং সেকশন */}
      <section className="bg-white/5 p-4 rounded-2xl border border-white/5">
        <h3 className="flex items-center gap-2 text-xs font-black text-blue-400 uppercase mb-4"><Palette size={14} /> Branding & Style</h3>
        <div className="space-y-4">
          <input type="text" name="companyName" value={info.companyName} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm outline-none" placeholder="Company Name" />
          <input type="text" name="tagline" value={info.tagline} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm outline-none font-medium" placeholder="Tagline (e.g. Empowering Innovation)" />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Primary Color</label>
              <input type="color" value={info.design.primaryColor} onChange={(e) => setInfo({...info, design: {...info.design, primaryColor: e.target.value}})} className="w-full h-10 bg-transparent cursor-pointer rounded-lg border border-white/10" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Watermark</label>
              <button 
                onClick={() => setInfo({...info, design: {...info.design, showWatermark: !info.design.showWatermark}})}
                className={`w-full h-10 rounded-lg text-[10px] font-black uppercase transition-all ${info.design.showWatermark ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}
              >
                {info.design.showWatermark ? 'On' : 'Off'}
              </button>
            </div>
          </div>

          <select value={info.design.fontFamily} onChange={(e) => setInfo({...info, design: {...info.design, fontFamily: e.target.value}})} className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm text-white">
            <option value="sans-serif">Modern Sans</option>
            <option value="serif">Classic Serif</option>
            <option value="monospace">Technical Mono</option>
          </select>
        </div>
      </section>

      {/* ২. কন্টাক্ট ইনফো */}
      <section className="bg-white/5 p-4 rounded-2xl border border-white/5">
        <h3 className="flex items-center gap-2 text-xs font-black text-emerald-400 uppercase mb-4"><Mail size={14} /> Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 border border-white/10">
            <Mail size={14} className="text-slate-500" />
            <input type="text" name="email" value={info.contact.email} onChange={(e) => handleChange(e, 'contact')} className="w-full bg-transparent py-3 text-sm outline-none" placeholder="Email" />
          </div>
          <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 border border-white/10">
            <Globe size={14} className="text-slate-500" />
            <input type="text" name="website" value={info.contact.website} onChange={(e) => handleChange(e, 'contact')} className="w-full bg-transparent py-3 text-sm outline-none" placeholder="Website" />
          </div>
          <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 border border-white/10">
            <MapPin size={14} className="text-slate-500" />
            <input type="text" name="address" value={info.contact.address} onChange={(e) => handleChange(e, 'contact')} className="w-full bg-transparent py-3 text-sm outline-none" placeholder="Address" />
          </div>
        </div>
      </section>

      {/* ৩. লেটার ডিটেইলস */}
      <section className="bg-white/5 p-4 rounded-2xl border border-white/5">
        <h3 className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase mb-4"><FileText size={14} /> Recipient & Content</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 border border-white/10">
            <Calendar size={14} className="text-slate-500" />
            <input type="text" name="date" value={info.letter.date} onChange={(e) => handleChange(e, 'letter')} className="w-full bg-transparent py-3 text-sm outline-none" placeholder="Date" />
          </div>
          <textarea name="recipient" value={info.letter.recipient} onChange={(e) => handleChange(e, 'letter')} className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm outline-none h-24 resize-none" placeholder="Recipient Details (To...)" />
          <input type="text" name="subject" value={info.letter.subject} onChange={(e) => handleChange(e, 'letter')} className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm outline-none font-bold" placeholder="Subject" />
          <textarea name="body" value={info.letter.body} onChange={(e) => handleChange(e, 'letter')} className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-sm outline-none h-48 leading-relaxed" placeholder="Write your letter here..." />
        </div>
      </section>
    </div>
  );
};

export default Editor;