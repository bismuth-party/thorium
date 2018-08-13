import {
	Validate,
	validate,
	validate_optional,
	validate_array_of,
	validate_optional_array_of,
	// because why allow `*` ?
} from './validate';


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
	bar: Bar;

	@validate_optional
	string: string;

	@validate_array_of(Number)
	numbers: number[];

	@validate_optional_array_of(Boolean)
	booleans?: boolean[];
}


const foo = new Foo({
	bar: new Baz(JSON.parse('{ "x": 10, "z": "Test OK" }')),
	numbers: JSON.parse('[ 100, 200, 300 ]'),
});

console.log((<Baz> foo.bar).z);
