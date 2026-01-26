import React from 'react';
import { Mail, Phone, Globe } from 'lucide-react';

const Template1 = ({ info }) => {
  const { primaryColor, logoSize, bodyFontSize } = info.design;
  return (
    <>
      <div className="absolute top-0 left-0 w-5 h-full opacity-10" style={{ backgroundColor: primaryColor }}></div>
      <div className="flex justify-between items-start mb-12 pl-8">
        <div className="max-w-[70%]">
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none" style={{ color: primaryColor }}>{info.companyName}</h2>
          <p className="text-[11px] font-bold text-slate-400 tracking-[3px] uppercase mt-2">{info.tagline}</p>
        </div>
        {info.logo && <img src={info.logo} style={{ height: `${logoSize}px` }} alt="logo" className="object-contain max-w-[180px]" />}
      </div>
      <div className="flex justify-end gap-8 text-[10px] font-bold text-slate-500 uppercase mb-10 border-b-2 border-slate-100 pb-5 pl-8">
         <span className="flex items-center gap-2"><Phone size={12} style={{color: primaryColor}}/> {info.contact.phone}</span>
         <span className="flex items-center gap-2"><Mail size={12} style={{color: primaryColor}}/> {info.contact.email}</span>
         <span className="flex items-center gap-2"><Globe size={12} style={{color: primaryColor}}/> {info.contact.website}</span>
      </div>
    </>
  );
};

export default Template1;