import React from 'react'
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import BrandFeatured from '../../Components/Brand/BrandFeatured';
import ViewHomeProductsHook from './../../hook/products/view-home-products-hook';
import HomeCategory from './../../Components/Home/HomeCategory/HomeCategory';
import DiscountSection from './../../Components/Home/DiscountSection/DiscountSection';
import Slider from './../../Components/Home/Slider/Slider';
const HomePage = () => {

    const [items] = ViewHomeProductsHook();
    return (
        <div className='font' style={{ minHeight: '670px' }}>

            <Slider />
            <HomeCategory />
            <CardProductsContainer products={items} title="الاكثر مبيعا" btntitle="المزيد" pathText="/products" />
            <DiscountSection />
            <CardProductsContainer products={items} title="احدث الازياء" btntitle="المزيد" pathText="/products" />
            <BrandFeatured title="اشهر الماركات" btntitle="المزيد" />

        </div>
    )
}

export default HomePage
