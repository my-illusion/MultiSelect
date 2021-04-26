import React from 'react';
import cls from 'classnames';
import emptyImage from './empty.png';
import './index.less';

const Empty = ({ className, style, text = '' }) => {
  return (
    <div
      className={cls('empty-placeholder', className)}
      style={{ ...style, display: 'flex', flexDirection: 'column' }}
    >
      <img className="empty-placeholder-image" src={emptyImage} alt="无" />
      {text !== '' ? (
        <div style={{ display: 'block', color: '#78828C' }}>{text}</div>
      ) : null}
    </div>
  );
};

export default Empty;
