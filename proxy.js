const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Middleware CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.all("/api/*", async (req, res) => {
  try {
    const url = `https://freak-project-production.up.railway.app${req.originalUrl}`;

    // Solo enviar los headers que realmente necesites
    const headers = {
      "Content-Type": req.headers["content-type"] || "application/json",
      // Si necesitas authorization u otros headers específicos, añádelos aquí
      // "Authorization": req.headers["authorization"],
    };

    const response = await axios({
      method: req.method,
      url,
      headers,
      data: req.body,
    });

    res.status(response.status).send(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(err.response?.status || 500).send("Error fetching figures");
  }
});

app.listen(PORT, () => console.log(`Proxy corriendo en puerto ${PORT}`));

