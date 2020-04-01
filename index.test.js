const plugin = require('./');
const postcss = require('postcss');
const test = require('ava');

function run(t, input, output, opts = {}){
    let { css } = postcss([ plugin(opts) ]).process(input, { from: undefined });
    t.is(css, output);
}

test('Replace SVG function with data-uri', t => {
    return run(t,
        'a{ background: svg("test.svg", "[fill]: red; [stroke]: blue;") no-repeat 50% 50% }',
        'a{ background: url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3e%3cpath d=\'M12%2c2a10%2c10%2c0%2c1%2c0%2c3.83.76A10%2c10%2c0%2c0%2c0%2c12%2c2Zm3%2c11H9a1%2c1%2c0%2c1%2c1%2c0-2h6a1%2c1%2c0%2c1%2c1%2c0%2c2Z\' fill=\'red\' stroke=\'blue\'/%3e%3c/svg%3e") no-repeat 50% 50% }',
        {
            paths: ['./']
        }
    );
});
