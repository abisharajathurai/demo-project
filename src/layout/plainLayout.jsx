import React from 'react'
import dynamic from 'next/dynamic';
const FooterSection = dynamic(() => import('./ultils/footer'));
const HeaderSection = dynamic(() => import('./ultils/header'));
const PlainLayout = (props) => {
  return (
    <>
      <HeaderSection/>
      {props.children}
      <FooterSection/>
    </>
  )
}

export default PlainLayout
