
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-center py-4 mt-8">
      <div className="container mx-auto px-4">
        <p className="text-gray-500 text-sm">
          &copy; {currentYear} 백링크무료생성 SEO 도우미. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
