import React from 'react';
import CommentForm from '../../components/forms/CommentForm';

export default function New() {
  return (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      <CommentForm />
    </div>
  );
}
