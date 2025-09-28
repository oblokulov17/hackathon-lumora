import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileSidebar = ({ participant, isOpen, onClose, onViewProfile, onScheduleMeeting, onShareReport }) => {
  if (!isOpen || !participant) return null;

  const mockCompanyData = {
    name: "TechFlow Solutions",
    industry: "SaaS",
    stage: "Series A",
    valuation: "$15M",
    employees: "25-50",
    location: "San Francisco, CA",
    founded: "2021",
    website: "techflow.com"
  };

  const mockInvestorData = {
    firm: "Venture Capital Partners",
    focus: "Early Stage SaaS",
    checkSize: "$500K - $2M",
    portfolio: "45+ companies",
    location: "Palo Alto, CA",
    experience: "12 years",
    website: "vcpartners.com"
  };

  const isInvestor = participant?.role === 'investor';
  const profileData = isInvestor ? mockInvestorData : mockCompanyData;

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-medium text-foreground">Profile</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClose}
        />
      </div>
      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Basic Info */}
        <div className="text-center">
          <Image
            src={participant?.avatar}
            alt={participant?.name}
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
          />
          <h4 className="font-semibold text-foreground">{participant?.name}</h4>
          <p className="text-sm text-muted-foreground mb-2">
            {isInvestor ? profileData?.firm : profileData?.name}
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              participant?.isOnline ? 'bg-success' : 'bg-muted-foreground'
            }`}></div>
            <span className="text-sm text-muted-foreground">
              {participant?.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button
            variant="outline"
            fullWidth
            iconName="User"
            onClick={onViewProfile}
          >
            View Full Profile
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="Calendar"
            onClick={onScheduleMeeting}
          >
            Schedule Meeting
          </Button>
          {isInvestor && (
            <Button
              variant="outline"
              fullWidth
              iconName="FileText"
              onClick={onShareReport}
            >
              Share Due Diligence
            </Button>
          )}
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div>
            <h5 className="font-medium text-foreground mb-3">
              {isInvestor ? 'Investment Focus' : 'Company Details'}
            </h5>
            <div className="space-y-3">
              {isInvestor ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Focus Area</span>
                    <span className="text-sm text-foreground">{profileData?.focus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Check Size</span>
                    <span className="text-sm text-foreground">{profileData?.checkSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Portfolio</span>
                    <span className="text-sm text-foreground">{profileData?.portfolio}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Experience</span>
                    <span className="text-sm text-foreground">{profileData?.experience}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Industry</span>
                    <span className="text-sm text-foreground">{profileData?.industry}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Stage</span>
                    <span className="text-sm text-foreground">{profileData?.stage}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Valuation</span>
                    <span className="text-sm text-foreground">{profileData?.valuation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Employees</span>
                    <span className="text-sm text-foreground">{profileData?.employees}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Founded</span>
                    <span className="text-sm text-foreground">{profileData?.founded}</span>
                  </div>
                </>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="text-sm text-foreground">{profileData?.location}</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-medium text-foreground mb-3">Contact</h5>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Globe" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{profileData?.website}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{participant?.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{profileData?.location}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h5 className="font-medium text-foreground mb-3">Recent Activity</h5>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-foreground">Updated company profile</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-foreground">Shared financial documents</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-foreground">Scheduled investor meeting</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shared Files */}
          <div>
            <h5 className="font-medium text-foreground mb-3">Shared Files</h5>
            <div className="space-y-2">
              {[
                { name: 'Pitch_Deck_v3.pdf', size: '2.4 MB', date: '2 days ago' },
                { name: 'Financial_Report_Q3.xlsx', size: '1.8 MB', date: '1 week ago' },
                { name: 'Market_Analysis.docx', size: '956 KB', date: '2 weeks ago' }
              ]?.map((file, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg cursor-pointer">
                  <Icon name="FileText" size={16} className="text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{file?.name}</p>
                    <p className="text-xs text-muted-foreground">{file?.size} • {file?.date}</p>
                  </div>
                  <Icon name="Download" size={14} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;