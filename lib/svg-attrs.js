const { parseSync, stringify } = require('svgson');
const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
    set(svg, attrs) {
        var svgObject = parseSync(svg);

        delete svgObject.attributes.id;
        delete svgObject.attributes['data-name'];

        for( a in svgObject.children )
        {
            for( b in attrs )
            {
                let keyValuePair = attrs[b].split(':').map( (v) => v.trim() );
                let [attr, value] = keyValuePair;

                if( attr && value ) {
                    svgObject.children[a].attributes[attr]= value;
                }
            }
        }

        return svgToMiniDataURI( stringify(svgObject) );
    }
};
