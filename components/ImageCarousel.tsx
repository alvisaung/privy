import React, { FC, useState } from "react";
import styles from "@/styles/ImageCarousel.module.scss";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MenuPic } from "@/services/types/general";

const ImageCarousel: FC<{ img_gp: MenuPic[] | [] }> = ({ img_gp }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      // add plugins here
    ]
  );
  return (
    <div className={styles.img_carousal_gp}>
      <div ref={sliderRef} className={`keen-slider ${styles.img}`}>
        {img_gp.map((img, id) => {
          return (
            <div key={id}>
              <img src={img.url} alt={img.pic_desc} className={`keen-slider__slide ${styles.slide_img}`} />
            </div>
          );
        })}
        {img_gp.length > 0 && <div className={`${styles.img_desc} `}>{img_gp[currentSlide].pic_desc}</div>};
      </div>
      {loaded && instanceRef.current && (
        <>
          <Arrow left onClick={() => instanceRef.current?.prev()} disabled={currentSlide === 0} />
          <Arrow onClick={() => instanceRef.current?.next()} disabled={currentSlide === instanceRef.current.track.details?.slides?.length - 1} />
        </>
      )}
      {loaded && instanceRef.current && (
        <div className={styles.dots}>
          {[...Array(instanceRef.current.track.details.slides.length)].map((m, idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={`${styles.dot} ${currentSlide === idx ? styles.active : ""} `}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
};
function Arrow(props: any) {
  if (props.disabled) return <></>;
  return (
    <div onClick={props.onClick} className={`${styles.arrow_box}  ${props.left ? "arrow--left" : "arrow--right"} `}>
      <svg className={` arrow`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
        {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
      </svg>
    </div>
  );
}

export default ImageCarousel;
