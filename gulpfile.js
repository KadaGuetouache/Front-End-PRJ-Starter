// Imports
const { src, dest, series, parallel, watch } = require( 'gulp' );
const sass = require( 'gulp-sass' );
const plumber = require( 'gulp-plumber' );
const autoprefixer = require( 'gulp-autoprefixer' );
const jsUglify = require( 'gulp-uglify' );
const htmlMinify = require( 'gulp-minify-html' );
const babel = require( 'gulp-babel' );
const gulpif = require( 'gulp-if' );
const data = require( 'gulp-data' );
const concat = require( 'gulp-concat' );
const gulpIf = require( 'gulp-if' );
const imagemin = require( 'gulp-imagemin' );
const nunjucks = require( 'gulp-nunjucks-render' );
const del = require( 'del' );
const fs = require( 'fs' );
const browserSync = require( 'browser-sync' ).create(  );

var outputDir = "";
var sassState = "";

var env = process.env.NODE_ENV === "production" || "development";

if (env == "development") {
	outputDir = "./dist";
	sassState = "expanded";
} else if (env == "production") {
	outputDir = "./production";
	sassState = "compressed";
} 
// Paths
//const scssPages = [ "scss/index.scss", "scss/pageOne.scss", "scss/pageTwo.scss" ];
//const htmlPages = [ "./pages/index.html", "./pages/common/pageOne.html", "./pages/common/pageTwo.html" ];
//const templates = "./templates/*.njk";
//const scripts = "./js/**/*.js";

const scssPages = [ "./source/scss/main.scss", "./source/scss/lib/*.css" ];
const templates = [ "./source/templates/index.njk" ];
const scripts = [ "./source/js/**/*.js", "./source/js/lib/*.js" ];
const imgs = [ "./source/SourceApp/images/*.*" ];


// Remove source files
async function remove(){ 
	await del(["./production", "./dist"]);
}

// Nunjucks and HTML 
function Nunjucks(cb){ 
	src( templates, { allowEmpty: true } )
		.pipe( plumber(  ) )
		.pipe(data(function() {
			 //return require('./source/data/user.json')
			//return JSON.parse( fs.readFileSync( './source/data/user.json' ) )
		 }))
		.pipe( nunjucks( { 
			ext: '.html',
			path: './source/templates'
		} ) )
		.pipe( gulpif( env === "production", htmlMinify(  ) ) )
		.pipe( dest( `${outputDir}` ) )

	cb()
}

// Sass
function styles(cb) {
	src( scssPages[ 0 ], { allowEmpty: true } )
		.pipe( sass({ outputStyle: sassState }).on( 'error', sass.logError ) )
		.pipe( dest( `${outputDir}/styles` ) )
		.pipe( gulpif( env === "production", autoprefixer(  ) ) )
		.pipe( browserSync.stream() )

	// move lib folder
	src( scssPages[ 1 ], { allowEmpty: true } )
		.pipe( dest( `${outputDir}/styles/lib` ) )
		.pipe( gulpif( env === "production", autoprefixer(  ) ) )
		.pipe( browserSync.stream() )

		cb()
}

// Javascript
function js(cb) {
	src( scripts[ 0 ], { allowEmpty: true } )
		.pipe( babel( { presets: [ '@babel/env' ] } ) )
		.pipe( concat( 'main.js' ) )
		.pipe( gulpif( env === "production", jsUglify(  ) ) )
		.pipe( dest( `${outputDir}/scripts` ) )

	src( scripts[ 1 ], { allowEmpty: true } )
		.pipe( gulpif( env === "production", jsUglify(  ) ) )
		.pipe( dest( `${outputDir}/scripts/lib` ) )

	cb()
}

function images(cb){ 
	src( imgs, { allowEmpty: true } )	
		.pipe( imagemin([
			imagemin.mozjpeg({quality: 70, progressive: true}),
			imagemin.optipng({optimizationLevel: 5})
		]) )
		.pipe( dest( `${outputDir}/images` ) )
	cb();
}

// Liver Server
function server(cb) {
	browserSync.init({
		open: false,
		server: {
			baseDir: `${outputDir}`
		}   
	})

	cb();
}


function watcher(cb) {
	watch( './source/scss/**/**/*.scss', styles )
	watch( scripts ).on( 'change', parallel( js, browserSync.reload ) )
	watch( [ './source/templates/**/*.njk', './source/data/*.json' ] ).on( 'change', series( Nunjucks, browserSync.reload ) )

	cb();
}

exports.default = series( remove, parallel( Nunjucks, styles, js ), server, watcher, images )
