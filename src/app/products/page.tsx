'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Products() {
  const { t, language } = useLanguage();

  const products = [
    {
      title: t('product1Title'),
      englishTitle: "Cloud Resource Distribution",
      description: t('product1Description'),
      englishDescription: "Official Resource Distribution for Alibaba Cloud and Volcano Cloud: Secure, compliant, and transparent pricing"
    },
    {
      title: t('product2Title'),
      englishTitle: "NVIDIA Series GPU Servers Resale",
      description: t('product2Description'),
      englishDescription: "Resale of NVIDIA Series GPU Servers: Mainstream models like H20/L20, supporting fast delivery"
    },
    {
      title: t('product3Title'),
      englishTitle: "Resale of Domestic GPUs and GPU Servers",
      description: t('product3Description'),
      englishDescription: "Resale of Domestic GPUs and GPU Servers: Including Alibaba Pingtouge PPU, Huawei GPU, and Cambricon, etc."
    },
    {
      title: t('product4Title'),
      englishTitle: "Agent AI Orchestration Platforms",
      description: t('product4Description'),
      englishDescription: "Dify, FastGPT, Bisheng, Coze and Joyagent."
    },
    {
      title: t('product5Title'),
      englishTitle: "Agent Mainstream RPA Products",
      description: t('product5Description'),
      englishDescription: "UiPath, Yingdao, and UiBot."
    },
    {
      title: t('product6Title'),
      englishTitle: "Agent Microsoft Office and Power Platform",
      description: t('product6Description'),
      englishDescription: "Agent Microsoft Office and Power Platform."
    }
  ];

  // Partner logos
  const partners = [
    { id: 1, name: 'Alibaba', src: '/logo/alibaba.png' },
    { id: 2, name: 'Dify', src: '/logo/dify.png' },
    { id: 3, name: 'FastGPT', src: '/logo/fastgpt.png' },
    { id: 4, name: 'Huoshan', src: '/logo/huoshan.png' },
    { id: 5, name: 'Microsoft', src: '/logo/ms.png' },
    { id: 6, name: 'NVIDIA', src: '/logo/nv.png' },
    { id: 7, name: 'UiPath', src: '/logo/uipath.png' },
    { id: 8, name: 'Yingdao', src: '/logo/yingdao.png' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('productsHeroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('productsHeroDescription')}
            </p>
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-300 inline-block"
            >
              {t('productsCta')}
            </Link>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('productsTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                  {language === 'zh' ? (
                    <>
                      <h3 className="text-2xl font-bold mb-4 text-blue-600">{product.title}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold mb-4 text-blue-600">{product.englishTitle}</h3>
                      <p className="text-gray-600 mb-4">{product.englishDescription}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">{t('partnersTitle')}</h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              {t('partnersDescription')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {partners.map((partner) => (
                <div 
                  key={partner.id} 
                  className="flex items-center justify-center bg-white rounded-lg shadow-md border border-gray-200 p-6 h-32 transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={partner.src}
                      alt={`${partner.name} Logo`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw"
                      className="object-contain"
                      style={{
                        maxHeight: '80%',
                        maxWidth: '80%',
                        ...(partner.name === 'FastGPT' || partner.name === 'Yingdao' ? { 
                          transform: 'scale(1.25)',
                          transformOrigin: 'center'
                        } : {})
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('productsCtaTitle')}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {t('productsCtaDescription')}
            </p>
            <Link 
              href="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              {t('productsCtaButton')}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}