const { json } = require('body-parser');
const { poolPromise } = require('./db');
const { sql } = require('./db');

async function findModel(id) {
	var p_input_json = `{"model_id": "${id}"}`

	const pool = await poolPromise
	const result = await pool.request()
		.input('p_input_json', sql.NVarChar(sql.MAX), p_input_json)
		.execute('GRLS.r_model')

	return result.recordsets[0];
}

async function getAttributeList(abbrev) {
	var p_input_json = `{"abbrev": "${abbrev}"}`

	const pool = await poolPromise
	const result = await pool.request()
		.input('p_input_json', sql.NVarChar(sql.MAX), p_input_json)
		.execute('GRLS.r_l2_attribute_list')

	return result.recordsets[0];
}

async function getFlagList() {
	const pool = await poolPromise
	const result = await pool.request()
		.execute('GRLS.r_flag_list')
	
	return result.recordsets[0];
}

async function getModelCards(id) {
	var p_input_json = `{"model_id": "${id}"}`

	const pool = await poolPromise
	const result = await pool.request()
		.input('p_input_json', sql.NVarChar(sql.MAX), p_input_json)
		.execute('GRLS.r_model')

	return result.recordsets[0];
}

module.exports = class Model {

/*
	constructor(id, title, imageUrl, description, price) {
		this.item_id = item_id;
		this.key_value = key_value;
		this.map_number = map_number;
		this.map_title = map_title;
		this.main_setlements = main_setlements;
		this.publish_date = publish_date;
		this.map_image = map_image;
	}
*/
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

	static async getModelCards() {
		return getModelCards(-1);
	}

	static async findById(id) {
		return findModel(id);
	}

	static async getAttributeList(abbrev) {
		return getAttributeList(abbrev);
	}

	static async getFlagList() {
		return getFlagList();
	}
};
