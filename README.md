# postcss-embed-svg ![Test](https://github.com/taunoha/postcss-embed-svg/workflows/Test/badge.svg)

PostCSS plugin which allows you to control the SVG's fill, stroke, opacity etc.

Use this plugin on SVGs that contain only one compound shape. The best example of a compound shape is an icon. Otherwise, you will get unexpected results.

![](preview.png)

```postcss
a {
    background: svg("test.svg", "[fill]: red; [stroke]: blue") no-repeat 50% 50%
}
```

```css
a {
    background: url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3e%3cpath d=\'M12%2c2a10%2c10%2c0%2c1%2c0%2c3.83.76A10%2c10%2c0%2c0%2c0%2c12%2c2Zm3%2c11H9a1%2c1%2c0%2c1%2c1%2c0-2h6a1%2c1%2c0%2c1%2c1%2c0%2c2Z\' fill=\'red\' stroke=\'blue\'/%3e%3c/svg%3e") no-repeat 50% 50% }
}
```

## Usage

### Install

```shell
npm install postcss-embed-svg --save-dev
```

```js
postcss([ require('postcss-embed-svg')(options) ])
```

### Options

#### options.paths

Array of paths to resolve. Paths are used to find SVG files. Default: `[]`

#### options.func

The name of the function to use in CSS. Default: `svg`

### options.skipShapeWarning

Skip adding additional attributes to SVG files that consist of multiple shapes. Default: `false`
