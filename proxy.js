const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Middleware CORS para permitir todos los orígenes (local y APK)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // permitir cualquier origen
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Reenvío de todas las rutas /api/*
app.all("/api/*", async (req, res) => {
  try {
    const url = `https://freak-project-production.up.railway.app${req.originalUrl}`;
    const response = await axios({
      method: req.method,
      url,
      headers: req.headers,
      data: req.body
    });
    res.status(response.status).send(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).send(err.message);
  }
});

app.listen(PORT, () => console.log(`Proxy corriendo en puerto ${PORT}`));

