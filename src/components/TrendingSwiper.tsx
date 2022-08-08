import React, {useEffect} from "react";
import ProductService from "../../service/ProductService";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import ProductCard from "./ProductCard";
import {Divider, Header} from "semantic-ui-react";
import {Product} from "../types";

export default function TrendingSwiper() {
    const [products, setProducts] = React.useState([]);
    const [slidesPerView, setSlidesPerViews] = React.useState(0);

    useEffect( () => {
        ProductService.getTrendingProducts()
            .then( ps => setProducts(ps))
        setSlidesPerViews(window?.screen.width >= 1024 ? 5 : 2)
    }, [slidesPerView])
    return <>
        <Header>Destacados</Header>
        <Divider />
        <Swiper  navigation={true} modules={[Navigation]} slidesPerView={slidesPerView}
                 spaceBetween={5}
                 className="mySwiper">
            {products.map( (p: Product) => <SwiperSlide style={{width:"40%"}} key={p._id} >
                    <ProductCard product={p} />
            </SwiperSlide>)}
        </Swiper>
    </>
}