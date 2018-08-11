import { Validate, validate, validate_optional } from './validate';


class Bar extends Validate {
	@validate
	x: number;

	@validate_optional
	y?: number;
}

class Baz extends Bar {
	@validate
	z: string;
}

class Foo extends Validate {
	@validate
	string: string;

	@validate_optional
	optstring?: string;

	@validate
	number: number;

	@validate_optional
	boolean?: boolean;

	@validate
	bar: Bar;
}


const foo = new Foo({
	string: JSON.parse('"100"'),
	number: JSON.parse('100'),
	boolean: JSON.parse('false'),
	bar: new Baz(JSON.parse('{ "x": 10, "z": "Test OK" }')),
});

console.log((<Baz> foo.bar).z);
