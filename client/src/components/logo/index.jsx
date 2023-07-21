import React from 'react';
import './index.scss';

const Logo = ({ name, img, color, text, subtext, textLocation, handler, isTextActive }) => (
  <div
    className={
      textLocation
        ? isTextActive
          ? `logo logo-${name} logo-${textLocation} logo_textactive`
          : `logo logo-${name} logo-${textLocation}`
        : isTextActive
        ? `logo logo-${name}`
        : `logo logo-${name} logo_textactive`
    }
    onClick={isTextActive ? handler : null}
  >
    <div className="logo-text">
      <h3 className="logo-text__name">{text}</h3>
      {subtext && <div className="logo-text__subname">{subtext}</div>}
    </div>
    <div className="logo-img" onClick={handler}>
      {!color ? img ? <img src={img} alt="logo" /> : null : <span style={{ color }}>{text?.slice(0, 1) || null}</span>}
    </div>
  </div>
);
export default Logo;
