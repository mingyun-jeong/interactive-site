'use client';

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

type AdBannerProps = {
  type?: 'horizontal' | 'vertical' | 'square';
  position?: 'top' | 'bottom' | 'inline';
  className?: string;
};

const AdBanner: React.FC<AdBannerProps> = ({ 
  type = 'horizontal', 
  position = 'inline',
  className = ''
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  
  // 광고 타입에 따른 Google AdSense 광고 사이즈 설정
  const getAdSize = () => {
    switch (type) {
      case 'horizontal':
        return { width: '728', height: '90', format: 'auto' }; // 리스폰시브 광고
      case 'vertical':
        return { width: '300', height: '600', format: 'auto' };
      case 'square':
        return { width: '336', height: '280', format: 'auto' };
      default:
        return { width: '728', height: '90', format: 'auto' };
    }
  };

  // 광고 위치에 따른 추가 클래스
  const getPositionClass = () => {
    switch (position) {
      case 'top':
        return 'mb-6';
      case 'bottom':
        return 'mt-6';
      case 'inline':
      default:
        return 'my-6';
    }
  };

  // 실제 광고가 로드되기 전 보여줄 플레이스홀더
  const getPlaceholderClass = () => {
    const baseClasses = "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex flex-col items-center justify-center text-center animate-pulse";
    
    switch (type) {
      case 'horizontal':
        return `${baseClasses} w-full h-24 md:h-28`;
      case 'vertical':
        return `${baseClasses} w-64 h-[600px]`;
      case 'square':
        return `${baseClasses} w-full max-w-[336px] h-[280px]`;
      default:
        return `${baseClasses} w-full h-24 md:h-28`;
    }
  };

  return (
    <>
      {/* Google AdSense 스크립트 */}
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6951210541539723"
        crossOrigin="anonymous"
      />
      
      <div className={`${getPositionClass()} ${className} overflow-hidden flex justify-center`}>
        {/* 실제 AdSense 광고 */}
        <div ref={adRef} className={getPlaceholderClass()}>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-6951210541539723"
            data-ad-slot="8994204485"
            data-ad-format={getAdSize().format}
            data-full-width-responsive="true"
          ></ins>
          
          {/* 광고가 로드되기 전 보여줄 텍스트 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-slate-400 dark:text-slate-500 text-xs mb-1">광고 로드 중...</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {type === 'horizontal' ? '728x90' : type === 'vertical' ? '300x600' : '336x280'}
            </p>
          </div>
        </div>
      </div>

      {/* 광고 초기화 스크립트 */}
      <Script id="ad-init" strategy="afterInteractive">
        {`
          try {
            (adsbygoogle = window.adsbygoogle || []).push({});
          } catch (error) {
            console.error('AdSense error:', error);
          }
        `}
      </Script>
    </>
  );
};

export default AdBanner; 