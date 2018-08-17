import 'reflect-metadata';

import { plural } from './utils';


type ValidatorFn = (value: any, target: any) => boolean;

class Key {
	target?: object;
	name: string;
	type?: Function;
	optional: boolean = false;
	array: boolean = false;
	validator?: ValidatorFn;
}

function addkey(target: any, key: Key): void {
	if ( typeof target.__keys__ === 'undefined' ) {
		target.__keys__ = [];
	}

	target.__keys__.push(key);
}


export function validate(target: any, key: string) {
	addkey(target, <Key> {
		name: key,
		optional: false,
		array: false,
	});
}

export function validate_optional(target: any, key: string) {
	addkey(target, <Key> {
		name: key,
		optional: true,
		array: false,
	});
}

export function validate_array_of(type: Function) {
	return function(target: any, key: string) {
		addkey(target, <Key> {
			name: key,
			type: type,
			optional: false,
			array: true,
		});
	}
}

export function validate_optional_array_of(type: Function) {
	return function(target: any, key: string) {
		addkey(target, <Key> {
			name: key,
			type: type,
			optional: true,
			array: true,
		});
	}
}

export function validate_fn(fn: ValidatorFn) {
	return function(target: any, key: string) {
		addkey(target, <Key> {
			name: key,
			optional: false,
			array: false,
			validator: fn,
		})
	}
}

export function validate_optional_fn(fn: ValidatorFn) {
	return function(target: any, key: string) {
		addkey(target, <Key> {
			name: key,
			optional: true,
			array: false,
			validator: fn,
		})
	}
}


/**
 *  Returns `false` if invalid, `true` is valid, or an object if val has to be changed
 *  in order to be valid (where the object is valid).
 */
function isValid(key: Key, val: any): boolean | any {
	if (key.optional && typeof val === 'undefined') {
		return true;
	}

	if (typeof key.validator === 'function') {
		return key.validator(val, key.target);
	}

	if (typeof key.type === 'undefined') {
		return false;
	}

	if (key.type === Array) {
		console.log("[INFO] Consider using @validate_[optional_]array_of(type) instead of @validate[_optional] for array '" + key.name + "'");
	}


	// Arrays need to be treated specially
	if (key.array) {
		if (! Array.isArray(val)) {
			return false;
		}

		const subkey = <Key> {
			name: key.name + "[i]",
			type: key.type,
			optional: false,
			array: false,
		};

		// Make sure all items in this array match the type of the array
		for (let item of val) {
			if (! isValid(subkey, item)) {
				return false;
			}
		}

		return true;
	}


	let val_changed = false;

	// If the type is Validatable and the value is an object,
	// call its constructor to validate the value
	if (typeof val === 'object' && key.type.prototype instanceof Validate) {
		val = new (<any>key.type)(val);
		val_changed = true;
	}

	// Dates aren't supported by JSON, but should be supported by Javascript,
	// so convert if necessary
	if (typeof val === 'string' && key.type === Date) {
		val = new Date(val);
		val_changed = true;
	}

	const valid =
		(val instanceof key.type) // classes
		|| (typeof val === key.type.name.toLowerCase()) // number, string, boolean
		|| (key.type === Object && typeof val !== 'undefined'); // any


	if (valid && val_changed) {
		return val;
	}

	return valid;
}


export class Validate {
	private __keys__;

	constructor(data: object) {
		if (typeof data === 'undefined') {
			throw new TypeError("Can't validate undefined");
		}

		// Check if the object is already validated
		if ((<any> data).prototype instanceof Validate) {
			return;
		}

		this.__keys__.forEach((key: Key) => {

			let val = data[key.name];
			let type = Reflect.getMetadata('design:type', this, key.name);
			key.type = key.type || type;

			key.target = data;

			// Remove key from data to know which keys are left later
			// delete data[key];

			const valid = isValid(key, val);

			if (valid === false) {
				if (key.array) {
					throw new TypeError(`One or more values in '${key.name}' does not match required type '${key.type.name.toLowerCase()}'`);
				}

				if (typeof key.validator === 'function') {
					throw new TypeError(`Field '${key.name}' with type '${typeof val}' did not match custom validator`);
				}

				throw new TypeError(`Field '${key.name}' with type '${typeof val}' does not match required type '${type.name.toLowerCase()}'`);
			}

			// Value has changed, so reflect
			if (valid !== true) {
				val = valid;
			}

			// Add data to object
			this[key.name] = val;
		});


		/*
		// Check if any data wasn't used
		const unused = Object.getOwnPropertyNames(data);
		if (unused.length > 0) {
			throw new TypeError(`Invalid ${plural('field', unused.length)} '${unused.join('\', \'')}'`);
		}
		*/
	}


	/**
	*  Check if all values of this object are valid
	*/
	isValid(): boolean {
		for (let key of this.__keys__) {
			const val = this[key.name];
			let type = Reflect.getMetadata('design:type', this, key.name);
			key.type = key.type || type;

			if (! isValid(key, val)) {
				return false;
			}
		}

		return true;
	}
}
