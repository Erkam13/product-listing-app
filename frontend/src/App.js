import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      axios.get("https://product-listing-app-l5v8.onrender.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("API çağrısı hatası:", error);
      });
  }, []);

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
                src={product.images.yellow}
                alt={product.name}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />
              <h3>{product.name}</h3>
              <p>${product.price} USD</p>
              <div style={{ display: "flex", gap: "8px", margin: "10px 0" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#d4af37",
                    border: "2px solid black",
                    borderRadius: "50%",
                  }}
                ></span>
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#ccc",
                    borderRadius: "50%",
                  }}
                ></span>
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#d4a1a1",
                    borderRadius: "50%",
                  }}
                ></span>
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
