import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const Template4 = ({ info }) => {
  const { primaryColor, logoSize } = info.design;
  return (
    <div className="w-full flex justify-between items-start mb-12 border-b-2 pb-8" style={{ borderColor: `${primaryColor}20` }}>
      {/* বাম পাশে শুধু লোগো এবং নাম */}
      <div className="flex items-center gap-5">
        {info.logo && (
          <img src={info.logo} style={{ height: `${logoSize}px` }} alt="logo" className="object-contain" />
        )}
        <div className={info.logo ? "border-l-2 pl-5" : ""} style={{ borderColor: primaryColor }}>
          <h2 className="text-3xl font-black uppercase leading-none tracking-tighter" style={{ color: primaryColor }}>
            {info.companyName}
          </h2>
          <p className="text-[10px] font-bold text-slate-400 tracking-[2px] uppercase mt-2">
            {info.tagline}
          </p>
        </div>
      </div>

      {/* ডান পাশে কন্টাক্ট ইনফো (এটি সাইডবার স্টাইলের মতো কাজ করবে) */}
      <div className="text-right text-[10px] text-slate-500 font-bold uppercase leading-relaxed space-y-1">
        <div className="flex items-center justify-end gap-2">
          <span>{info.contact.address}</span>
          <MapPin size={12} style={{ color: primaryColor }} />
        </div>
        <div className="flex items-center justify-end gap-2">
          <span>{info.contact.phone}</span>
          <Phone size={12} style={{ color: primaryColor }} />
        </div>
        <div className="flex items-center justify-end gap-2">
          <span>{info.contact.email}</span>
          <Mail size={12} style={{ color: primaryColor }} />
        </div>
      </div>
    </div>
  );
};

export default Template4;