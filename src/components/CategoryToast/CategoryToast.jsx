import React from 'react';
import Toast from 'react-bootstrap/Toast';

const CategoryToast = ({ label, onClose }) => {
  return (
    <Toast className="w-auto" onClose={onClose}>
      <Toast.Header>
        <strong className="me-auto">{label}</strong>
      </Toast.Header>
    </Toast>
  );
};

export default CategoryToast;
