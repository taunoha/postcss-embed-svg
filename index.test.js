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

test('Do not try to add attitional attributes to SVG that consist of multiple shapes. Replace SVG function with data-uri.', t => {
    return run(t,
        'a{ background: svg("test-1.svg", "[fill]: red; [stroke]: blue;") no-repeat 50% 50% }',
        'a{ background: url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3e%3cg fill=\'none\' fill-rule=\'evenodd\'%3e%3cpolygon points=\'4 4 28 4 28 28 4 28\'/%3e%3cpath fill=\'white\' fill-rule=\'nonzero\' d=\'M14%2c23 L18%2c23 L18%2c20 L14%2c20 L14%2c23 Z M9%2c8 L9%2c11 L14%2c11 L14%2c14 L18%2c14 L18%2c11 L23%2c11 L23%2c8 L9%2c8 Z M7%2c18 L25%2c18 L25%2c16 L7%2c16 L7%2c18 Z\'/%3e%3c/g%3e%3c/svg%3e") no-repeat 50% 50% }',
        {
            paths: ['./'],
            skipShapeWarning: true
        }
    );
});
