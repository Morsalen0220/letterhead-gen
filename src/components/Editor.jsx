import React, { useRef } from 'react';
import { Palette, Mail, FileText, Globe, MapPin, Calendar, CheckCircle2, Phone, LayoutDashboard, Eye, EyeOff, RotateCcw, Upload, PenTool, Type } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import SignatureCanvas from 'react-signature-canvas';
import 'react-quill-new/dist/quill.snow.css';

const Editor = ({ info, setInfo, handleLogoChange, handleSignatureChange }) => {
  const sigCanvas = useRef({});

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section) {
      setInfo({ ...info, [section]: { ...info[section], [name]: value } });
    } else {
      setInfo({ ...info, [name]: value });
    }
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setInfo({ ...info, signature: { ...info.signature, image: null } });
  };

  const saveSignature = () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setInfo({ ...info, signature: { ...info.signature, image: dataURL } });
  };

  return (
    <div className="space-y-8 pb-10 text-left text-white">
      {/* ডিজাইন সিলেকশন */}
      <section className="bg-white/5 p-4 rounded-2xl border border-white/5">
        <h3 className="flex items-center gap-2 text-xs font-black text-purple-400 uppercase mb-4"><LayoutDashboard size={14} /> Design Layout</h3>
        <div className="grid grid-cols-4 gap-2">
          {['minimalist', 'corporate', 'modern', 'sidebar'].map((lay) => (
            <button 
              key={lay}
              onClick={() => setInfo({...info, design: {...info.design, layout: lay}})}
              className={`py-2 text-[9px] font-bold uppercase rounded-lg border transition-all ${info.design.layout === lay ? 'bg-blue-600 border-blue-500' : 'bg-slate-800 border-white/5 text-slate-400 hover:bg-slate-700'}`}
            >
              {lay}
            </button>
          ))}
        </div>
      </section>

      {/* ব্র্যান্ডিং */}
      <section className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="flex items-center gap-2 text-xs font-black text-blue-400 uppercase"><Palette size={14} /> Branding</h3>
          <button 
            onClick={() => setInfo({...info, design: {...info.design, showWatermark: !info.design.showWatermark}})}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all ${info.design.showWatermark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-slate-700 text-slate-400'}`}
          >
            {info.design.showWatermark ? <Eye size={12}/> : <EyeOff size={12}/>} Watermark
          </button>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Logo & Size</label>
            <input type="file" onChange={handleLogoChange} className="w-full text-xs text-slate-400" />
            <input type="range" min="30" max="150" value={info.design.logoSize} onChange={(e) => setInfo({...info, design: {...info.design, logoSize: e.target.value}})} className="w-full accent-blue-600" />
          </div>
          <input type="text" name="companyName" value={info.companyName} onChange={handleChange} className="w-full bg-slate-800 p-3 rounded-xl text-sm outline-none border border-white/5" placeholder="Company Name" />
          <input type="text" name="tagline" value={info.tagline} onChange={handleChange} className="w-full bg-slate-800 p-3 rounded-xl text-sm outline-none border border-white/5" placeholder="Tagline" />
          <input type="color" value={info.design.primaryColor} onChange={(e) => setInfo({...info, design: {...info.design, primaryColor: e.target.value}})} className="w-full h-10 bg-transparent cursor-pointer rounded-lg border border-white/10" />
        </div>
      </section>

      {/* কন্টাক্ট */}
      <section className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-3">
        <h3 className="flex items-center gap-2 text-xs font-black text-emerald-400 uppercase mb-4"><Mail size={14} /> Contact Information</h3>
        <input type="text" name="email" value={info.contact.email} onChange={(e) => handleChange(e, 'contact')} className="w-full bg-slate-800 p-3 rounded-xl text-sm outline-none border border-white/5" placeholder="Email" />
        <input type="text" name="phone" value={info.contact.phone} onChange={(e) => handleChange(e, 'contact')} className="w-full bg-slate-800 p-3 rounded-xl text-sm outline-none border border-white/5" placeholder="Phone" />
        <input type="text" name="address" value={info.contact.address} onChange={(e) => handleChange(e, 'contact')} className="w-full bg-slate-800 p-3 rounded-xl text-sm outline-none border border-white/5" placeholder="Address" />
      </section>

      {/* সিগনেচার */}
      <section className="bg-white/5 p-4 rounded-2xl border border-white/5">
        <h3 className="flex items-center gap-2 text-xs font-black text-rose-400 uppercase mb-4"><CheckCircle2 size={14} /> Signature</h3>
        <div className="flex bg-slate-800 p-1 rounded-xl mb-4 text-[9px] font-bold uppercase">
          {['upload', 'draw', 'type'].map(m => (
            <button key={m} onClick={() => setInfo({...info, signature: {...info.signature, mode: m}})} className={`flex-1 py-2 rounded-lg transition-all ${info.signature.mode === m ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>{m}</button>
          ))}
        </div>
        <div className="space-y-4">
          {info.signature.mode === 'draw' ? (
            <div className="space-y-2">
              <div className="bg-white rounded-xl h-24 overflow-hidden border-2 border-slate-700">
                <SignatureCanvas ref={sigCanvas} onEnd={saveSignature} penColor="black" canvasProps={{className: 'w-full h-full'}} />
              </div>
              <button onClick={clearSignature} className="text-[10px] text-slate-500 flex items-center gap-1 uppercase"><RotateCcw size={12}/> Clear</button>
            </div>
          ) : info.signature.mode === 'type' ? (
            <select value={info.signature.typedFont} onChange={(e) => setInfo({...info, signature: {...info.signature, typedFont: e.target.value}})} className="w-full bg-slate-800 p-3 rounded-xl text-sm outline-none border border-white/5">
              <option value="'Dancing Script', cursive">Dancing Script</option>
              <option value="'Pacifico', cursive">Pacifico</option>
              <option value="'Great Vibes', cursive">Great Vibes</option>
            </select>
          ) : (
            <input type="file" onChange={handleSignatureChange} className="text-xs text-slate-400" />
          )}
          <input type="text" value={info.signature.name} onChange={(e) => setInfo({...info, signature: {...info.signature, name: e.target.value}})} className="w-full bg-slate-800 p-3 rounded-xl text-sm outline-none border border-white/5" placeholder="Signatory Name" />
          <input type="text" value={info.signature.designation} onChange={(e) => setInfo({...info, signature: {...info.signature, designation: e.target.value}})} className="w-full bg-slate-800 p-3 rounded-xl text-sm outline-none border border-white/5" placeholder="Designation" />
        </div>
      </section>

      {/* কন্টেন্ট */}
      <section className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-4">
      
<div className="space-y-1">
  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex justify-between">
    Body Font Size <span>{info.design.bodyFontSize || 15}px</span>
  </label>
  <input 
    type="range" 
    min="10" 
    max="20" 
    value={info.design.bodyFontSize || 15} 
    onChange={(e) => setInfo({...info, design: {...info.design, bodyFontSize: parseInt(e.target.value)}})}
    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
  />
</div>
        <h3 className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase"><FileText size={14} /> Letter Content</h3>
        <input type="date" name="date" value={info.letter.date} onChange={(e) => handleChange(e, 'letter')} className="w-full bg-slate-800 p-3 rounded-xl text-sm outline-none" />
        <textarea name="recipient" value={info.letter.recipient} onChange={(e) => handleChange(e, 'letter')} className="w-full bg-slate-800 p-3 rounded-xl text-sm outline-none h-20 resize-none" placeholder="Recipient" />
        <ReactQuill theme="snow" value={info.letter.body} onChange={(val) => setInfo({...info, letter: {...info.letter, body: val}})} className="bg-slate-800 rounded-xl overflow-hidden" />
      </section>
    </div>
  );
};

export default Editor;