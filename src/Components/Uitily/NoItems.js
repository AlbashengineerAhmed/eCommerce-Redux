import React from 'react'
import image from "../../images/no-items-removebg.png";

export default function NoItems() {
  return (
    <div className='d-flex justify-content-center align-align-items-center'>
      <img src={image} alt="no items found" />
    </div>
  );
}
