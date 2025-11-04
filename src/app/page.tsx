'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  const keyPoints = [
    {
      title: t('keyPoint1Title'),
      description: t('keyPoint1Description')
    },
    {
      title: t('keyPoint2Title'),
      description: t('keyPoint2Description')
    },
    {
      title: t('keyPoint3Title'),
      description: t('keyPoint3Description')
    },
    {
      title: t('keyPoint4Title'),
      description: t('keyPoint4Description')
    },
    {
      title: t('keyPoint5Title'),
      description: t('keyPoint5Description')
    },
    {
      title: t('keyPoint6Title'),
      description: t('keyPoint6Description')
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                {t('heroCtaPrimary')}
              </Link>
              <Link 
                href="/solutions" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                {t('heroCtaSecondary')}
              </Link>
            </div>
          </div>
        </section>

        {/* Key Points Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('keyPointsTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyPoints.map((point, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {t('ctaDescription')}
            </p>
            <Link 
              href="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              {t('ctaButton')}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}