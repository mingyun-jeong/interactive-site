'use client';

import React from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLink 
} from 'react-icons/fa';

interface ShareButtonsProps {
  title: string;
  hashtags?: string[];
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ 
  title, 
  hashtags = ['MBTI', '원피스', '테스트']
}) => {
  // 현재 URL 가져오기
  const getURL = () => {
    return typeof window !== 'undefined' ? window.location.href : '';
  };
  
  // 트위터 공유
  const shareOnTwitter = () => {
    const url = getURL();
    const text = encodeURIComponent(title);
    const hashtagsString = hashtags.map(tag => encodeURIComponent(tag)).join(',');
    
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}&hashtags=${hashtagsString}`,
      '_blank'
    );
  };
  
  // 페이스북 공유
  const shareOnFacebook = () => {
    const url = getURL();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank'
    );
  };
  
  // 링크 복사
  const copyLink = () => {
    const url = getURL();
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('링크가 클립보드에 복사되었습니다!');
      })
      .catch(err => {
        console.error('링크 복사 실패:', err);
      });
  };
  
  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={shareOnTwitter}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 hover:bg-blue-500 text-white transition-colors"
        aria-label="트위터에 공유하기"
      >
        <FaTwitter />
      </button>
      
      <button
        onClick={shareOnFacebook}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        aria-label="페이스북에 공유하기"
      >
        <FaFacebook />
      </button>
      
      <button
        onClick={copyLink}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors"
        aria-label="링크 복사하기"
      >
        <FaLink />
      </button>
    </div>
  );
};

export default ShareButtons; 