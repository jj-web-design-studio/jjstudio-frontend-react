import { Button } from 'reactstrap';
import React from 'react';

const Key = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <Button
      className="key"
      color = "secondary"
      onClick={handleClick}
    >
      {props.label}
    </Button>
  )
}

export default Key;