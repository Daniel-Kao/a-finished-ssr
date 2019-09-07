import React, { Component } from 'react';

export default (DecoratedComponent, styles) => {
  return function NewComponent(props) {
    if (props.staticContext) {
      props.staticContext.css.push(styles._getCss());
    }

    return <DecoratedComponent {...props} />;
  };
};
