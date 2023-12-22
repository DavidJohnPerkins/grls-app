const { json } = require('body-parser');
const { poolPromise } = require('../util/db');
const { sql } = require('../util/db');

async function findModel(id) {
	var p_input_json = `[{"id": "${id}"}]`

	const pool = await poolPromise
	const result = await pool.request()
		.input('p_input_json', sql.NVarChar(sql.MAX), p_input_json)
		.execute('GRLS.r_model')

	return result.recordsets[0];

}

module.exports = class OSMap {

	constructor(id, title, imageUrl, description, price) {
		this.item_id = item_id;
		this.key_value = key_value;
		this.map_number = map_number;
		this.map_title = map_title;
		this.main_setlements = main_setlements;
		this.publish_date = publish_date;
		this.map_image = map_image;
	}

	save() {
		/*
		return db.execute(
			'INSERT INTO product (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', 
			[this.map_title, this.item_price, this.imageUrl, this.description]
		);
		*/
		return 1;
  	}

	static deleteById(id) {	
	}

	static async fetchAll() {
		return findModel(-1);
	}

	static async findById(id) {
		return findModel(id);
	}
};
