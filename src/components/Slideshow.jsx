import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";
import img7 from "../assets/7.jpg";
import img8 from "../assets/8.jpg";
import img9 from "../assets/9.jpg";

import "../App.css";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export default function Slideshow() {
    const images = [img2, img3, img4, img5, img6, img7, img8, img9];
    const [currentImage, setCurrentImage] = useState(0);

    const prevImage = () => {
        setCurrentImage((currentImage - 1 + images.length) % images.length);
    }

    const nextImage = () => {
        setCurrentImage((currentImage + 1) % images.length);
    }

    return (
        <div className="slideshow-container">
            <div className="slideshow-images">
                <img src={images[currentImage % images.length]} alt="img" className="slideshow-image"/>
                <img src={images[(currentImage + 1) % images.length]} alt="img" className="slideshow-image"/>
                <img src={images[(currentImage + 2) % images.length]} alt="img" className="slideshow-image"/>
                         
            </div>
            
            <div className="buttons">
                <button onClick={prevImage}><FaChevronLeft /></button>
                <button onClick={nextImage}><FaChevronRight /></button>
            </div>
        </div>
    );
}