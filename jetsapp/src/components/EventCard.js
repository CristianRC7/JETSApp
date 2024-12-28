import React from 'react';
import Card from './Card';

const EventCard = ({ event, formatDate }) => {
  return <Card event={event} showSurveyButton={false} />;
};

export default EventCard;