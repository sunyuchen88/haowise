'use client';

import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: '你好！有什么可以帮助你的吗？', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_KEY = 'openapi-yyEpGvTnrwsCf2FGGIrw0we8jmCBj2otnPSbzSf8qF4Ka8a8WljdE';
  const API_URL = 'https://fastgpt-pro.aibus88.com/api/v1/chat/completions';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const conversationHistory = [...messages, userMessage].map(msg => ({
      role: msg.sender === 'bot' ? 'assistant' : 'user',
      content: msg.text
    }));

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          messages: conversationHistory,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullResponse = '';
      const botMessageId = Date.now() + 1;

      setMessages(prev => [...prev, { id: botMessageId, text: '', sender: 'bot' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.substring(6);
            if (dataStr === '[DONE]') {
              break;
            }
            try {
              const data = JSON.parse(dataStr);
              if (data.choices && data.choices[0].delta.content) {
                fullResponse += data.choices[0].delta.content;
                setMessages(prev => prev.map(msg => 
                  msg.id === botMessageId ? { ...msg, text: fullResponse } : msg
                ));
              }
            } catch (err) {
              console.error('Error parsing stream data:', err);
            }
          }
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessages(prev => [...prev, { id: Date.now(), text: '抱歉，连接时出现错误。', sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
        aria-label="打开聊天助手"
      >
        +
      </button>
    );
  }

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999999,
        width: '400px',
        height: '600px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white'
      }}
    >
      <div 
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '15px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          height: '60px',
          boxSizing: 'border-box'
        }}
      >
        <span>Haowise 智能助手</span>
        <div>
          <button
            onClick={() => setIsMinimized(true)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '0',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: '0'
            }}
            aria-label="最小化"
          >
            −
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <div 
          style={{
            flexGrow: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                padding: '10px 15px',
                borderRadius: '8px',
                maxWidth: '80%',
                lineHeight: 1.5,
                wordWrap: 'break-word',
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: message.sender === 'user' ? '#007bff' : '#f1f1f1',
                color: message.sender === 'user' ? '#fff' : '#333'
              }}
            >
              {message.text}
            </div>
          ))}
          {isTyping && <div style={{ color: '#999', fontStyle: 'italic', alignSelf: 'flex-start' }}>正在输入...</div>}
          <div ref={messagesEndRef} />
        </div>

        <form 
          onSubmit={handleSend}
          style={{
            display: 'flex',
            padding: '15px',
            borderTop: '1px solid #ddd',
            flexShrink: 0
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入消息..."
            style={{
              flexGrow: 1,
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              fontSize: '14px',
              marginRight: '10px'
            }}
            disabled={isTyping}
            aria-label="输入消息"
          />
          <button
            type="submit"
            style={{
              border: 'none',
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '10px 15px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            disabled={isTyping}
            aria-label="发送消息"
          >
            发送
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
