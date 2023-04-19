// TODO: Specify ESLINTRC RULES AND MAKE THEM COMPATIBLE WITH PRETTIER
// CURRENTLY: SPACES AROUND PARANTHESISE ARE REQUIRED
// AND SINGLE QUOTES ARE REQUIRED BY ESLINT

// Define the required packages
const gulp = require("gulp");
const { series, parallel } = require("gulp");
const concat = require("gulp-concat");
const wrap = require("gulp-wrap");
const minify = require("gulp-minify");
const cleanCSS = require("gulp-clean-css");
const stylus = require("gulp-stylus");

const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const zip = require("gulp-zip");
const bisyncFiles = require("bisync-files");
const babel = require("gulp-babel");
// Write config
// const eslint = require(   'gulp-eslint'   );
const autoprefixer = require("gulp-autoprefixer");
let projectSettings;

/**
 * Will load dev-settings, but revert to build-settings if nothing is defined (    for jenkins   )
 */
try {
	projectSettings = require("./dev-settings.json");
} catch (error) {
	try {
		projectSettings = require("./build-settings.json");
	} catch (err) {
		throw err;
	}
}

// // ES LINTING
// gulp.task(    'eslint', (    cb   ) => {
//     gulp.src(    ['scripts/*.js']   )
//         // eslint(       ) attaches the lint output to the 'eslint' property
//         // of the file object so it can be used by other modules.
//         .pipe(    eslint(       )   )
//         // eslint.format(       ) outputs the lint results to the console.
//         // Alternatively use eslint.formatEach(       ) (    see Docs   ).
//         .pipe(    eslint.format(       )   )
//         // To have the process exit with an error code (    1   ) on
//         // lint error, return the stream and pipe to failAfterError last.
//         .pipe(    eslint.failAfterError(       )   );
//     cb(       );
// }   );

/**
 * Collect static will copy static files from your root-directory based on the file-extensions defined in
 * 'root_dir_file_extensions'. It will also copy over all directories from 'project_directories' to dist. If you add
 * new root-folders to the project these must be added to your settings.
 */
gulp.task("collect-static", function (cb) {
	projectSettings.root_dir_file_extensions.forEach(function (item) {
		gulp.src("*." + item).pipe(gulp.dest(projectSettings.dist + "/"));
	});
	projectSettings.project_directories.forEach(function (item) {
		gulp
			.src(item + "/**")
			.pipe(gulp.dest(projectSettings.dist + "/" + item + "/"));
	});
	cb();
});

gulp.task("bi-sync-folders", function (cb) {
	projectSettings.bisynced_directories.forEach(function (folder) {
		bisyncFiles.watch(folder, projectSettings.dist + "/" + folder);
	});
	cb();
});

gulp.task("copy-synced-dirs", function (cb) {
	projectSettings.bisynced_directories.forEach(function (folder) {
		gulp
			.src(folder + "/**")
			.pipe(gulp.dest(projectSettings.dist + "/" + folder + "/"));
	});
	cb();
});

// CSS GULP CONFIG  CSS GULP CONFIG CSS GULP CONFIG CSS GULP CONFIG CSS GULP CONFIG CSS GULP CONFIG CSS GULP CONFIG CSS GULP CONFIG CSS GULP CONFIG
// CSS GULP CONFIG  CSS GULP CONFIG CSS GULP CONFIG CSS GULP CONFIG CSS GULP CONFIG CSS GULP CONFIG CSS GULP CONFIG CSS GULP CONFIG CSS GULP CONFIG

gulp.task("compile-css-frontend", function (cb) {
	gulp
		.src(["./stylus/frontend.styl"])
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 2 versions"],
				cascade: false,
			})
		)
		.pipe(concat(projectSettings.dist + "/css/frontend.css"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./"));

	cb();
});

// JAVSCRIPT GULP CONFIG  JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG
// JAVSCRIPT GULP CONFIG  JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG JAVSCRIPT GULP CONFIG

gulp.task("compile-js-frontend", function (cb) {
	gulp
		.src([
			"js/shared/**/*.js",
			"js/frontend/base/**/*.js",
			"js/frontend/helpers/**/*.js",
			"js/frontend/modules/**/*.js",

			"!js/frontend/base/wrapper.js", // Exclude the wrapper, since we will use this to wrap the concatenated files
		])
		.pipe(
			babel({
				presets: [
					[
						"@babel/preset-env",
						{
							modules: "commonjs",
							targets: {
								node: "current",
							},
						},
					],
				],
			})
		)
		.pipe(concat(projectSettings.dist + "/js/frontend.js")) // Concat into 1 file
		.pipe(wrap({ src: "js/frontend/base/wrapper.js" })) // Wrap the concatenation result in a wrapper
		.pipe(gulp.dest("./")); // Output result in js folder
	cb();
});

