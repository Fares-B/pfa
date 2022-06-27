// controller for menu fetching data from symfony api and returning it to the client
const { SYMFONY_API_URL } = process.env;

module.exports = {
    cget: async (req, res) => {
        const { id: user = null } = req.params;
        if (!user) return res.sendStatus(400);
        try {
            const menu = await fetch(`${SYMFONY_API_URL}/menu`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        api_key: process.env.SYMFONY_API_KEY,
                        user,
                    }),
                })
                .then(response => response.json())
                .then(data => data);
            res.json(menu);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getPrices: async (req, res) => {
        const { id: user = null } = req.params;
        if (!user) return res.sendStatus(400);
        // const menus = [1, 2];
        // const supplements = [1, 2, 1, 1, 2,2,1];
        try {
            const menu = await fetch(`${SYMFONY_API_URL}/menu/prices`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        api_key: process.env.SYMFONY_API_KEY,
                        user,
                        ...req.body,
                        // menus: menus,
                        // supplements: supplements,
                    })
                })
                .then(response => response.json())
                .then(data => data);
            let supplementsTotal = 0;
            let menusTotal = 0;
            for (const m of menu.menus) {
                menusTotal += (m.price * menus.filter(i => i === m.id).length);
            }
            for (const s of menu.supplements) {
                supplementsTotal += (s.price * supplements.filter(i => i === s.id).length);
            }
            res.json({
                menusTotal,
                supplementsTotal,
                total: menusTotal + supplementsTotal,
                menu,
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
