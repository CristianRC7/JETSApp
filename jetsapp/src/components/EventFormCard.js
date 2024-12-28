import React from 'react';
import Card from './Card';

const EventFormCard = ({ event, onSurveyPress }) => {
  return <Card event={event} onSurveyPress={onSurveyPress} showSurveyButton={true} />;
};

export default EventFormCard;