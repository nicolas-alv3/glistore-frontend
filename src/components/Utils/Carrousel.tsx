import React from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";
import styles from '../../../styles/Home.module.css';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import { Navigation } from "swiper";
import Image from "next/image";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


interface Props {
    urls: string[],
    width?: string
}
export default function Carrousel(props: Props) {

    return (
        <div style={{width:props.width || "min(400px, 100%)"}}>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {props.urls?.map( url => <SwiperSlide key={url}>
                    <Zoom>
                        <Image alt={""} width={400} height={500} quality={75} src={url} priority className={styles.productDetailsImg}/>
                    </Zoom>
                </SwiperSlide>)}
            </Swiper>
        </div>
    );
};