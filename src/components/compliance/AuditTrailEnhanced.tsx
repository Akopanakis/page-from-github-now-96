import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FileText, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface AuditActivity {
  timestamp: string;
  user: string;
  action: string;
  details: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

interface AuditTrailEnhancedProps {
  activities: AuditActivity[];
}

const AuditTrailEnhanced: React.FC<AuditTrailEnhancedProps> = ({ activities }) => {
  const getIconForStatus = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle color="green" />;
      case 'warning':
        return <AlertTriangle color="orange" />;
      case 'error':
        return <AlertTriangle color="red" />;
      case 'info':
        return <Info color="blue" />;
      default:
        return <FileText />;
    }
  };

  return (
    <VerticalTimeline>
      {activities.map((activity, index) => (
        <VerticalTimelineElement
          key={index}
          className="vertical-timeline-element--work"
          contentStyle={{
            background: 'rgb(33, 150, 243)',
            color: '#fff'
          }}
          contentArrowStyle={{
            borderRight: '7px solid rgb(33, 150, 243)'
          }}
          date={activity.timestamp}
          iconStyle={{
            background: 'rgb(33, 150, 243)',
            color: '#fff'
          }}
          icon="●"
        >
          <h3 className="vertical-timeline-element-title">{activity.action}</h3>
          <h4 className="vertical-timeline-element-subtitle">{activity.user}</h4>
          <p>
            {activity.details}
          </p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default AuditTrailEnhanced;
