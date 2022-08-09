import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from '../../../styles/Home.module.css';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";


interface Props {
    urls: string[],
    width?: string
}
export default function Carrousel(props: Props) {
    return (
        <div style={{width:props.width || "min(400px, 100%)"}}>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {props.urls?.map( url => <SwiperSlide key={url} ><img src={url} className={styles.productDetailsImg}/></SwiperSlide>)}
            </Swiper>
        </div>
    );
};