const path = require('path');
const withImages = require('next-images');
const SvgSpritePlugin = require('svg-sprite-loader/plugin');

module.exports = withImages({
    esModule: true,
    exclude: path.resolve(__dirname, './components/the-icon/assets/'),
    inlineImageLimit: 0,

    sassOptions: {
        includePaths: [
            path.resolve(__dirname, './assets/styles/'),
        ],
    },

    webpack(config) {
        const svgSpriteLoader = {
            test: /the-icon(.*?)\.svg$/,
            use: {
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: 'icons-sprite.svg',
                    publicPath: '/static/images/',
                },
            },
        };

        config.module.rules.push(svgSpriteLoader);
        config.plugins.push(new SvgSpritePlugin());

        return config;
    },
});
