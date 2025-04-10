'use client';

import React, { useEffect, useRef } from 'react';

type AdBannerProps = {
  type?: 'horizontal' | 'vertical' | 'square';
  position?: 'top' | 'bottom' | 'inline';
  className?: string;
  adSlot?: string;
};

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  type = 'horizontal', 
  position = 'inline',
  className = '',
  adSlot = '8994204485'
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  
  // 광고 초기화 효과
  useEffect(() => {
    try {
      // 광고 초기화
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense initialization error:', error);
    }
  }, []);
  
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
    const baseClasses = "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex flex-col items-center justify-center text-center";
    
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
    <div className={`${getPositionClass()} ${className} overflow-hidden flex justify-center`}>
      {/* 실제 AdSense 광고 */}
      <div ref={adRef} className={getPlaceholderClass()}>
        <ins
          className="adsbygoogle"
          style={{ 
            display: 'block',
            width: getAdSize().width === 'auto' ? '100%' : `${getAdSize().width}px`,
            height: getAdSize().height === 'auto' ? 'auto' : `${getAdSize().height}px`,
          }}
          data-ad-client="ca-pub-6951210541539723"
          data-ad-slot={adSlot}
          data-ad-format={getAdSize().format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default AdBanner; 