import React, {useEffect} from "react";
import ProductService from "../../service/ProductService";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import ProductCard from "./ProductCard";
import {CardGroup, Divider} from "semantic-ui-react";
import {Product} from "../types";
import GTitle, {GTitleSize} from "./Utils/GTitle";

export default function TrendingSwiper() {
    const [products, setProducts] = React.useState([]);
    const [slidesPerView, setSlidesPerViews] = React.useState(0);

    useEffect( () => {
        ProductService.getTrendingProducts()
            .then( ps => setProducts(ps))
        setSlidesPerViews(window?.screen.width >= 1024 ? 5 : 2)
    }, [slidesPerView])
    return <>
        <GTitle title={"Destacados para ti"} size={GTitleSize.MEDIUM} withDivider/>
        <Divider />
        <CardGroup>
            <Swiper  navigation={true} modules={[Navigation]} slidesPerView={slidesPerView}
                     spaceBetween={20}
                     className="mySwiper">
                {products.map( (p: Product) => <SwiperSlide style={{width:"40%", margin:"0 4px"}} key={p._id} >
                    <ProductCard product={p} loading={false}/>
                </SwiperSlide>)}
            </Swiper>
        </CardGroup>
    </>
}