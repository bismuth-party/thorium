import { v4 as uuidv4 } from 'uuid';


/**
*  Turn a singular word into a plural word if `amount !== 1`
*  If `suffix_is_plural` is false (default), the `suffix_or_plural` gets
*  appended to `singular`, otherwise it gets returned as-is.
*
*  (Really, just look at its code, it's not that hard to understand)
*/
export function plural(
	singular: string,
	amount: number,
	suffix_or_plural: string = 's',
	suffix_is_plural: boolean = false,
): string {
	if (amount === 1)
		return singular;

	else if (suffix_is_plural)
		return suffix_or_plural;

	else
		return singular + suffix_or_plural;
}


/**
 *  Generate a random alphanumerical string with a length of `length`
 */
export function randomString(length: number): string {
	let s = '';

	while (s.length < length) {
		s += uuidv4().replace(/-/g, '');
	}

	return s.substr(0, length);
}
