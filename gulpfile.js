// npm i -D yargs fs mkdirpsync path gulp gulp-cli gulp-shell gulp-sass gulp-clean-css gulp-autoprefixer gulp-html-minifier gulp-include gulp-remove-logging gulp-uglify gulp-rename gulp-strip-comments gulp-tap gulp-beautify gulp-if gulp-flatten

// npm i -D gulp-babel @babel/core @babel/plugin-transform-block-scoping @babel/plugin-transform-template-literals @babel/plugin-transform-arrow-functions

// export PATH=$PATH:/Applications/MAMP/Library/bin/

const { src, dest, watch, series, parallel, task } = require('gulp');
const path = require('path').posix;
const fs = require('fs');
const argv = require('yargs').argv;
const mkdirpsync = require('mkdirpsync');
const colors = require('colors');

const config = require('./scripts/config.js');

const start = require('./scripts/start/start.js');
const buildwp = require('./scripts/start/build-wordpress.js');

const watchcss = require('./scripts/watch/watch-css.js');
const watchphp = require('./scripts/watch/watch-php.js');
const watchimg = require('./scripts/watch/watch-img.js');
const buildcss = require('./scripts/build/build-css.js');

const buildJs = require('./scripts/watch/build-js.js');

const movephp = require('./scripts/move/move-php.js');
const movefonts = require('./scripts/move/move-fonts.js');
const movejson = require('./scripts/move/move-json.js');
const movefavicons = require('./scripts/move/move-favicons.js');
const movejs = require('./scripts/move/move-js.js');

const createBlock = require('./scripts/start/create-block.js');
const createPage = require('./scripts/create-page.js');
const createSection = require('./scripts/start/create-section.js');
const createInc = require('./scripts/create/createinc.js');

const renameSection = require('./scripts/rename-section.js');

buildwp.description = 'Download wordpress, create data base, install wordpress, create acf fields, create pages.';
start.description = 'Create local server folder, .htacces, acf-import.php, all files based on config.js';

createInc.description = 'Create a function, and include into functions.php';
createInc.flags = {
  '--src': 'name of function and filename',
  '[--comment]': 'add comment above function',
  '[--admin]': 'function will be active only in admin panel'
};

createSection.description = 'Create scss, js, php files';
createSection.flags = {
  '--src': 'name of new section'
};

renameSection.description = 'Rename scss, js, php files of the section';
renameSection.flags = {
  '--src': 'old name',
  '--dest': 'new name'
};

createPage.description = 'Create scss, js and php files of the page';
createPage.flags = {
  '--src': 'title for php file',
  '[--title]': 'title for wordpress post_title',
  '[--slug]': 'slug for wordpress'
};

buildcss.description = 'Compile scss-files (scss/*/*.scss, sections/**/*.scss, /style.scss)';
movephp.description = 'Move all php-files';

task('start', start);
task('buildwp', buildwp);

task('createinc', createInc);
task('createsection', createSection);
task('renamesection', renameSection);
task('createpage', createPage);
task('createcomponent', createBlock);

/**
 * Watch tasks
 */
task('watchcss', watchcss);
task('watchphp', watchphp);
task('watchimg', watchimg);

/**
 * Move tasks
 */
task('movephp', movephp);
task('movefonts', movefonts);
task('movejson', movejson);
task('movefavicons', movefavicons);
task('buildcss', buildcss);
task('movecss', buildcss);
task('movejs', movejs);
task('moveall', parallel(
  'movephp',
  'movecss',
  'movejs',
  'movefonts',
  'movejson',
  'movefavicons'
));

/**
 * Default tasks
 */
task('default', function(done) {
  watch(path.join(config.src.components, '**', '*.js'), buildJs);
  watch(path.join(config.src.sections, '**', '*.js'), buildJs);
  watch(path.join(config.src.js, 'components', '*.js'), buildJs);
  watch(path.join(config.src.js, 'script.js'), buildJs);
  watch(path.join(config.src.js, 'script-admin.js'), buildJs);
  watchcss(done);
  watchphp(done);
  watchimg(done);

  watch(path.join(config.src.fonts, '**', '*'), movefonts);
  watch(path.join(config.src.path, '**', '*.json'), movejson);
});


task('test', function(done) {
  const filename = path.parse('./src/scss/thanks-popup/thanks-popup.1024.scss').name;
  console.log(filename.replace(/\.[0-9]+/, ''));
  done();
});