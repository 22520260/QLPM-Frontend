import React from 'react';

const Alert = ({ type, message }) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
      {/* <button onClick={onOK} className="btn btn-primary ml-2">OK</button> */}
    </div>
  );
};

export default Alert;
