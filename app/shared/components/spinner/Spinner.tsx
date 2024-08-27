import React from 'react';

const Spinner = ({center}: {center?: boolean}) => (
  <div id="loading-spinner" className={center ? 'center' : ''}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" preserveAspectRatio="xMidYMid" className="lds-rolling">
      <circle
        cx="35"
        cy="35"
        fill="none"
        stroke="url(#icon-loading-gradient)"
        strokeWidth="10"
        r="30"
        strokeDasharray="141.37166941154067 49.12388980384689"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 35 35;360 35 35"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
      <linearGradient id="icon-loading-gradient">
        <stop offset="50%" stopColor="#002e6d" stopOpacity="1"/>
        <stop offset="65%" stopColor="#002e6d" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#002e6d" stopOpacity="0"/>
      </linearGradient>
    </svg>
  </div>
);

export default Spinner;
