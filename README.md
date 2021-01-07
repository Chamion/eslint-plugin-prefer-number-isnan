# eslint-plugin-prefer-number-isnan

Eslint plugin to disallow checking for NaN by self comparison

In ES5 you can check for `NaN` values by using the `Number.isNaN` method or you can compare a variable to itself `value !== value`.
The latter method is equivalent to the former but much less readable.

Examples of incorrect code for this rule

```
const fooIsNaN = foo !== foo;

const fooIsNotNaN = foo === foo;

const alwaysFalse = NaN == NaN;
```

Examples of correct code for this rule

```
const fooIsNaN = Number.isNaN(foo);

const fooIsNotNaN = !Number.isNaN(foo);

const alwaysFalse = !Number.isNaN(NaN);
```

Code can be automatically --fixed to use `Number.isNaN`.
Comments inside the comparison expression will disable automatic --fix for that violation.

This rule will not check for degenerate comparisons like `foo == NaN` that are usually defects. There already is [use-isnan](https://eslint.org/docs/rules/use-isnan) for that.
