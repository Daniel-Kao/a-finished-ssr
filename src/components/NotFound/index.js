import React, { useEffect } from 'react';

const NotFound = props => {
  // useEffect(() => {
  //   const { staticContext } = props;
  //   staticContext && (staticContext.NotFound = true);
  // }, [staticContext]);
  if (props.staticContext) {
    props.staticContext.NotFound = true;
  }
  console.log(props);
  return <div>sorry, page not found</div>;
};

export default NotFound;
