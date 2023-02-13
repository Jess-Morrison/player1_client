import React from 'react';
import VideoGameForm from '../../components/forms/VideoGameForm';

export default function New() {
  return (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      <VideoGameForm />
    </div>
  );
}
