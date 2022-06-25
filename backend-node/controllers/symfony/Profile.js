// controller for menu fetching data from symfony api and returning it to the client
const { SYMFONY_API_URL, SYMFONY_API_KEY } = process.env;

module.exports = {
  get: async (req, res) => {
    try {
      const { establishment: company } = req.user;
      const profile = await fetch(`${SYMFONY_API_URL}/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: SYMFONY_API_KEY,
          company,
        }),
      })
        .then(response => response.json())
        .then(data => data);

      res.json(profile);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
