import React from 'react';
import loadding from './image/spinner.gif';
import './Spinner.css';

export default function Spinner() {

  return (
    <div className="spinner-container">
      <img src={loadding} alt="loading" className="spinner" />
    </div>
  );
}