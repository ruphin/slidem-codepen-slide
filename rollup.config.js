import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import includePaths from 'rollup-plugin-includepaths';
import * as path from 'path';

const includePathOptions = {
  paths: ['node_modules/@gluon', '.'],
  extensions: ['.js']
};

const globals = {};
globals[path.resolve('../@gluon/gluon/gluon.js')] = 'GluonJS';
globals[path.resolve('node_modules/@gluon/gluon/gluon.js')] = 'GluonJS';

function getConfig({ input, dest, format, uglified = true, transpiled = false, bundled = false }) {
  const conf = {
    input: input,
    output: { exports: 'named', file: dest, format, name: 'slidem', sourcemap: true, globals },
    external: [path.resolve('../@gluon/gluon/gluon.js'), path.resolve('node_modules/@gluon/gluon/gluon.js')],
    plugins: [
      includePaths(includePathOptions),
      transpiled &&
        babel({
          presets: [['env', { modules: false }]],
          plugins: ['external-helpers']
        }),
      uglified &&
        uglify({
          warnings: true,
          keep_fnames: true,
          sourceMap: true,
          compress: { passes: 2 },
          mangle: { properties: false, keep_fnames: true }
        }),
      filesize()
    ].filter(Boolean)
  };

  return conf;
}

const demo = ({ uglified = false } = {}) => {
  return {
    input: 'demo/index.js',
    output: { file: 'demo/index.nomodule.js', format: 'iife', sourcemap: false },
    plugins: [
      includePaths(includePathOptions),
      babel({
        presets: [['env', { modules: false }]],
        plugins: ['external-helpers']
      }),
      uglified &&
        uglify({
          warnings: true,
          toplevel: true,
          sourceMap: true,
          compress: { passes: 2 },
          mangle: { properties: false, keep_fnames: true }
        }),
      filesize()
    ].filter(Boolean)
  };
};

const config = [getConfig({ input: './src/slidem-codepen-slide.js', dest: 'slidem-codepen-slide.umd.js', format: 'umd' }), demo({ uglified: true })];

export default config;
