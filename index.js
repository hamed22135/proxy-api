const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl || !targetUrl.startsWith("https://")) {
    return res.status(400).send("Invalid URL");
  }

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MyBot/1.0)"
      }
    });

    const body = await response.text();
    res.status(response.status).send(body);
  } catch (e) {
    res.status(500).send("Proxy error: " + e.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});
