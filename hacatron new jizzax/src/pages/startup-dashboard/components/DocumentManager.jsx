import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const DocumentManager = ({ documents, onUpload, onDelete }) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (files, type) => {
    Array.from(files)?.forEach(file => {
      const fileId = Date.now() + Math.random();
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev?.[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setUploadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress?.[fileId];
                return newProgress;
              });
              onUpload({ id: fileId, name: file?.name, type, size: file?.size, uploadedAt: new Date() });
            }, 500);
            return prev;
          }
          return { ...prev, [fileId]: currentProgress + 10 };
        });
      }, 200);
    });
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setDragOver(false);
    const files = e?.dataTransfer?.files;
    handleFileUpload(files, 'general');
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
      default: return 'File';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Document Management</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="Upload">
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              onChange={(e) => handleFileUpload(e?.target?.files, 'general')}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            Upload
          </Button>
        </div>
      </div>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
          dragOver ? 'border-primary bg-primary/5' : 'border-border'
        }`}
        onDragOver={(e) => { e?.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <Icon name="Upload" size={32} className="mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
        <p className="text-xs text-muted-foreground">Supports PDF, Word, Excel, PowerPoint (Max 10MB each)</p>
      </div>
      {/* Upload Progress */}
      {Object.keys(uploadProgress)?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Uploading...</h4>
          {Object.entries(uploadProgress)?.map(([fileId, progress]) => (
            <div key={fileId} className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">File {fileId?.slice(-4)}</span>
                <span className="text-xs text-muted-foreground">{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div 
                  className="bg-primary h-1 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Document Categories */}
      <div className="space-y-6">
        {['Pitch Deck', 'Financial Statements', 'Legal Documents', 'Other']?.map(category => {
          const categoryDocs = documents?.filter(doc => doc?.category === category);
          return (
            <div key={category}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-foreground">{category}</h4>
                <span className="text-xs text-muted-foreground">{categoryDocs?.length} files</span>
              </div>
              {categoryDocs?.length > 0 ? (
                <div className="space-y-2">
                  {categoryDocs?.map(doc => (
                    <div key={doc?.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Icon name={getFileIcon(doc?.name)} size={16} className="text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{doc?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(doc?.size)} • Uploaded {doc?.uploadedAt?.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" iconName="Download" />
                        <Button variant="ghost" size="sm" iconName="Trash2" onClick={() => onDelete(doc?.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="FileX" size={24} className="mx-auto mb-2" />
                  <p className="text-sm">No {category?.toLowerCase()} uploaded yet</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentManager;