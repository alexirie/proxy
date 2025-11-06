const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Ruta proxy
app.all('/api/*', async (req, res) => {
  const url = 'https://freak-project-production.up.railway.app' + req.originalUrl;
  
  try {
    const response = await axios({
      method: req.method,
      url,
      headers: { ...req.headers, host: 'freak-project-production.up.railway.app' },
      data: req.body
    });

    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.message);
  }
});


// Puerto donde corre el proxy
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Proxy corriendo en puerto ${PORT}`));
