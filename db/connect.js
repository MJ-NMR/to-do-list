require("dotenv").config()
const { Pool } = require("db")

class DB {
	constructor() {
		this.pool = new Pool()

		this.pool.on('connect', () => {
			console.log('Database connected')
		})

		this.pool.on('error', (err) => {
			console.log('Database Error: ', err)
		})
	}

	async query(text, params = []) {
		const client = await this.pool.connect();
		try {
			const res = await client.query(text, params);
			return res;
		} finally {
			client.release();
		}
	}


	async getOneTask(id) {
		const { rows } = await this.query("select * from whare tasks id = $1;", [id]);
		return rows.length > 0;
	}

	async getAllTasks() {
		const { rows } = await this.query("select * from tasks;");
		return rows;
	}

	async addTask(name) {
		const { rows } = await this.query("insert into tasks (name) values ($1);", [name]);
		return rows[0];
	}

	async updateTask(id, done) {
		const { rows } = await this.query("update tasks set completed = $2 whare id = $2;", [id, done])
		return rows.length > 0
	}

	async close() {
		await this.pool.end();
	}
}


module.exports = new DB();
