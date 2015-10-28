require.config({
    baseUrl: 'js',
    paths: {
        backbone:   'vendor/backbone-min',
        jquery:     'vendor/jquery.min',
        text:       'vendor/text',
        underscore: 'vendor/underscore-min',
        react: 'vendor/react.min',
        JSXTransformer: 'vendor/JSXTransformer',
        jsx: 'vendor/jsx'
    },
    shim: {
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      }
    }
});

require(['jsx!init']);
