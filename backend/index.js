const express = require("express");
const cors = require("cors");
const axios = require("axios");
const products = require("./products.json");

const app = express();
const PORT = 5050;

// CORS 
app.use(cors());

//API
const GOLD_API_URL = "https://www.goldapi.io/api/XAU/USD";
const GOLD_API_KEY = "goldapi-57nabsmcqoj4x8-io"; 


async function fetchGoldPrice() {
  try {
    const response = await axios.get(GOLD_API_URL, {
      headers: {
        "x-access-token": GOLD_API_KEY,
        "Content-Type": "application/json",
      },
    });
   //ons to usd/gr
    const goldPricePerOunce = response.data.price;
    const goldPricePerGram = goldPricePerOunce / 31.1035;
    return goldPricePerGram;
  } catch (error) {
    console.error("Altın fiyatı alınamadı:", error.message);
    return 70; // Altın fiyatı çekilemezse sabit 70 usd/gr kullan
  }
}

// API endpoint
app.get("/products", async (req, res) => {
  const goldPrice = await fetchGoldPrice();
  const productsWithPrice = products.map((product) => {
    const price = (product.popularityScore + 1) * product.weight * goldPrice;
    return {
      ...product,
      price: price.toFixed(2),
    };
  });
  res.json(productsWithPrice);
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`API çalışıyor: http://localhost:${PORT}/products`);
});