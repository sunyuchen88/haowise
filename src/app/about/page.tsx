'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t, language } = useLanguage();

  const aboutPoints = [
    {
      title: t('aboutPoint1Title'),
      englishTitle: "Core Team",
      description: t('aboutPoint1Description'),
      englishDescription: "The core team comes from top technology companies such as Alibaba Cloud, Microsoft, and IngramMicro China."
    },
    {
      title: t('aboutPoint2Title'),
      englishTitle: "Client Coverage",
      description: t('aboutPoint2Description'),
      englishDescription: "Serving clients across industries such as finance, manufacturing, retail, and education"
    },
    {
      title: t('aboutPoint3Title'),
      englishTitle: "Technology Investment",
      description: t('aboutPoint3Description'),
      englishDescription: "Continuous investment in AI and RPA technology ecosystem development"
    },
    {
      title: t('aboutPoint4Title'),
      englishTitle: "Localized Support",
      description: t('aboutPoint4Description'),
      englishDescription: "Localized support team: Bilingual service response in Chinese and English"
    },
    {
      title: t('aboutPoint5Title'),
      englishTitle: "Compliance Standards",
      description: t('aboutPoint5Description'),
      englishDescription: "Strict compliance with data security and regulatory standards (GDPR, China Cybersecurity Law)"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('aboutHeroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('aboutHeroDescription')}
            </p>
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-300 inline-block"
            >
              {t('aboutCta')}
            </Link>
          </div>
        </section>

        {/* About Points Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('aboutTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aboutPoints.map((point, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  {language === 'zh' ? (
                    <>
                      <h3 className="text-2xl font-bold mb-4 text-blue-600">{point.title}</h3>
                      <p className="text-gray-600">{point.description}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold mb-4 text-blue-600">{point.englishTitle}</h3>
                      <p className="text-gray-600">{point.englishDescription}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company History Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">{t('historyTitle')}</h2>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                  <div className="text-center mb-6 md:mb-0">
                    <div className="text-4xl font-bold text-blue-600 mb-2">2019</div>
                    <p className="text-gray-600">公司成立</p>
                  </div>
                  <div className="hidden md:block text-3xl text-gray-300">→</div>
                  <div className="text-center mb-6 md:mb-0">
                    <div className="text-4xl font-bold text-blue-600 mb-2">2021</div>
                    <p className="text-gray-600">服务客户突破100+</p>
                  </div>
                  <div className="hidden md:block text-3xl text-gray-300">→</div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">2025</div>
                    <p className="text-gray-600">技术生态持续扩展</p>
                  </div>
                </div>
                <p className="text-gray-600 text-lg">
                  {t('historyDescription')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('aboutCtaTitle')}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {t('aboutCtaDescription')}
            </p>
            <Link 
              href="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              {t('aboutCtaButton')}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}