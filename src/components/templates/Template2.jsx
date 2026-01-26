import React from 'react';

const Template2 = ({ info }) => {
  const { primaryColor, logoSize } = info.design;
  return (
    <div className="flex flex-col items-center border-b-2 border-slate-200 pb-8 mb-16" style={{ borderColor: primaryColor }}>
      {info.logo && <img src={info.logo} style={{ height: `${logoSize}px` }} className="mb-5 object-contain max-w-[220px]" alt="logo" />}
      <h2 className="text-4xl font-black uppercase tracking-widest text-center leading-tight" style={{ color: primaryColor }}>{info.companyName}</h2>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
         <span>{info.contact.phone}</span> • <span>{info.contact.email}</span> • <span>{info.contact.website}</span> • <span>{info.contact.address}</span>
      </div>
    </div>
  );
};

export default Template2;