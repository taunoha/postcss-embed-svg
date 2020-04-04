const { parseSync, stringify } = require('svgson');
const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
    set(svg, attrs, name, skipShapeWarning) {
        var svgObject = parseSync(svg);

        delete svgObject.attributes.id;
        delete svgObject.attributes['data-name'];

        for( a in svgObject.children )
        {

            if( ['title', 'style'].indexOf(svgObject.children[a].name) > -1 ) {
                continue;
            }

            if( !skipShapeWarning && svgObject.children[a].children.length ) {
                throw `${name} seems to consist of multiple shapes`;
            }

            if( skipShapeWarning && svgObject.children[a].children.length ) {
                return svgToMiniDataURI( stringify(svgObject) );
            }

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
