import React from 'react';

type AdBannerProps = {
  type?: 'horizontal' | 'vertical' | 'square';
  position?: 'top' | 'bottom' | 'inline';
};

const AdBanner: React.FC<AdBannerProps> = ({ 
  type = 'horizontal', 
  position = 'inline' 
}) => {
  // 실제 광고 통합 전 임시 배너
  const getBannerClass = () => {
    const baseClasses = "bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md overflow-hidden flex flex-col items-center justify-center text-center";
    
    switch (type) {
      case 'horizontal':
        return `${baseClasses} w-full h-24 md:h-28`;
      case 'vertical':
        return `${baseClasses} w-full md:w-64 h-80`;
      case 'square':
        return `${baseClasses} w-full md:w-80 h-64 md:h-80`;
      default:
        return `${baseClasses} w-full h-24 md:h-28`;
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
        return 'my-4';
    }
  };

  // 광고 타입에 따른 다른 메시지 (실제 광고 통합 전)
  const getAdContent = () => {
    const contents = [
      { title: '연애 성향 테스트', desc: '출시 예정' },
      { title: 'IQ 테스트', desc: '곧 만나보세요' },
      { title: '직업 적성 검사', desc: '개발 중' },
      { title: '스트레스 지수 테스트', desc: '준비 중' },
    ];
    
    // 랜덤 콘텐츠 선택
    const randomContent = contents[Math.floor(Math.random() * contents.length)];
    
    return (
      <>
        <p className="text-gray-400 dark:text-gray-500 text-xs mb-1">광고</p>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {randomContent.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {randomContent.desc}
        </p>
        {type !== 'horizontal' && (
          <button className="mt-4 px-4 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full text-sm">
            알림 신청
          </button>
        )}
      </>
    );
  };

  return (
    <div className={`${getBannerClass()} ${getPositionClass()} relative`}>
      {getAdContent()}
    </div>
  );
};

export default AdBanner; 