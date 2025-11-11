'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('contactFormName') + '是必填项';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contactFormEmail') + '是必填项';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contactFormMessage') + '是必填项';
    }
    
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('contactHeroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('contactHeroDescription')}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div>
                  <h2 className="text-3xl font-bold mb-6">{t('contactInfoTitle')}</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{t('contactInfoAddress')}</h3>
                      <p className="text-gray-600">{t('contactInfoAddressValue')}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{t('contactInfoEmail')}</h3>
                      <p className="text-gray-600">zhen.sun@wxhzch.com</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{t('contactInfoPhone')}</h3>
                      <p className="text-gray-600">+86 180 0152 1283</p>
                    </div>
                  </div>

                  <div className="mt-12">
                    <h3 className="text-xl font-semibold mb-4">{t('contactInfoHours')}</h3>
                    <div className="text-gray-600 whitespace-pre-line">{t('contactInfoHoursValue')}</div>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div>
                  <h2 className="text-3xl font-bold mb-6">{t('contactFormTitle')}</h2>
                  {submitSuccess ? (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                      <p>感谢您的消息！我们将尽快与您联系。</p>
                    </div>
                  ) : null}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">{t('contactFormName')} *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        placeholder={t('contactFormNamePlaceholder')}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">{t('contactFormEmail')} *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        placeholder={t('contactFormEmailPlaceholder')}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-gray-700 font-medium mb-2">{t('contactFormCompany')}</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('contactFormCompanyPlaceholder')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">{t('contactFormMessage')} *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        placeholder={t('contactFormMessagePlaceholder')}
                      ></textarea>
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
                      }`}
                    >
                      {isSubmitting ? '发送中...' : t('contactFormSubmit')}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}