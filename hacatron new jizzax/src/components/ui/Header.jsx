import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'investor', notifications = 0, onRoleSwitch, className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: userRole === 'investor' ? '/investor-dashboard' : '/startup-dashboard',
      icon: 'LayoutDashboard',
      roles: ['investor', 'startup']
    },
    {
      label: 'Analytics',
      path: '/kpi-analytics-dashboard',
      icon: 'BarChart3',
      roles: ['investor', 'startup']
    },
    {
      label: 'Messages',
      path: '/messaging-center',
      icon: 'MessageSquare',
      roles: ['investor', 'startup'],
      badge: notifications > 0 ? notifications : null
    },
    {
      label: userRole === 'investor' ? 'Companies' : 'Profile',
      path: '/startup-profile',
      icon: userRole === 'investor' ? 'Building2' : 'User',
      roles: ['investor', 'startup']
    }
  ];

  const quickActions = userRole === 'investor' 
    ? [
        { label: 'Generate Report', icon: 'FileText', action: () => navigate('/ai-due-diligence-report') },
        { label: 'Upload Document', icon: 'Upload', action: () => console.log('Upload document') },
        { label: 'Schedule Meeting', icon: 'Calendar', action: () => console.log('Schedule meeting') }
      ]
    : [
        { label: 'Update Profile', icon: 'Edit', action: () => console.log('Update profile') },
        { label: 'Upload Pitch Deck', icon: 'Upload', action: () => console.log('Upload pitch deck') },
        { label: 'View Analytics', icon: 'TrendingUp', action: () => navigate('/kpi-analytics-dashboard') }
      ];

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.quick-actions-dropdown')) {
        setIsQuickActionsOpen(false);
      }
      if (!event?.target?.closest('.search-container')) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-card border-b border-border ${className}`}>
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">InvestorOS</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
              {item?.badge && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-error rounded-full">
                  {item?.badge > 99 ? '99+' : item?.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="search-container relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  placeholder={`Search ${userRole === 'investor' ? 'companies' : 'investors'}...`}
                  className="w-64 px-3 py-2 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  iconName="Search"
                />
              </form>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                iconName="Search"
                className="hidden md:flex"
              />
            )}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-dropdown relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
              iconName="Plus"
              className="hidden md:flex"
            />
            {isQuickActionsOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg py-2 z-50">
                {quickActions?.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      action?.action();
                      setIsQuickActionsOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name={action?.icon} size={16} />
                    <span>{action?.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role Context Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
            <div className={`w-2 h-2 rounded-full ${userRole === 'investor' ? 'bg-primary' : 'bg-success'}`} />
            <span className="text-sm font-medium text-muted-foreground capitalize">{userRole}</span>
            {onRoleSwitch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRoleSwitch}
                iconName="RefreshCw"
                className="ml-1 p-1"
              />
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            iconName="Menu"
            className="md:hidden"
          />
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-3 space-y-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                placeholder={`Search ${userRole === 'investor' ? 'companies' : 'investors'}...`}
                className="flex-1 px-3 py-2 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" variant="ghost" size="sm" iconName="Search" />
            </form>

            {/* Mobile Navigation Items */}
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`relative flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.badge && (
                  <span className="ml-auto flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-error rounded-full">
                    {item?.badge > 99 ? '99+' : item?.badge}
                  </span>
                )}
              </button>
            ))}

            {/* Mobile Role Indicator */}
            <div className="flex items-center justify-between px-3 py-3 mt-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${userRole === 'investor' ? 'bg-primary' : 'bg-success'}`} />
                <span className="text-sm font-medium text-muted-foreground capitalize">{userRole}</span>
              </div>
              {onRoleSwitch && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRoleSwitch}
                  iconName="RefreshCw"
                />
              )}
            </div>

            {/* Mobile Quick Actions */}
            <div className="pt-3 border-t border-border">
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Quick Actions</p>
              {quickActions?.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    action?.action();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-3 py-3 text-sm text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
                >
                  <Icon name={action?.icon} size={16} />
                  <span>{action?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;