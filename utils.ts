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
) {
	if (amount === 1)
		return singular;

	else if (suffix_is_plural)
		return suffix_or_plural;

	else
		return singular + suffix_or_plural;
}
