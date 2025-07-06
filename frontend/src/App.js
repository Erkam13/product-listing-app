import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    axios
      .get("https://product-listing-app-l5v8.onrender.com/products")
      .then((response) => {
        setProducts(response.data);

        // Her ürün için default renk (yellow)
        const defaultColors = {};
        response.data.forEach((_, index) => {
          defaultColors[index] = "yellow";
        });
        setSelectedColors(defaultColors);
      })
      .catch((error) => {
        console.error("API çağrısı hatası:", error);
      });
  }, []);

  const handleColorChange = (index, color) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [index]: color,
    }));
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={4}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                borderRadius: "10px",
                padding: "10px",
                textAlign: "left",
              }}
            >
              <img
                src={product.images[selectedColors[index]]}
                alt={`${product.name} ${selectedColors[index]}`}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />
              <h3>{product.name}</h3>
              <p>${product.price} USD</p>
              <div style={{ display: "flex", gap: "8px", margin: "10px 0" }}>
                {["yellow", "white", "rose"].map((color) => (
                  <span
                    key={color}
                    onClick={() => handleColorChange(index, color)}
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      padding: "2px",
                      backgroundColor:
                        color === "yellow"
                          ? "#E6CA97"
                          : color === "white"
                          ? "#D9D9D9"
                          : "#E1A4A9",
                      border:
                        selectedColors[index] === color
                          ? "2px solid black"
                          : "1px solid #999",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  ></span>
                ))}
              </div>
              <p>
                <b>Popularity:</b> {(product.popularityScore * 5).toFixed(1)}/5
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default App;