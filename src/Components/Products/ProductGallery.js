import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import LeftButton from "./LeftButton";
import RightButton from "./RightButton";
import { useParams } from "react-router-dom";
import ViewProductsDetalisHook from "./../../hook/products/view-products-detalis-hook";

const ProductGallery = () => {
  const { id } = useParams();
  const [item, images, cat, brand] = ViewProductsDetalisHook(id);

  return (
    <div className="product-gallary-card w-100 d-flex justfiy-content-center align-items-center pt-2">
      <ImageGallery
        items={images}
        showFullscreenButton={false}
        showPlayButton={false}
        showThumbnails={false}
        autoPlay={true}
        slideInterval={3000}
        // renderRightNav={RightButton}
        // renderLeftNav={LeftButton}
      />
    </div>
  );
};

export default ProductGallery;
