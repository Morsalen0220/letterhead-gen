import React from 'react';
import { Palette, Mail, FileText } from 'lucide-react';

const Editor = ({ info, setInfo }) => {
  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section) {
      setInfo({ ...info, [section]: { ...info[section], [name]: value } });
    } else {
      setInfo({ ...info, [name]: value });
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <section>
        <h3 className="flex items-center gap-2 text-xs font-black text-blue-400 uppercase mb-4"><Palette size={14} /> Branding</h3>
        <div className="space-y-4">
          <input type="text" name="companyName" value={info.companyName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none" placeholder="Company Name" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Primary</label>
              <input type="color" value={info.design.primaryColor} onChange={(e) => setInfo({...info, design: {...info.design, primaryColor: e.target.value}})} className="w-full h-10 bg-transparent cursor-pointer rounded-lg border border-white/10" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Secondary</label>
              <input type="color" value={info.design.secondaryColor} onChange={(e) => setInfo({...info, design: {...info.design, secondaryColor: e.target.value}})} className="w-full h-10 bg-transparent cursor-pointer rounded-lg border border-white/10" />
            </div>
          </div>
          <select value={info.design.fontFamily} onChange={(e) => setInfo({...info, design: {...info.design, fontFamily: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm">
            <option value="sans-serif">Modern Sans</option>
            <option value="serif">Classic Serif</option>
            <option value="monospace">Technical Mono</option>
          </select>
        </div>
      </section>

      <section>
        <h3 className="flex items-center gap-2 text-xs font-black text-emerald-400 uppercase mb-4"><Mail size={14} /> Contact</h3>
        <div className="space-y-3">
          <input type="text" name="phone" value={info.contact.phone} onChange={(e) => handleChange(e, 'contact')} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none" placeholder="Phone" />
          <input type="text" name="email" value={info.contact.email} onChange={(e) => handleChange(e, 'contact')} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none" placeholder="Email" />
        </div>
      </section>

      <section>
        <h3 className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase mb-4"><FileText size={14} /> Content</h3>
        <textarea name="body" value={info.letter.body} onChange={(e) => handleChange(e, 'letter')} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none h-40" placeholder="Letter Body..." />
      </section>
    </div>
  );
};

export default Editor;