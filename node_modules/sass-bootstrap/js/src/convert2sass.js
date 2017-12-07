var vfs = require('vinyl-fs'),
  converter = require('sass-convert');

vfs.src('scss/**/*.scss')
  .pipe(converter({
    from: 'scss',
    to: 'sass',
    rename: true
  }))
  .pipe(vfs.dest('sass'));
