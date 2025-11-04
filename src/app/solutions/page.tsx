'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Solutions() {
  const { t, language } = useLanguage();

  const solutions = [
    {
      title: t('solution1Title'),
      englishTitle: "Custom Software System Development",
      description: t('solution1Description'),
      englishDescription: "Deeply understand manufacturing expertise and business pain points, proficient in custom development of manufacturing software systems such as MES, WMS, TMS, OMS, etc."
    },
    {
      title: t('solution2Title'),
      englishTitle: "AI Agent System Integration Development",
      description: t('solution2Description'),
      englishDescription: "Building intelligent workflows through AI orchestration platforms like Dify / FastGPT / Coze / n8n, offering out-of-the-box agents, custom agent development, and system integration services"
    },
    {
      title: t('solution3Title'),
      englishTitle: "Machine Vision Industrial Quality Inspection",
      description: t('solution3Description'),
      englishDescription: "CV defect detection for industrial products, comprehensive application from algorithm selection to model deployment, including object detection, image segmentation technologies, and unsupervised anomaly detection algorithms"
    },
    {
      title: t('solution4Title'),
      englishTitle: "RPA+AI Automation Implementation",
      description: t('solution4Description'),
      englishDescription: "Efficiently replacing repetitive manual operations, improving process efficiency by over 30%, with implementation and development using UiPath, Power Automate, domestic Uibot, and Yingdao RPA tools"
    },
    {
      title: t('solution5Title'),
      englishTitle: "Low-Code Platform Development",
      description: t('solution5Description'),
      englishDescription: "Rapid business application building based on Microsoft Power Platform, reducing delivery cycles by 50%"
    },
    {
      title: t('solution6Title'),
      englishTitle: "Multi-Cloud Resource Coordination",
      description: t('solution6Description'),
      englishDescription: "Integrating resources from Alibaba Cloud, Volcano Cloud, and others to achieve elastic scheduling"
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
              {t('solutionsHeroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('solutionsHeroDescription')}
            </p>
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-300 inline-block"
            >
              {t('solutionsCta')}
            </Link>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('solutionsTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  {language === 'zh' ? (
                    <>
                      <h3 className="text-2xl font-bold mb-4 text-blue-600">{solution.title}</h3>
                      <p className="text-gray-600 mb-4">{solution.description}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold mb-4 text-blue-600">{solution.englishTitle}</h3>
                      <p className="text-gray-600 mb-4">{solution.englishDescription}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('solutionsCtaTitle')}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {t('solutionsCtaDescription')}
            </p>
            <Link 
              href="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              {t('solutionsCtaButton')}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}