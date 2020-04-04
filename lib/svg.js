
const fs = require('fs');
const nodePath = require('path');
const rtrim = require('rtrim');
const svgAttrs = require('./svg-attrs');

module.exports = {
    init(opts) {
        this.paths = opts.paths || [];
        this.skipShapeWarning =  opts.skipShapeWarning || false;
        this.files = [];
    },
    get(name, attrs) {
        var paths = this.paths;
        var file = '';
        var svg = '';
        var attrs = attrs || '';

        if( attrs ) {
            attrs = attrs.split(';').map( v => v.trim().replace('[', '').replace(']', '') ).filter( v => v )
        }

        for( i = 0, len = paths.length; i < len; i++ )
        {
            let path = rtrim(paths[i], '/');

            if( fs.existsSync(path) )
            {
               let stat = fs.statSync(path);

               if( stat.isDirectory() )
               {
                    let files = fs.readdirSync(path);

                    for( j = 0, len1 = files.length; j < len1; j++ )
                    {
                        if( files[j].match(/\.svg$/) ) {
                            this.files.push(`${path}/${files[j]}`);
                        }
                    }
               }
            }
        }

        name = rtrim(name, '.svg') + '.svg';
        file = this.files.find( (file) => nodePath.basename(file) == name );

        if( file && file.length )
        {
            svg = fs.readFileSync(file, 'utf8');
            return svgAttrs.set(svg, attrs, name, this.skipShapeWarning);
        }


        throw `'${name}' not found`;
    }
};
