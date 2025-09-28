import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ConversationList from './components/ConversationList';
import ChatArea from './components/ChatArea';
import ProfileSidebar from './components/ProfileSidebar';
import Icon from '../../components/AppIcon';

const MessagingCenter = () => {
  const navigate = useNavigate();
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);

  // Mock current user
  const currentUserId = 'current-user';

  // Mock conversations data
  const [conversations, setConversations] = useState([
    {
      id: 'conv-1',
      participants: [
        {
          id: 'current-user',
          name: 'You',
          role: 'investor',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          isOnline: true,
          email: 'investor@example.com'
        },
        {
          id: 'user-1',
          name: 'Sarah Chen',
          role: 'startup',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          isOnline: true,
          email: 'sarah@techflow.com'
        }
      ],
      lastMessage: {
        id: 'msg-1',
        sender: 'user-1',
        content: 'Thanks for reviewing our pitch deck. When would be a good time to discuss the Series A round?',
        timestamp: new Date(Date.now() - 300000),
        type: 'text',
        status: 'delivered'
      },
      unreadCount: 2,
      isImportant: true,
      isTyping: false,
      messages: [
        {
          id: 'msg-1',
          sender: 'current-user',
          content: 'Hi Sarah, I\'ve reviewed your pitch deck and I\'m impressed with the traction you\'ve shown. The 40% month-over-month growth is particularly compelling.',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text',
          status: 'read'
        },
        {
          id: 'msg-2',
          sender: 'user-1',
          content: 'Thank you! We\'re excited about the momentum we\'ve built. Our customer acquisition cost has also decreased by 25% in the last quarter.',
          timestamp: new Date(Date.now() - 3300000),
          type: 'text',
          status: 'delivered'
        },
        {
          id: 'msg-3',
          sender: 'current-user',
          content: 'That\'s excellent. I\'d like to dive deeper into your unit economics. Could you share your latest financial model?',
          timestamp: new Date(Date.now() - 3000000),
          type: 'text',
          status: 'read'
        },
        {
          id: 'msg-4',
          sender: 'user-1',
          content: '',
          timestamp: new Date(Date.now() - 2700000),
          type: 'file',
          fileName: 'TechFlow_Financial_Model_Q4.xlsx',
          fileSize: 2048576,
          status: 'delivered'
        },
        {
          id: 'msg-5',
          sender: 'user-1',
          content: 'Thanks for reviewing our pitch deck. When would be a good time to discuss the Series A round?',
          timestamp: new Date(Date.now() - 300000),
          type: 'text',
          status: 'delivered'
        }
      ]
    },
    {
      id: 'conv-2',
      participants: [
        {
          id: 'current-user',
          name: 'You',
          role: 'investor',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          isOnline: true,
          email: 'investor@example.com'
        },
        {
          id: 'user-2',
          name: 'Michael Rodriguez',
          role: 'startup',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          isOnline: false,
          email: 'michael@aianalytics.com'
        }
      ],
      lastMessage: {
        id: 'msg-6',
        sender: 'current-user',
        content: 'I\'ll review the due diligence materials and get back to you by Friday.',
        timestamp: new Date(Date.now() - 86400000),
        type: 'text',
        status: 'read'
      },
      unreadCount: 0,
      isImportant: false,
      isTyping: false,
      messages: [
        {
          id: 'msg-6',
          sender: 'user-2',
          content: 'Hi! I wanted to follow up on our conversation about the AI analytics platform. We\'ve made significant progress on the product roadmap.',
          timestamp: new Date(Date.now() - 172800000),
          type: 'text',
          status: 'read'
        },
        {
          id: 'msg-7',
          sender: 'current-user',
          content: 'That\'s great to hear. What specific milestones have you achieved?',
          timestamp: new Date(Date.now() - 172500000),
          type: 'text',
          status: 'read'
        },
        {
          id: 'msg-8',
          sender: 'user-2',
          content: 'We\'ve completed the MVP and signed our first 3 enterprise clients. ARR is now at $150K with strong pipeline.',
          timestamp: new Date(Date.now() - 172200000),
          type: 'text',
          status: 'read'
        },
        {
          id: 'msg-9',
          sender: 'current-user',
          content: 'I\'ll review the due diligence materials and get back to you by Friday.',
          timestamp: new Date(Date.now() - 86400000),
          type: 'text',
          status: 'read'
        }
      ]
    },
    {
      id: 'conv-3',
      participants: [
        {
          id: 'current-user',
          name: 'You',
          role: 'investor',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          isOnline: true,
          email: 'investor@example.com'
        },
        {
          id: 'user-3',
          name: 'Emily Watson',
          role: 'investor',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          isOnline: true,
          email: 'emily@vcpartners.com'
        }
      ],
      lastMessage: {
        id: 'msg-10',
        sender: 'user-3',
        content: 'The fintech deal looks promising. Want to co-invest?',
        timestamp: new Date(Date.now() - 7200000),
        type: 'text',
        status: 'delivered'
      },
      unreadCount: 1,
      isImportant: false,
      isTyping: true,
      messages: [
        {
          id: 'msg-10',
          sender: 'user-3',
          content: 'Hey! I wanted to discuss the fintech startup we both looked at last week.',
          timestamp: new Date(Date.now() - 14400000),
          type: 'text',
          status: 'read'
        },
        {
          id: 'msg-11',
          sender: 'current-user',
          content: 'Yes, PayFlow right? I thought their B2B payments solution was interesting.',
          timestamp: new Date(Date.now() - 14100000),
          type: 'text',
          status: 'read'
        },
        {
          id: 'msg-12',
          sender: 'user-3',
          content: 'Exactly! They just closed a $500K seed round and are looking for Series A lead. The metrics are solid.',
          timestamp: new Date(Date.now() - 13800000),
          type: 'text',
          status: 'read'
        },
        {
          id: 'msg-13',
          sender: 'user-3',
          content: 'The fintech deal looks promising. Want to co-invest?',
          timestamp: new Date(Date.now() - 7200000),
          type: 'text',
          status: 'delivered'
        }
      ]
    }
  ]);

  // Check for mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Set initial active conversation
  useEffect(() => {
    if (conversations?.length > 0 && !activeConversationId) {
      setActiveConversationId(conversations?.[0]?.id);
    }
  }, [conversations, activeConversationId]);

  const activeConversation = conversations?.find(conv => conv?.id === activeConversationId);
  const activeParticipant = activeConversation?.participants?.find(p => p?.id !== currentUserId);

  const handleConversationSelect = (conversationId) => {
    setActiveConversationId(conversationId);
    
    // Mark messages as read
    setConversations(prev => prev?.map(conv => 
      conv?.id === conversationId 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));

    // On mobile, hide conversation list when selecting a chat
    if (isMobileView) {
      setShowConversationList(false);
    }
  };

  const handleSendMessage = (content) => {
    if (!activeConversationId) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: currentUserId,
      content,
      timestamp: new Date(),
      type: 'text',
      status: 'sent'
    };

    setConversations(prev => prev?.map(conv => 
      conv?.id === activeConversationId
        ? {
            ...conv,
            messages: [...conv?.messages, newMessage],
            lastMessage: newMessage
          }
        : conv
    ));

    // Simulate message delivery
    setTimeout(() => {
      setConversations(prev => prev?.map(conv => 
        conv?.id === activeConversationId
          ? {
              ...conv,
              messages: conv?.messages?.map(msg => 
                msg?.id === newMessage?.id 
                  ? { ...msg, status: 'delivered' }
                  : msg
              )
            }
          : conv
      ));
    }, 1000);
  };

  const handleFileUpload = (file) => {
    if (!activeConversationId) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: currentUserId,
      content: '',
      timestamp: new Date(),
      type: 'file',
      fileName: file?.name,
      fileSize: file?.size,
      status: 'sent'
    };

    setConversations(prev => prev?.map(conv => 
      conv?.id === activeConversationId
        ? {
            ...conv,
            messages: [...conv?.messages, newMessage],
            lastMessage: { ...newMessage, content: `Shared ${file?.name}` }
          }
        : conv
    ));
  };

  const handleViewProfile = () => {
    if (activeParticipant?.role === 'startup') {
      navigate('/startup-profile');
    } else {
      // Navigate to investor profile or show modal
      console.log('View investor profile');
    }
  };

  const handleScheduleMeeting = () => {
    console.log('Schedule meeting');
    // Implement meeting scheduling logic
  };

  const handleShareReport = () => {
    navigate('/ai-due-diligence-report');
  };

  const handleBackToConversations = () => {
    setShowConversationList(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="investor" notifications={3} onRoleSwitch={() => {}} />
      
      <div className="pt-16 h-screen flex">
        {/* Mobile Back Button */}
        {isMobileView && !showConversationList && (
          <div className="absolute top-20 left-4 z-10">
            <button
              onClick={handleBackToConversations}
              className="p-2 bg-card border border-border rounded-lg shadow-sm"
            >
              <Icon name="ArrowLeft" size={20} />
            </button>
          </div>
        )}

        {/* Conversation List */}
        <div className={`${
          isMobileView 
            ? showConversationList ? 'w-full' : 'hidden' :'w-80 flex-shrink-0'
        }`}>
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            onConversationSelect={handleConversationSelect}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Chat Area */}
        <div className={`flex-1 ${
          isMobileView && showConversationList ? 'hidden' : 'flex'
        }`}>
          <ChatArea
            conversation={activeConversation}
            currentUserId={currentUserId}
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
          />
          
          {/* Profile Sidebar Toggle */}
          {activeConversation && !isMobileView && (
            <div className="flex items-center">
              <button
                onClick={() => setIsProfileSidebarOpen(!isProfileSidebarOpen)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name={isProfileSidebarOpen ? 'ChevronRight' : 'ChevronLeft'} size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Profile Sidebar */}
        {!isMobileView && (
          <ProfileSidebar
            participant={activeParticipant}
            isOpen={isProfileSidebarOpen}
            onClose={() => setIsProfileSidebarOpen(false)}
            onViewProfile={handleViewProfile}
            onScheduleMeeting={handleScheduleMeeting}
            onShareReport={handleShareReport}
          />
        )}
      </div>
    </div>
  );
};

export default MessagingCenter;