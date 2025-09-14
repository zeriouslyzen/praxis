import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../contexts/AppContext';

const DemoPage = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your local mini-ice AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const bgColorClass = isDarkMode ? 'bg-black' : 'bg-white';
  const textColorClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColorClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColorClass = isDarkMode ? 'border-white/20' : 'border-black/20';
  const inputBgClass = isDarkMode ? 'bg-white/5' : 'bg-black/5';
  const messageBgClass = isDarkMode ? 'bg-white/10' : 'bg-black/10';
  const userMessageBgClass = isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call local mini-ice API
      const response = await fetch('http://localhost:3001/api/mini-ice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversation_history: messages.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: data.response || 'I apologize, but I couldn\'t process your request at the moment.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling mini-ice API:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting to the mini-ice API. Please make sure the local server is running.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`min-h-screen ${bgColorClass} flex flex-col`}>
      {/* Header */}
      <div className={`border-b ${borderColorClass} ${bgColorClass} backdrop-blur-sm sticky top-0 z-10`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-xl font-bold ${textColorClass} font-mono`}>
                PRAXIS Demo
              </h1>
              <p className={`text-sm ${mutedTextColorClass} font-mono`}>
                Local Mini-Ice AI Assistant
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full ${isDarkMode ? 'bg-yellow-600/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800'} text-xs font-mono`}>
              Coming Soon
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Placeholder */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto px-4"
        >
          <div className={`mb-8 p-8 rounded-3xl border ${borderColorClass} ${messageBgClass} backdrop-blur-sm`}>
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`w-20 h-20 mx-auto mb-6 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} flex items-center justify-center`}
            >
              <svg className={`w-10 h-10 ${mutedTextColorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
            
            <h2 className={`text-3xl font-bold ${textColorClass} font-mono mb-4`}>
              Demo Coming Soon
            </h2>
            
            <p className={`text-lg ${mutedTextColorClass} font-mono mb-6 leading-relaxed`}>
              We're preparing an incredible AI demonstration experience. 
              The mini-ice assistant will be available shortly with advanced 
              conversational capabilities and research integration.
            </p>
            
            <div className={`inline-flex items-center px-6 py-3 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} border ${borderColorClass}`}>
              <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-600'} mr-3 animate-pulse`}></div>
              <span className={`text-sm ${mutedTextColorClass} font-mono`}>
                Development in Progress
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className={`p-4 rounded-xl border ${borderColorClass} ${messageBgClass} backdrop-blur-sm`}>
              <h3 className={`text-sm font-semibold ${textColorClass} font-mono mb-2`}>
                AI Integration
              </h3>
              <p className={`text-xs ${mutedTextColorClass} font-mono`}>
                Advanced conversational AI with research capabilities
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${borderColorClass} ${messageBgClass} backdrop-blur-sm`}>
              <h3 className={`text-sm font-semibold ${textColorClass} font-mono mb-2`}>
                Real-time Processing
              </h3>
              <p className={`text-xs ${mutedTextColorClass} font-mono`}>
                Instant responses with local processing power
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${borderColorClass} ${messageBgClass} backdrop-blur-sm`}>
              <h3 className={`text-sm font-semibold ${textColorClass} font-mono mb-2`}>
                Research Tools
              </h3>
              <p className={`text-xs ${mutedTextColorClass} font-mono`}>
                Integrated research and development assistance
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Disabled Input Area */}
      <div className={`border-t ${borderColorClass} ${bgColorClass} backdrop-blur-sm opacity-50`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <textarea
                placeholder="Demo coming soon - input will be available shortly..."
                disabled={true}
                className={`w-full p-4 rounded-2xl border ${borderColorClass} ${inputBgClass} ${mutedTextColorClass} font-mono text-sm resize-none cursor-not-allowed opacity-50`}
                rows={1}
                style={{
                  minHeight: '56px',
                  maxHeight: '120px'
                }}
              />
            </div>
            <button
              disabled={true}
              className={`px-6 py-4 rounded-2xl font-mono text-sm font-semibold cursor-not-allowed opacity-50 ${
                isDarkMode ? 'bg-white/10 text-white/30' : 'bg-black/10 text-black/30'
              }`}
            >
              Coming Soon
            </button>
          </div>
          
          <div className="mt-3 text-center">
            <p className={`text-xs ${mutedTextColorClass} font-mono opacity-50`}>
              Demo functionality will be available in the next update
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
