import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatArea = ({ conversation, currentUserId, onSendMessage, onFileUpload }) => {
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (message?.trim()) {
      onSendMessage(message?.trim());
      setMessage('');
    }
  };

  const handleFileSelect = async (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate file upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            onFileUpload(file);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return 'FileText';
      case 'doc': case'docx': return 'FileText';
      case 'xls': case'xlsx': return 'Sheet';
      case 'ppt': case'pptx': return 'Presentation';
      case 'jpg': case'jpeg': case'png': case'gif': return 'Image';
      default: return 'File';
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="MessageSquare" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a conversation</h3>
          <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
        </div>
      </div>
    );
  }

  const otherParticipant = conversation?.participants?.find(p => p?.id !== currentUserId);

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center space-x-3">
          <Image
            src={otherParticipant?.avatar}
            alt={otherParticipant?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-foreground">{otherParticipant?.name}</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                otherParticipant?.isOnline ? 'bg-success' : 'bg-muted-foreground'
              }`}></div>
              <span className="text-sm text-muted-foreground">
                {otherParticipant?.isOnline ? 'Online' : 'Offline'}
              </span>
              {otherParticipant?.role && (
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  otherParticipant?.role === 'investor' ?'bg-primary/10 text-primary' :'bg-success/10 text-success'
                }`}>
                  {otherParticipant?.role}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Phone">
            Call
          </Button>
          <Button variant="ghost" size="sm" iconName="Video">
            Video
          </Button>
          <Button variant="ghost" size="sm" iconName="MoreVertical" />
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation?.messages?.map((msg, index) => {
          const isCurrentUser = msg?.sender === currentUserId;
          const showAvatar = index === 0 || conversation?.messages?.[index - 1]?.sender !== msg?.sender;
          
          return (
            <div
              key={msg?.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {showAvatar && !isCurrentUser && (
                  <Image
                    src={otherParticipant?.avatar}
                    alt={otherParticipant?.name}
                    className="w-8 h-8 rounded-full object-cover mr-2 mt-1"
                  />
                )}
                {showAvatar && isCurrentUser && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-2 mt-1">
                    <span className="text-xs font-medium text-primary-foreground">You</span>
                  </div>
                )}
                {!showAvatar && <div className="w-10"></div>}

                {/* Message Bubble */}
                <div className={`px-4 py-2 rounded-2xl ${
                  isCurrentUser 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card border border-border text-foreground'
                }`}>
                  {msg?.type === 'text' && (
                    <p className="text-sm whitespace-pre-wrap">{msg?.content}</p>
                  )}
                  
                  {msg?.type === 'file' && (
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isCurrentUser ? 'bg-primary-foreground/20' : 'bg-muted'
                      }`}>
                        <Icon 
                          name={getFileIcon(msg?.fileName)} 
                          size={20} 
                          className={isCurrentUser ? 'text-primary-foreground' : 'text-foreground'}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{msg?.fileName}</p>
                        <p className={`text-xs ${
                          isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {formatFileSize(msg?.fileSize)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        className={isCurrentUser ? 'text-primary-foreground hover:bg-primary-foreground/20' : ''}
                      />
                    </div>
                  )}
                  
                  <div className={`flex items-center justify-between mt-1 ${
                    isCurrentUser ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <span className={`text-xs ${
                      isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {formatTime(msg?.timestamp)}
                    </span>
                    {isCurrentUser && (
                      <div className="flex items-center space-x-1 ml-2">
                        <Icon 
                          name={msg?.status === 'read' ? 'CheckCheck' : 'Check'} 
                          size={12} 
                          className={`${
                            msg?.status === 'read' ? 'text-primary-foreground' : 'text-primary-foreground/70'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Typing Indicator */}
        {conversation?.isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <Image
                src={otherParticipant?.avatar}
                alt={otherParticipant?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="bg-card border border-border px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      {/* Upload Progress */}
      {isUploading && (
        <div className="px-4 py-2 border-t border-border bg-card">
          <div className="flex items-center space-x-3">
            <Icon name="Upload" size={16} className="text-primary" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground">Uploading file...</span>
                <span className="text-xs text-muted-foreground">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                iconName="Paperclip"
                onClick={() => fileInputRef?.current?.click()}
                disabled={isUploading}
              >
                Attach
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                iconName="FileText"
              >
                Share Report
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                iconName="Calendar"
              >
                Schedule
              </Button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-input border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              rows={3}
              onKeyDown={(e) => {
                if (e?.key === 'Enter' && !e?.shiftKey) {
                  e?.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
          </div>
          <Button
            type="submit"
            disabled={!message?.trim() || isUploading}
            iconName="Send"
            className="mb-0"
          >
            Send
          </Button>
        </form>
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
        />
      </div>
    </div>
  );
};

export default ChatArea;
