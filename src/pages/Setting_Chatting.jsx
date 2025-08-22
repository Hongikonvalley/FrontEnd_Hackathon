import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header.jsx';

const SettingChatting = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '안녕하세요! more;ing 서비스에 대해 궁금한 점이 있으신가요?',
      sender: 'dev',
    },
    {
      id: 2,
      text: '네, 제가 작성한 리뷰는 어디서 볼 수 있나요?',
      sender: 'me',
    },
    {
      id: 3,
      text: '마이페이지 > 나의 리뷰 모아보기에서 확인하실 수 있습니다. 😄',
      sender: 'dev',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const userMessage = { id: Date.now(), text: newMessage, sender: 'me' };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setTimeout(() => {
      const devResponse = {
        id: Date.now() + 1,
        text: '확인 중입니다. 잠시만 기다려주세요...',
        sender: 'dev',
      };
      setMessages((prev) => [...prev, devResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen font-sans">
      <Header title="지원팀과 채팅하기" showBack={true} />
      <h1 className="text-2xl font-bold text-center my-4">지원팀과 채팅하기</h1>
      <div className="flex-grow p-4 overflow-y-auto pt-20 pb-24">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`relative max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === 'me'
                    ? 'bg-gray-200 text-gray-800 bubble-left'
                    : 'bg-primary text-white bubble-right'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      <div className="p-4 bg-white border-t fixed bottom-0 w-full">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            // 1. onKeyPress -> onKeyDown으로 변경
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="메시지를 입력하세요..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSendMessage}
            // 2. whitespace-nowrap 추가
            className="ml-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-secondary whitespace-nowrap"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingChatting;
