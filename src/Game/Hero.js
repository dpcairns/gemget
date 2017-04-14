import React from 'react';

const Hero = ({
  position: { x, y },
  onClick,
  color,
  gemCount,
  name
}) =>
    <div
    className="hero"
    style={{
      left: x,
      top: y,
      backgroundColor: color || 'yellow'
    }}
    onClick={onClick}>
    {gemCount}
    <p>{name}</p>
    </div>
    ;
export default Hero;
