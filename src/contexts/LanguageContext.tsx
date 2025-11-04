'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  zh: {
    // Navigation
    'home': '首页',
    'solutions': '解决方案',
    'products': '产品',
    'about': '关于我们',
    'contact': '联系我们',
    
    // Language toggle
    'switchToEnglish': 'EN',
    'switchToChinese': '中文',
    
    // Homepage
    'heroTitle': '激发智能未来，赋能企业增长',
    'heroDescription': 'Haowise 为全球企业提供领先的AI自动化与智能基础设施服务。无论是RPA实施、低代码平台开发，还是AI Agent与GPU算力资源的高效配置，我们提供一站式解决方案，助您快速实现数字化转型。',
    'heroCtaPrimary': '立即咨询',
    'heroCtaSecondary': '查看方案',
    'keyPointsTitle': '我们的核心优势',
    'keyPoint1Title': '软件定制化开发',
    'keyPoint1Description': '制造业数智化解决方案',
    'keyPoint2Title': 'RPA实施支持',
    'keyPoint2Description': '支持UiPath、影刀RPA实施',
    'keyPoint3Title': '低代码服务',
    'keyPoint3Description': '基于Power Platform的低代码服务（Power Apps/Automate/BI）',
    'keyPoint4Title': 'AI Agent开发',
    'keyPoint4Description': '企业级AI Agent与RPA+Agent融合开发',
    'keyPoint5Title': 'GPU资源分销',
    'keyPoint5Description': 'AI软件产品以及高可扩展GPU资源分销（NVIDIA & 阿里云GPU）',
    'keyPoint6Title': '智能基础设施',
    'keyPoint6Description': '专为AI训练与推理场景设计的高性能基础设施',
    'ctaTitle': '准备好开启智能转型之旅？',
    'ctaDescription': '联系我们的专家团队，获取专属解决方案',
    'ctaButton': '联系我们',
    
    // Solutions page
    'solutionsHeroTitle': '融合AI与自动化，打造企业智能引擎',
    'solutionsHeroDescription': '我们针对不同行业痛点，提供模块化、可扩展的AI解决方案，帮助企业实现流程数字化、决策智能化和运营自动化。',
    'solutionsCta': '立即咨询',
    'solutionsTitle': '我们的解决方案',
    'solution1Title': '软件系统定制开发',
    'solution1Description': '深刻理解制造业know-how和业务痛点，擅长制造业专业解决方案及工业软件的定制开发，比如MES、WMS、TMS、OMS等系统。',
    'solution2Title': 'AI Agent系统集成开发',
    'solution2Description': '通过Dify / FastGPT / Coze / n8n 等AI编排平台构建智能工作流，开箱即用智能体，定制开发智能体以及系统集成服务',
    'solution3Title': '机器视觉工业质检',
    'solution3Description': '工业品的CV缺陷检测，从算法选型到模型部署，物体检测、图像分割技术，无监督异常检测算法等综合应用',
    'solution4Title': 'RPA+AI自动化实施',
    'solution4Description': '高效替代重复人工操作，提升流程效率30%以上，UiPath Power Automate，国产Uibot和影刀RPA工具实施开发',
    'solution5Title': '低代码平台开发',
    'solution5Description': '基于微软Power Platform的快速构建业务应用，缩短交付周期50%',
    'solution6Title': '多云资源协同',
    'solution6Description': '整合阿里云、火山云等资源，实现弹性调度',
    'solutionsCtaTitle': '寻找适合您业务的解决方案？',
    'solutionsCtaDescription': '联系我们的专家团队，获取专属解决方案建议',
    'solutionsCtaButton': '联系我们',
    
    // Products page
    'productsHeroTitle': '高效、稳定、可扩展的AI基础设施产品',
    'productsHeroDescription': '我们提供高品质的云资源与GPU硬件服务，专为AI训练与推理场景设计，满足企业对性能与成本的双重需求。',
    'productsCta': '查看产品详情',
    'productsTitle': '我们的产品',
    'product1Title': '云资源分销',
    'product1Description': '阿里云、火山云官方资源分销：安全合规，价格透明',
    'product2Title': 'NVIDIA系列GPU服务器转售',
    'product2Description': 'NVIDIA系列GPU服务器转售：H20/L20等主流型号，支持快速交付',
    'product3Title': '国产GPU及GPU服务器的转手',
    'product3Description': '国产GPU及GPU服务器的转手：包含阿里平头哥PPU、华为GPU和寒武纪等',
    'product4Title': '代理AI 编排平台',
    'product4Description': 'dify, FastGPT, Bisheng, Coze, Joyagent',
    'product5Title': '代理主流RPA产品',
    'product5Description': 'UiPath 、影刀和Uibot。',
    'product6Title': '代理微软Office和Power Platform',
    'product6Description': '代理微软Office和Power Platform。',
    'productsCtaTitle': '需要定制化AI基础设施解决方案？',
    'productsCtaDescription': '联系我们的技术专家，获取专属产品配置建议',
    'productsCtaButton': '联系我们',
    'partnersTitle': '合作伙伴',
    'partnersDescription': '我们与行业领先的技术公司合作，共同为客户提供最佳解决方案。',
    
    // About page
    'aboutHeroTitle': '我们是谁？—— 以技术驱动企业智能升级',
    'aboutHeroDescription': 'Haowise 成立于2019年，由一支拥有多年AI与企业数字化经验的技术团队创立。我们致力于通过AI自动化与智能基础设施服务，帮助企业跨越技术门槛，实现业务飞轮增长。',
    'aboutCta': '联系我们',
    'aboutTitle': '关于Haowise',
    'aboutPoint1Title': '核心团队',
    'aboutPoint1Description': '核心团队来自阿里云、微软、英迈中国等头部科技公司',
    'aboutPoint2Title': '客户覆盖',
    'aboutPoint2Description': '服务客户涵盖金融、制造、零售、教育等行业',
    'aboutPoint3Title': '技术投入',
    'aboutPoint3Description': '持续投入AI与RPA技术生态建设',
    'aboutPoint4Title': '本地化支持',
    'aboutPoint4Description': '本地化支持团队：中文 + 英文双语服务响应',
    'aboutPoint5Title': '合规标准',
    'aboutPoint5Description': '严格遵守数据安全与合规标准（GDPR, 中国网络安全法）',
    'historyTitle': '我们的历程',
    'historyDescription': '从初创团队到行业领先的技术服务商，我们始终坚持以技术创新为客户创造价值。',
    'aboutCtaTitle': '期待与您合作',
    'aboutCtaDescription': '联系我们，开启您的智能转型之旅',
    'aboutCtaButton': '联系我们',
    
    // Contact page
    'contactHeroTitle': '联系我们',
    'contactHeroDescription': '我们期待与您合作，共同探索AI技术的无限可能',
    'contactInfoTitle': '联系信息',
    'contactInfoAddress': '地址',
    'contactInfoEmail': '邮箱',
    'contactInfoPhone': '电话',
    'contactInfoHours': '办公时间',
    'contactFormTitle': '发送消息',
    'contactFormName': '姓名',
    'contactFormEmail': '邮箱',
    'contactFormCompany': '公司',
    'contactFormMessage': '消息',
    'contactFormSubmit': '发送消息',
    'contactFormNamePlaceholder': '请输入您的姓名',
    'contactFormEmailPlaceholder': '请输入您的邮箱',
    'contactFormCompanyPlaceholder': '请输入您的公司名称',
    'contactFormMessagePlaceholder': '请输入您的消息'
  },
  en: {
    // Navigation
    'home': 'Home',
    'solutions': 'Solutions',
    'products': 'Products',
    'about': 'About Us',
    'contact': 'Contact',
    
    // Language toggle
    'switchToEnglish': 'EN',
    'switchToChinese': '中文',
    
    // Homepage
    'heroTitle': 'Inspire Intelligent Future, Empower Business Growth',
    'heroDescription': 'Haowise provides leading AI automation and intelligent infrastructure services to global enterprises. Whether it\'s RPA implementation, low-code platform development, or efficient configuration of AI Agents and GPU computing resources, we offer a one-stop solution to help you achieve rapid digital transformation.',
    'heroCtaPrimary': 'Contact Us Now',
    'heroCtaSecondary': 'View Solutions',
    'keyPointsTitle': 'Our Core Advantages',
    'keyPoint1Title': 'Software Custom Development',
    'keyPoint1Description': 'Digital and Intelligent Solutions for Manufacturing',
    'keyPoint2Title': 'RPA Implementation Support',
    'keyPoint2Description': 'UiPath and Yingdao RPA implementation support',
    'keyPoint3Title': 'Low-Code Services',
    'keyPoint3Description': 'Low-code services based on Power Platform (Power Apps/Automate/BI)',
    'keyPoint4Title': 'AI Agent Development',
    'keyPoint4Description': 'Enterprise-grade AI Agent and RPA+Agent integrated development',
    'keyPoint5Title': 'GPU Resource Distribution',
    'keyPoint5Description': 'AI software products and high-scalability GPU resource distribution (NVIDIA & Alibaba Cloud GPU)',
    'keyPoint6Title': 'Intelligent Infrastructure',
    'keyPoint6Description': 'High-performance infrastructure designed for AI training and inference scenarios',
    'ctaTitle': 'Ready to Start Your Intelligent Transformation Journey?',
    'ctaDescription': 'Contact our expert team for customized solutions',
    'ctaButton': 'Contact Us',
    
    // Solutions page
    'solutionsHeroTitle': 'Integrating AI and Automation to Build Enterprise Intelligence Engines',
    'solutionsHeroDescription': 'We provide modular, scalable AI solutions targeting industry pain points, helping enterprises achieve process digitization, intelligent decision-making, and operational automation.',
    'solutionsCta': 'Contact Us Now',
    'solutionsTitle': 'Our Solutions',
    'solution1Title': 'Custom Software System Development',
    'solution1Description': 'Deeply understand manufacturing expertise and business pain points, proficient in custom development of manufacturing software systems such as MES, WMS, TMS, OMS, etc.',
    'solution2Title': 'AI Agent System Integration Development',
    'solution2Description': 'Building intelligent workflows through AI orchestration platforms like Dify / FastGPT / Coze / n8n, offering out-of-the-box agents, custom agent development, and system integration services',
    'solution3Title': 'Machine Vision Industrial Quality Inspection',
    'solution3Description': 'CV defect detection for industrial products, comprehensive application from algorithm selection to model deployment, including object detection, image segmentation technologies, and unsupervised anomaly detection algorithms',
    'solution4Title': 'RPA+AI Automation Implementation',
    'solution4Description': 'Efficiently replacing repetitive manual operations, improving process efficiency by over 30%, with implementation and development using UiPath, Power Automate, domestic Uibot, and Yingdao RPA tools',
    'solution5Title': 'Low-Code Platform Development',
    'solution5Description': 'Rapid business application building based on Microsoft Power Platform, reducing delivery cycles by 50%',
    'solution6Title': 'Multi-Cloud Resource Coordination',
    'solution6Description': 'Integrating resources from Alibaba Cloud, Volcano Cloud, and others to achieve elastic scheduling',
    'solutionsCtaTitle': 'Looking for solutions tailored to your business?',
    'solutionsCtaDescription': 'Contact our experts for customized solution recommendations',
    'solutionsCtaButton': 'Contact Us',
    
    // Products page
    'productsHeroTitle': 'Efficient, Stable, and Scalable AI Infrastructure Products',
    'productsHeroDescription': 'We provide high-quality cloud resources and GPU hardware services, specifically designed for AI training and inference scenarios, meeting enterprises\' dual requirements for performance and cost.',
    'productsCta': 'View Product Details',
    'productsTitle': 'Our Products',
    'product1Title': 'Cloud Resource Distribution',
    'product1Description': 'Official Resource Distribution for Alibaba Cloud and Volcano Cloud: Secure, compliant, and transparent pricing',
    'product2Title': 'NVIDIA Series GPU Servers Resale',
    'product2Description': 'Resale of NVIDIA Series GPU Servers: Mainstream models like H20/L20, supporting fast delivery',
    'product3Title': 'Resale of Domestic GPUs and GPU Servers',
    'product3Description': 'Resale of Domestic GPUs and GPU Servers: Including Alibaba Pingtouge PPU, Huawei GPU, and Cambricon, etc.',
    'product4Title': 'Agent AI Orchestration Platforms',
    'product4Description': 'Dify, FastGPT, Bisheng, Coze and Joyagent.',
    'product5Title': 'Agent Mainstream RPA Products',
    'product5Description': 'UiPath, Yingdao, and UiBot.',
    'product6Title': 'Agent Microsoft Office and Power Platform',
    'product6Description': 'Agent Microsoft Office and Power Platform.',
    'productsCtaTitle': 'Need customized AI infrastructure solutions?',
    'productsCtaDescription': 'Contact our technical experts for personalized product configuration advice',
    'productsCtaButton': 'Contact Us',
    'partnersTitle': 'Partners',
    'partnersDescription': 'We collaborate with leading technology companies to provide the best solutions for our customers.',
    
    // About page
    'aboutHeroTitle': 'Who Are We? — Driving Enterprise Intelligence Upgrade Through Technology',
    'aboutHeroDescription': 'Haowise was founded in 2019 by a technical team with years of experience in AI and enterprise digitalization. We are committed to helping enterprises overcome technological barriers and achieve business flywheel growth through AI automation and intelligent infrastructure services.',
    'aboutCta': 'Contact Us',
    'aboutTitle': 'About Haowise',
    'aboutPoint1Title': 'Core Team',
    'aboutPoint1Description': 'The core team comes from top technology companies such as Alibaba Cloud, Microsoft, and IngramMicro China.',
    'aboutPoint2Title': 'Client Coverage',
    'aboutPoint2Description': 'Serving clients across industries such as finance, manufacturing, retail, and education',
    'aboutPoint3Title': 'Technology Investment',
    'aboutPoint3Description': 'Continuous investment in AI and RPA technology ecosystem development',
    'aboutPoint4Title': 'Localized Support',
    'aboutPoint4Description': 'Localized support team: Bilingual service response in Chinese and English',
    'aboutPoint5Title': 'Compliance Standards',
    'aboutPoint5Description': 'Strict compliance with data security and regulatory standards (GDPR, China Cybersecurity Law)',
    'historyTitle': 'Our Journey',
    'historyDescription': 'From a startup team to an industry-leading technology service provider, we have always insisted on creating value for customers through technological innovation.',
    'aboutCtaTitle': 'Looking forward to working with you',
    'aboutCtaDescription': 'Contact us to start your intelligent transformation journey',
    'aboutCtaButton': 'Contact Us',
    
    // Contact page
    'contactHeroTitle': 'Contact Us',
    'contactHeroDescription': 'We look forward to collaborating with you to explore the infinite possibilities of AI technology',
    'contactInfoTitle': 'Contact Information',
    'contactInfoAddress': 'Address',
    'contactInfoEmail': 'Email',
    'contactInfoPhone': 'Phone',
    'contactInfoHours': 'Office Hours',
    'contactFormTitle': 'Send Message',
    'contactFormName': 'Name',
    'contactFormEmail': 'Email',
    'contactFormCompany': 'Company',
    'contactFormMessage': 'Message',
    'contactFormSubmit': 'Send Message',
    'contactFormNamePlaceholder': 'Please enter your name',
    'contactFormEmailPlaceholder': 'Please enter your email',
    'contactFormCompanyPlaceholder': 'Please enter your company name',
    'contactFormMessagePlaceholder': 'Please enter your message'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  useEffect(() => {
    const savedLanguage = (localStorage.getItem('language') as Language) || 'zh';
    setLanguage(savedLanguage);
  }, []);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};