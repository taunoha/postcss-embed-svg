let postcss = require('postcss');
var SVG = require('./lib/svg');

module.exports = postcss.plugin('postcss-embed-svg', (opts = {}) => {

    SVG.init(opts);

    return (root, result) => {
        root.walkRules( (rule) => {
            rule.walkDecls(/^background|^filter|^content|image$/, (decl) => {
                var matches = null;
                var replace = null;
                var datauri = null;
                var svg = null;
                var funcName = opts.func || 'svg';
                var SVGRegExp = new RegExp(`${funcName}\\(\"([^\"]+)\"(,\\s*\"([^\"]+)\")?\\)`);
                var replaceRegExp = new RegExp(`${funcName}\\((\"[^\"]+\"|\'[^\']+\')(,\\s*(\"[^\"]+\"|\'[^\']+\'))?\\)`);

                if( ! decl.value ) {
                    return;
                }

                while( matches = SVGRegExp.exec(decl.value.replace(/'/g, '"')) )
                {
                    [___, name, ...params] = matches;

                    try {
                        svg = SVG.get(name, params[1]);
                    } catch (error) {
                        decl.warn(result, `postcss-embed-svg: ${error}`);
                    }

                    if( !svg ) {
                        return;
                    }

                    replace = replaceRegExp.exec(decl.value)[0];
                    datauri = `url("${svg}")`;

                    decl.value = decl.value.replace(replace, datauri);
                }

            });
        });
    };
});
