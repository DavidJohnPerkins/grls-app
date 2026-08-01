const dbfunc = require('../util/db_function');
const { server, db } = require("../config");

exports.getAddModel = async (req, res, next) => {
    try {
        const attrCodes = [
            "ASHP","ASIZ","ATTR","BILD","BRDR","BRSH","BSIZ","CMPX",
            "ETHN","EYES","HAIR","MONS","NATN","NPCL","NPPF","NPSH",
            "NPSZ","PUAT","YTHF"
        ];

        // Build all attribute requests
        const attrRequests = attrCodes.map(code =>
            dbfunc.getData(`http://${db.url}:${server.port}/api/grls/add/attr?attr_abbrev=${code}`)
        );

        // Add flags request at the end
        attrRequests.push(
            dbfunc.getData(`http://${db.url}:${server.port}/api/grls/add/flags?type=MOD`)
        );

        // Execute all requests
        const results = await Promise.all(attrRequests);

        // Build render object dynamically
        const renderData = {};

        attrCodes.forEach((code, idx) => {
            const key = `${code.toLowerCase()}_list`;
            renderData[key] = results[idx];
        });

        // Flags are last
        renderData.flag_list = results[results.length - 1];

        // Static page info
        renderData.pageTitle = "Add Model";
        renderData.path = "/add-model";

        res.render("main-page/model-add", renderData);

    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.postAddModel = (req, res, next) => {
	try {
		if (!req.body || typeof req.body !== 'object') {
			return res.status(400).json({ error: 'Invalid request body' });
		}
		dbfunc.postData(`http://${db.url}:${server.port}/api/grls/model/create`, req.body)
			.then(() => {
				res.redirect("/model");
			})
			.catch(err => {
				console.error(err);
				res.status(500).json({ error: "Failed to create model" });
			});

	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Unexpected server error" });
	}
};
