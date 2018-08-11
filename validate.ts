import "reflect-metadata";

import { plural } from "./utils";


function addkey(target: any, key: string): void {
	if ( typeof target.__keys__ === 'undefined' ) {
		target.__keys__ = [];
	}

	target.__keys__.push(key);
}


export function validate_optional(target: any, key: any) {
	addkey(target, '?' + key);
}

export function validate(target: any, key: any) {
	addkey(target, key);
}


export function isValid(key: string, val: any, type: any): boolean {
	if (typeof type === 'undefined') {
		throw new TypeError("Type can't be undefined");
	}

	let optional = false;

	// A value is optional if the key is preceded with '?'
	if (key[0] === '?') {
		optional = true;

		// trim ? off
		key = key.substr(1);
	}

	const valid =
		(val instanceof type) // classes
		|| (typeof val === type.name.toLowerCase()) // number, string, boolean
		|| (optional && typeof val === 'undefined'); // optional


	return valid;
}


export class Validate {
	private __keys__;

	constructor(data: object) {
		this.__keys__.forEach((_key) => {
			// Trim optional ?
			const key = _key[0] === '?' ? _key.substr(1) : _key;

			const val = data[key];
			let type = Reflect.getMetadata('design:type', this, key);

			// Remove key from data to know which keys are left later
			delete data[key];

			if (! isValid(_key, val, type)) {
				throw new TypeError(`Field '${key}' with type '${typeof val}' does not match required type '${type.name.toLowerCase()}'`);
			}

			// Add data to object
			this[key] = val;
		});


		// Check if any data wasn't used
		const unused = Object.getOwnPropertyNames(data);
		if (unused.length > 0) {
			throw new TypeError(`Invalid ${plural('field', unused.length)} '${unused.join('\', \'')}'`);
		}
	}


	/**
	*  Check if all values of this object are valid
	*/
	isValid(): boolean {
		for (let _key of this.__keys__) {
			// Trim optional ?
			const key = _key[0] === '?' ? _key.substr(1) : _key;

			const val = this[key];
			let type = Reflect.getMetadata('design:type', this, key);

			if (! isValid(_key, val, type)) {
				return false;
			}
		}

		return true;
	}
}
