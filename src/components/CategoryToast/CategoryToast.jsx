import React from 'react';
import Toast from 'react-bootstrap/Toast';

const CategoryToast = ({ label }) => {
  return (
    <Toast className="w-auto">
      <Toast.Header>
        <strong className="me-auto">{label}</strong>
      </Toast.Header>
    </Toast>
  );
};

export default CategoryToast;
