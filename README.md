# conditional-pragma-loader
A webpack loader to ignore remaining loaders when the file does not contain a pragma.

## Example
This will only run the babel-loader on ```*.js``` files that contain the pragma comment: ```/** @babel */```.

```javascript
// webpack.config.js
...
loaders: [
    {
        test: /\.js$/,
        loaders: [
            'conditional-pragma-loader?pragma=babel',
            'babel-loader'
        ]
    }
]
...
```

## Caveats
Currently only works when chained with one additional loader
