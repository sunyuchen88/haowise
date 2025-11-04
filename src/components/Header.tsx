import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  const switchToChinese = () => {
    setLanguage('zh');
  };

  const switchToEnglish = () => {
    setLanguage('en');
  };

  const navItems = language === 'zh' ? [
    { name: '首页', path: '/' },
    { name: '解决方案', path: '/solutions' },
    { name: '产品', path: '/products' },
    { name: '关于我们', path: '/about' },
    { name: '联系我们', path: '/contact' },
  ] : [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Haowise
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`hover:text-blue-600 transition-colors ${
                  pathname === item.path ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={switchToChinese}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                language === 'zh' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              中文
            </button>
            <button
              onClick={switchToEnglish}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                language === 'en' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              EN
            </button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`hover:text-blue-600 transition-colors ${
                    pathname === item.path ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;