import React from 'react';

const Gem = ({ position: { x, y }, onClick }) =>
    <div
    className="gem"
    style={{
      left: x,
      top: y,
    }}
    onClick={onClick} />;
export default Gem;
