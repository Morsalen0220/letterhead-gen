import React from 'react';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';
import Template4 from './templates/Template4';

export const Preview = React.forwardRef(({ info }, ref) => {
  const { layout, primaryColor, showWatermark, bodyFontSize } = info.design;
  const { mode, name, designation, image, typedFont } = info.signature;

  const renderTemplateHeader = () => {
    switch (layout) {
      case 'modern': return <Template1 info={info} />;
      case 'corporate': return <Template2 info={info} />;
      case 'minimalist': return <Template3 info={info} />;
      case 'sidebar': return <Template4 info={info} />;
      default: return <Template1 info={info} />;
    }
  };

  // Preview.jsx এর ভেতর নিচের পরিবর্তনটি করুন

return (
  <div ref={ref} id="letterhead-preview" className="w-[21cm] h-[29.7cm] bg-white text-slate-800 p-16 flex flex-col relative overflow-hidden print:shadow-none print:m-0">
    
    {/* ডিজাইন ডেকোরেশন (সব টেমপ্লেটের জন্য কমন রাখতে পারেন) */}
    <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: primaryColor }}></div>

    {/* টেমপ্লেট রেন্ডার হবে এখানে */}
    <div className="w-full relative z-10">
      {renderTemplateHeader()}
    </div>

    {/* বডি কন্টেন্ট (যেখানে ল্যাআউট অনুযায়ী সাইডবার ইফেক্ট দেওয়া যাবে) */}
    <div className={`flex-1 relative z-10 w-full flex flex-col ${layout === 'sidebar' ? 'border-l-2 pl-8 ml-2' : ''}`} style={{ borderColor: layout === 'sidebar' ? `${primaryColor}20` : 'transparent' }}>
      
      {/* Watermark Section */}
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] rotate-[-35deg] z-0 select-none">
          <h1 className="text-[100px] font-black uppercase text-center leading-none break-words max-w-[90%]">{info.companyName}</h1>
        </div>
      )}

      {/* Recipient & Date */}
      <div className="flex justify-between mb-10 text-sm font-bold w-full relative z-10">
        <div className="whitespace-pre-wrap border-l-4 pl-5 max-w-[65%] break-words leading-relaxed" style={{ borderColor: primaryColor }}>{info.letter.recipient}</div>
        <div className="text-slate-500 uppercase whitespace-nowrap font-bold text-xs tracking-wider">Date: {info.letter.date}</div>
      </div>
      
      {/* Subject */}
      <div className="mb-8 font-black uppercase text-base text-slate-900 break-words pb-2 relative z-10">
        Subject: {info.letter.subject}
      </div>

      {/* Body Text */}
      <div 
        className="text-slate-700 text-justify w-full whitespace-normal break-words [&>p]:mb-5 relative z-10"
        style={{ fontSize: `${bodyFontSize || 15}px`, lineHeight: '1.9' }}
        dangerouslySetInnerHTML={{ __html: info.letter.body }} 
      />
    </div>

    {/* Footer Area */}
    <div className="mt-auto pt-10 flex justify-between items-end relative z-10 w-full">
      <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Official Document • {info.companyName}</div>
      <div className="flex flex-col items-center min-w-[150px]">
        <div className="h-12 flex items-end justify-center mb-3 w-full overflow-hidden">
          {mode === 'type' ? (
            <span style={{ fontFamily: typedFont }} className="text-2xl text-slate-800 whitespace-nowrap">{name}</span>
          ) : (
            image && <img src={image} alt="Signature" className="max-h-full max-w-full object-contain" />
          )}
        </div>
        <p className="text-sm font-black text-slate-800 leading-none text-center uppercase">{name}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1.5 text-center tracking-wider">{designation}</p>
      </div>
    </div>
  </div>
);
});