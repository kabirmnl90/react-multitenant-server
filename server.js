const express = require("express");
const cors = require("cors");
const Config = require("./model/config.model");

// Setup
const PORT = process.env.SERVER_PORT || 4000;
const app = express();
app.use(cors());

// Routes
app.get("/getConfig", async function (req, res) {
  const { clientId } = req.query;
  // Find the config for that particular clientId
  const clientConfig = Config.getClientConfig(clientId);

  if (!clientConfig) {
    // Return an error if it's not found
    res.status(404).json({
      success: false,
      message: `Config not found for this clientId: ${clientId}`,
      clientConfig: null,
    });
  }

  res.status(200).json({
    success: true,
    message: `Config found for this clientId: ${clientId}`,
    clientConfig: clientConfig,
  });
});

// Run server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
