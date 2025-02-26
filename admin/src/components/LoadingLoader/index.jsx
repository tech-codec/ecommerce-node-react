// src/components/Loading.js
import React from 'react';
import { DotLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="loading">
      <DotLoader color="#00BFFF" size={60} />
    </div>
  );
};

export default Loading;
