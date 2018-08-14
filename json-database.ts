import * as fs from 'fs';

import { MemoryDatabase } from './memory-database';


/**
 *  A simple database which stores data in a JSON file
 */
export class JSONDatabase extends MemoryDatabase {
	private filename: string;

	constructor(filename: string) {
		super();
		this.filename = filename;
		this.read();
	}

	private read(): void {
		try {
			// NOTE: All type information is lost
			this.data = JSON.parse(fs.readFileSync(this.filename).toString());
		}
		catch(err) {
			this.data = {};

			// Ignore if file not found
			if (err.code !== 'ENOENT') {
				throw err;
			}
		}
	}

	private write(): void {
		// NOTE: All type information gets lost
		fs.writeFileSync(this.filename, JSON.stringify(this.data, null, '\t'));
	}

	protected set(key: string, value): void {
		this.data[key] = value;
		this.write();
	}
}
