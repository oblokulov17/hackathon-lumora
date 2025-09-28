import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';

const ConversationList = ({ conversations, activeConversationId, onConversationSelect, searchQuery, onSearchChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredConversations = conversations?.filter(conversation => {
    const matchesSearch = conversation?.participants?.some(p => 
      p?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    ) || conversation?.lastMessage?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'unread' && conversation?.unreadCount > 0) ||
      (selectedFilter === 'important' && conversation?.isImportant);
    
    return matchesSearch && matchesFilter;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return messageTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) {
      return messageTime?.toLocaleDateString([], { weekday: 'short' });
    } else {
      return messageTime?.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const truncateMessage = (message, maxLength = 60) => {
    if (message?.length <= maxLength) return message;
    return message?.substring(0, maxLength) + '...';
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Messages</h2>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Icon name="Plus" size={20} />
          </button>
        </div>
        
        {/* Search */}
        <Input
          type="search"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="mb-3"
        />
        
        {/* Filters */}
        <div className="flex space-x-1">
          {[
            { key: 'all', label: 'All', count: conversations?.length },
            { key: 'unread', label: 'Unread', count: conversations?.filter(c => c?.unreadCount > 0)?.length },
            { key: 'important', label: 'Important', count: conversations?.filter(c => c?.isImportant)?.length }
          ]?.map(filter => (
            <button
              key={filter?.key}
              onClick={() => setSelectedFilter(filter?.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedFilter === filter?.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {filter?.label} {filter?.count > 0 && `(${filter?.count})`}
            </button>
          ))}
        </div>
      </div>
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Icon name="MessageSquare" size={48} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No conversations found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery ? 'Try adjusting your search' : 'Start a new conversation'}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations?.map(conversation => {
              const otherParticipant = conversation?.participants?.find(p => p?.id !== 'current-user');
              const isActive = conversation?.id === activeConversationId;
              
              return (
                <div
                  key={conversation?.id}
                  onClick={() => onConversationSelect(conversation?.id)}
                  className={`relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <Image
                        src={otherParticipant?.avatar}
                        alt={otherParticipant?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {otherParticipant?.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-card rounded-full"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-medium truncate ${
                            conversation?.unreadCount > 0 ? 'text-foreground' : 'text-foreground'
                          }`}>
                            {otherParticipant?.name}
                          </h3>
                          {otherParticipant?.role && (
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              otherParticipant?.role === 'investor' ?'bg-primary/10 text-primary' :'bg-success/10 text-success'
                            }`}>
                              {otherParticipant?.role}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {conversation?.isImportant && (
                            <Icon name="Star" size={14} className="text-warning fill-current" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {formatTime(conversation?.lastMessage?.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${
                          conversation?.unreadCount > 0 
                            ? 'text-foreground font-medium' 
                            : 'text-muted-foreground'
                        }`}>
                          {conversation?.lastMessage?.sender === 'current-user' && (
                            <span className="text-muted-foreground mr-1">You: </span>
                          )}
                          {conversation?.lastMessage?.type === 'file' ? (
                            <span className="flex items-center">
                              <Icon name="Paperclip" size={12} className="mr-1" />
                              Shared a file
                            </span>
                          ) : (
                            truncateMessage(conversation?.lastMessage?.content)
                          )}
                        </p>
                        
                        {conversation?.unreadCount > 0 && (
                          <div className="flex-shrink-0 ml-2">
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary rounded-full">
                              {conversation?.unreadCount > 99 ? '99+' : conversation?.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Typing Indicator */}
                      {conversation?.isTyping && (
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <div className="flex space-x-1 mr-2">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          typing...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;