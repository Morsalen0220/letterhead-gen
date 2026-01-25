import React from 'react';
import { Mail, Globe, Phone, MapPin } from 'lucide-react';

export const Preview = React.forwardRef(({ info }, ref) => {
  return (
    <div 
      ref={ref} 
      className="w-[21cm] h-[29.7cm] bg-white text-slate-800 p-16 flex flex-col relative overflow-hidden print:shadow-none print:m-0 print:p-16"
      style={{ 
        fontFamily: info.design.fontFamily,
        boxSizing: 'border-box' // Padding height-er bhitor thakbe
      }}
    >
      {/* Design Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-bl-full opacity-10 -mr-20 -mt-20" style={{ backgroundColor: info.design.primaryColor }}></div>
      <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: info.design.primaryColor }}></div>

      {/* Header */}
      <div className="flex justify-between items-start border-b-2 pb-8 relative z-10" style={{ borderColor: info.design.primaryColor }}>
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter" style={{ color: info.design.primaryColor }}>{info.companyName}</h2>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{info.tagline}</p>
        </div>
        <div className="text-right text-[10px] font-bold text-slate-600 uppercase space-y-1">
          <p className="flex items-center justify-end gap-2"><MapPin size={10} style={{ color: info.design.primaryColor }} /> {info.contact.address}</p>
          <p className="flex items-center justify-end gap-2"><Phone size={10} style={{ color: info.design.primaryColor }} /> {info.contact.phone}</p>
          <p className="flex items-center justify-end gap-2"><Mail size={10} style={{ color: info.design.primaryColor }} /> {info.contact.email}</p>
        </div>
      </div>

      {/* Watermark Logic */}
      {info.design.showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-35deg] z-0">
          <h1 className="text-[120px] font-black uppercase">{info.companyName}</h1>
        </div>
      )}

      {/* Content Area */}
      <div className="mt-16 flex-1 relative z-10">
        <div className="flex justify-between mb-10 text-sm font-bold">
          <div className="whitespace-pre-wrap text-slate-700">{info.letter.recipient}</div>
          <div className="text-slate-400">DATE: {info.letter.date}</div>
        </div>
        <div className="mb-8 font-black uppercase text-sm border-l-4 pl-4" style={{ borderColor: info.design.primaryColor }}>
          Subject: {info.letter.subject}
        </div>
        <div className="text-[14px] leading-relaxed text-slate-600 whitespace-pre-wrap text-justify">
          {info.letter.body}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-slate-100 text-center text-[9px] text-slate-300 uppercase font-black tracking-[0.5em]">
        Official Document • {info.companyName}
      </div>
    </div>
  );
});