import React from 'react'
import Banner from '../Share/Banner'
import Title from '../Share/Title';
import MoreDetails from '../About/MoreDetails';

const Home = () => {
    const ban1 = 'https://marketplace.canva.com/EAFGKRRskMs/1/0/1600w/canva-brown-and-beige-minimalist-fashion-banner-lYcbGpUSVGo.jpg';

    const ban2 = 'https://marketplace.canva.com/EAF0XmkzgQA/1/0/1600w/canva-gray-minimalist-new-collection-banner-O7EU5YM_MGU.jpg';

    const ban3 = 'https://images.template.net/178234/fashion-facebook-ad-banner-template-edit-online.jpg';
  return (
    <div>
        <Banner ban={ban1}></Banner>
        <Title head={'NEW'} head2={"IN"} para={'New Styles Drop Daily'}></Title>
        <Banner ban={ban2}></Banner>
         <Title head={'MEGA'} head2={"OFFER"} para={'Grab Your Item'}></Title>
        <Banner ban={ban3}></Banner>
        <MoreDetails></MoreDetails>
    </div>
  )
}

export default Home