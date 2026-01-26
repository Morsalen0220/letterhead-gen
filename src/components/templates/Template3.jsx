import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Template3 = ({ info }) => {
  const { primaryColor, logoSize } = info.design;
  return (
    <div className="flex justify-between items-center border-b-2 border-slate-100 pb-8 mb-16">
      <div className="flex items-center gap-6">
        {info.logo && <img src={info.logo} style={{ height: `${logoSize}px` }} alt="logo" className="object-contain max-w-[140px]" />}
        <div className={`border-l-2 pl-6 ${!info.logo ? 'border-l-0 pl-0' : ''}`} style={{ borderColor: primaryColor }}>
          <h2 className="text-3xl font-black uppercase tracking-tight leading-none" style={{ color: primaryColor }}>{info.companyName}</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-wider">{info.tagline}</p>
        </div>
      </div>
      <div className="text-right text-[10px] text-slate-500 font-bold uppercase leading-loose flex flex-col items-end gap-1">
        <div className="flex items-center gap-2"><span>{info.contact.address}</span> <MapPin size={12} style={{color: primaryColor}}/></div>
        <div className="flex items-center gap-2"><span>{info.contact.phone}</span> <Phone size={12} style={{color: primaryColor}}/></div>
        <div className="flex items-center gap-2"><span>{info.contact.email}</span> <Mail size={12} style={{color: primaryColor}}/></div>
      </div>
    </div>
  );
};

export default Template3;