gulp.task("compile-js-backend", function (cb) {
	gulp
		.src([
			"js/shared/**/*.js",
			"js/backend/base/**/*.js",
			"js/backend/helpers/**/*.js",
			"js/backend/modules/**/*.js",

			"!js/backend/base/wrapper.js", // Exclude the wrapper, since we will use this to wrap the concatenated files
		])
		.pipe(
			babel({
				presets: [
					[
						"@babel/preset-env",
						{
							modules: "commonjs",
							targets: {
								node: "current",
							},
						},
					],
				],
			})
		)
		.pipe(concat(projectSettings.dist + "/js/backend.js")) // Concat into 1 file
		.pipe(wrap({ src: "js/backend/base/wrapper.js" })) // Wrap the concatenation result in a wrapper
		.pipe(gulp.dest("./")); // Output result in js folder

	cb();
});

// This task will compile the project javascript
gulp.task(
	"compile-js",
	gulp.series("compile-js-frontend", "compile-js-backend", function (cb) {
		cb();
	})
);

// This task will call the necessary tasks to compile the project
gulp.task(
	"compile",
	gulp.series("compile-js" /*, 'compile-css' */, function (cb) {
		cb();
	})
);

// Will compile css
gulp.task(
	"compile-css",
	gulp.series("compile-css-frontend", function (cb) {
		cb();
	})
);

/**
 * Will watch SCSS and JS files and compile them on change.
 */
gulp.task(
	"watch",
	gulp.series("compile", function (cb) {
		gulp.watch("stylus/**/*.styl", gulp.series("compile-css"));
		gulp.watch(
			"js/backend/**/*.js",
			{ maxListeners: 999 },
			gulp.series("compile-js-backend")
		);
		gulp.watch("js/frontend/**/*.js", gulp.series("compile-js-frontend"));
		gulp.watch(
			"js/shared/**/*.js",
			gulp.series("compile-js-frontend", "compile-js-backend")
		);
		gulp.watch("css/**/*.css", gulp.series("collect-static"));
		projectSettings.root_dir_file_extensions.forEach(function (item) {
			gulp.watch("./*." + item, gulp.series("collect-static"));
		});
		projectSettings.project_directories.forEach(function (item) {
			gulp.watch(item + "/**/*", gulp.series("collect-static"));
		});

		cb();
	})
);

// MINIFY CSS & JS CONFIG MINIFY CSS & JS CONFIG MINIFY CSS & JS CONFIG MINIFY CSS & JS CONFIG MINIFY CSS & JS CONFIG MINIFY CSS & JS CONFIG MINIFY CSS & JS CONFIG
// MINIFY CSS & JS CONFIG MINIFY CSS & JS CONFIG MINIFY CSS & JS CONFIG MINIFY CSS & JS CONFIG MINIFY CSS & JS CONFIG MINIFY CSS & JS CONFIG MINIFY CSS & JS CONFIG

// Task to minify js files
gulp.task(
	"minify-js",
	gulp.series("compile-js", function (cb) {
		gulp
			.src([
				projectSettings.dist + "/js/*.js",
				"!" + projectSettings.dist + "/js/*-min.js", // Exclude any minified scripts from task
			])
			.pipe(minify()) // Create a minified script
			.pipe(gulp.dest(projectSettings.dist + "/js")); // Output result in js folder
		cb();
	})
);

// Task to minify css
gulp.task(
	"minify-css",
	gulp.series("compile-css", function (cb) {
		gulp
			.src([
				projectSettings.dist + "/css/*.css",
				"!" + projectSettings.dist + "/css/*-min.css",
			])
			.pipe(cleanCSS({ compatibility: "ie8" }))
			.pipe(
				rename({
					suffix: "-min",
				})
			)
			.pipe(gulp.dest(projectSettings.dist + "/css"));
		cb();
	})
);

// Task for minifying JS & CSS
gulp.task(
	"minify",
	gulp.series("minify-js", "minify-css", function (cb) {
		cb();
	})
);

// Compresses theme into installable zip
gulp.task(
	"compress",
	gulp.series("compile", "collect-static", function (cb) {
		gulp
			.src(projectSettings.dist + "/**")
			.pipe(zip(projectSettings.theme_name + ".zip"))
			.pipe(gulp.dest("./"));
		cb();
	})
);

// Deletes all compiled code and zip's.
gulp.task("clean", function (cb) {
	gulp.del([projectSettings.dist, projectSettings.theme_name + ".zip"]);

	cb();
});

gulp.task(
	"build",
	gulp.series(
		"compile",
		"collect-static",
		"copy-synced-dirs",
		"minify",
		"compress",
		function (cb) {
			cb();
		}
	)
);

gulp.task("default", gulp.parallel("watch", "bi-sync-folders"));

exports.default = parallel("watch", "bi-sync-folders");
