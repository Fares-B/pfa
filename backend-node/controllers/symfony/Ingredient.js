// controller for ingredients fetching data from symfony api and returning it to the client
const { SYMFONY_API_URL } = process.env;

module.exports = {
    cget: async (req, res) => {
        const { establishment } = req.query;
        if (!establishment) return res.sendStatus(400);
        try {
            const menu = await fetch(`${SYMFONY_API_URL}/ingredients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ establishment }),
                })
                .then(response => response.json())
                .then(data => data);
            res.json(menu);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    get: async (req, res) => {
        const { establishment } = req.query;
        if(!establishment) return res.sendStatus(400);
        try {
            const menu = await fetch(`${SYMFONY_API_URL}/ingredients/${req.params.id}`)
                .then(response => response.json())
                .then(data => data);
            res.json(menu);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
