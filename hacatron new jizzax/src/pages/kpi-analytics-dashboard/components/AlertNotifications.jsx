import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertNotifications = ({ alerts = [] }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-error bg-error/5 text-error';
      case 'warning': return 'border-warning bg-warning/5 text-warning';
      case 'info': return 'border-accent bg-accent/5 text-accent';
      default: return 'border-border bg-muted text-muted-foreground';
    }
  };

  const handleDismiss = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
  };

  const visibleAlerts = alerts?.filter(alert => !dismissedAlerts?.has(alert?.id));

  if (visibleAlerts?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mb-6">
      {visibleAlerts?.map((alert) => (
        <div
          key={alert?.id}
          className={`border rounded-lg p-4 ${getAlertColor(alert?.severity)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Icon 
                name={getAlertIcon(alert?.severity)} 
                size={20} 
                className="mt-0.5 flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{alert?.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{alert?.message}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>{alert?.timestamp}</span>
                  <span>•</span>
                  <span className="capitalize">{alert?.category}</span>
                </div>
                {alert?.action && (
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={alert?.action?.onClick}
                      iconName={alert?.action?.icon}
                    >
                      {alert?.action?.label}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDismiss(alert?.id)}
              iconName="X"
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertNotifications;