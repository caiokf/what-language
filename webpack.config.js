var combineLoaders = require('webpack-combine-loaders');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    //sources.push('webpack/hot/only-dev-server');
    //sources.push('webpack-dev-server/client?http://localhost:8080');
  }

  return sources;
}

module.exports = function() {
  return {
    entry: {
      bundle: getEntrySources([
        './client/app.js'
      ])
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: ['react-hot-loader', 'jsx-loader', 'babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.sass$/,
          loader: combineLoaders([
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ])
        }
      ],
    },
    output: {
      filename: './public/bundle.js'
    }
  };
}




//
// turn browserify(paths.clientEntrypoint)
//   .transform('babelify')
//   .transform(sassify, {
//     'auto-inject': true,
//     base64Encode: false,
//     sourceMap: false
//   })
//   .bundle()
//   .on('error', console.error.bind(console))
//   .pipe(source('bundle.js'))
//   .pipe(buffer())
//   .pipe(gulp.dest(paths.clientBundleDir))
//   .pipe(livereload());
//
//
//   lientEntrypoint: './client/app.js',
//   clientBundleDir: './public',
//   clientJsSourceFiles: [
//     './client/**/*.js',
//   ],
//   clientSourceFiles: [
//     './client/**/*.js',
//     './client/**/*.scss',
//     './client/**/*.sass',
//   ],
