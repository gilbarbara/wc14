'use strict';
var LIVERELOAD_PORT = 4000;
var SERVER_PORT = 3000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};
var modRewrite = require('connect-modrewrite');

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
	// show elapsed time at the end
	require('time-grunt')(grunt);
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist',
		url: 'http://beta.kollectiv.org'
	};

	grunt.initConfig({
		yeoman: yeomanConfig,
		watch: {
			options: {
				nospawn: true,
				livereload: true
			},
			compass: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['compass']
			},
			livereload: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'<%= yeoman.app %>/*.html',
					'{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
					'{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
					'<%= yeoman.app %>/scripts/templates/*.{ejs,mustache,hbs}',
					'Gruntfile.js',
					'test/spec/**/*.js'
				]
			},
			jst: {
				files: [
					'<%= yeoman.app %>/scripts/templates/*.ejs'
				],
				tasks: ['jst']
			},
			jshint: {
				files: [
					'Gruntfile.js',
					'<%= yeoman.app %>/scripts/{,*/}*.js',
					'!<%= yeoman.app %>/scripts/vendor/*'
				]
			},
			jscs: {
				files: [
					'<%= yeoman.app %>/scripts/*.js',
					'<%= yeoman.app %>/scripts/collections/*.js',
					'<%= yeoman.app %>/scripts/models/*.js',
					'<%= yeoman.app %>/scripts/routes/*.js',
					'<%= yeoman.app %>/scripts/views/*.js'
				]
			}
		},
		connect: {
			options: {
				port: SERVER_PORT,
				// change this to '0.0.0.0' to access the server from outside
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							modRewrite([
								'!\\.html|\\.js|\\.css|\\.png|\\.jpg|\\.gif|\\.svg|\\.ico|\\.woff|\\.ttf|\\.eot$ //index.html [L]'
							]),
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'bower_components'),
							mountFolder(connect, yeomanConfig.app)
						];
					}
				}
			},
			test: {
				options: {
					port: 9001,
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'bower_components'),
							mountFolder(connect, 'test'),
							mountFolder(connect, yeomanConfig.app)
						];
					}
				}
			},
			dist: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, yeomanConfig.dist)
						];
					}
				}
			}
		},
		open: {
			server: {
				path: '<%= yeoman.url %>:<%= connect.options.port %>'
			},
			test: {
				path: '<%= yeoman.url %>:<%= connect.test.options.port %>'
			}
		},
		clean: {
			dist: ['.tmp', '<%= yeoman.dist %>/*'],
			server: '.tmp'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/{,*/}*.js',
				'!<%= yeoman.app %>/scripts/vendor/*'
				//'test/spec/{,*/}*.js'
			]
		},
		jscs: {

			options: {
				config: '.jscsrc'
			},
			all: [
				'<%= yeoman.app %>/scripts/*.js',
				'<%= yeoman.app %>/scripts/collections/*.js',
				'<%= yeoman.app %>/scripts/models/*.js',
				'<%= yeoman.app %>/scripts/routes/*.js',
				'<%= yeoman.app %>/scripts/views/*.js'
			]
		},
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
				}
			}
		},
		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/styles',
				cssDir: '.tmp/styles',
				imagesDir: '<%= yeoman.app %>/images',
				javascriptsDir: '<%= yeoman.app %>/scripts',
				fontsDir: '<%= yeoman.app %>/styles/fonts',
				importPath: 'bower_components',
				relativeAssets: true,
				raw: 'require "sass-css-importer"'
			},
			dist: {},
			server: {
				options: {
					debugInfo: true
				}
			}
		},
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				dirs: ['<%= yeoman.dist %>']
			}
		},
		imagemin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>/images',
						src: '{,*/}*.{png,jpg,jpeg}',
						dest: '<%= yeoman.dist %>/images'
					}
				]
			}
		},
		cssmin: {
			dist: {
				files: {
					'<%= yeoman.dist %>/styles/main.css': [
						'.tmp/styles/{,*/}*.css',
						'<%= yeoman.app %>/styles/{,*/}*.css'
					]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					/*removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true*/
				},
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>',
						src: '*.html',
						dest: '<%= yeoman.dist %>'
					}
				]
			}
		},
		copy: {
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= yeoman.app %>',
						dest: '<%= yeoman.dist %>',
						src: [
							'*.{ico,txt,png}',
							'.htaccess',
							'images/{,*/}*.{webp,gif,jpg,jpeg,png,svg}',
							'styles/fonts/*.*'
						]
					},
					{
						expand: true,
						flatten: true,
						cwd: 'bower_components/',
						dest: '<%= yeoman.dist %>/styles/fonts/',
						src: [
							'bootstrap-sass/vendor/assets/fonts/bootstrap/*.*'
						]
					},
					{
						expand: true,
						flatten: true,
						cwd: '',
						dest: '<%= yeoman.dist %>',
						src: [
							'README.md'
						]
					}
				]
			},
			server: {
				files: [
					{
						expand: true,
						flatten: true,
						cwd: 'bower_components/',
						dest: '.tmp/styles/fonts/',
						src: [
							'bootstrap-sass/vendor/assets/fonts/bootstrap/*.*'
						]
					}
				]
			}
		},
		jst: {
			compile: {
				files: {
					'.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.ejs']
				}
			}
		},
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css'
					]
				}
			}
		}
	});

	grunt.registerTask('createDefaultTemplate', function () {
		grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
	});

	grunt.registerTask('serve', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
		}

		if (target === 'test') {
			return grunt.task.run([
				'clean:server',
				'createDefaultTemplate',
				'jst',
				'compass:server',
				'connect:test',
				'open:test',
				'watch:livereload'
			]);
		}

		grunt.task.run([
			'clean:server',
			'jshint',
			'jscs',
			'createDefaultTemplate',
			'jst',
			'copy:server',
			'compass:server',
			'connect:livereload',
			'open:server',
			'watch'
		]);
	});

	grunt.registerTask('watch:test', function () {
		var config = {
			options: {
				interrupt: true
			},
			test: {
				files: ['/scripts/{,*/}*.js', 'test/spec/**/*.js'],
				tasks: ['test:true']
			}
		};

		grunt.config('watch', config);
		grunt.task.run('watch');
	});

	grunt.registerTask('test', function (isConnected) {
		isConnected = Boolean(isConnected);
		var testTasks = [
			'clean:server',
			'createDefaultTemplate',
			'jst',
			'compass',
			'connect:test',
			'mocha',
			'watch:test'
		];

		if (!isConnected) {
			return grunt.task.run(testTasks);
		} else {
			// already connected so not going to connect again, remove the connect:test task
			testTasks.splice(testTasks.indexOf('connect:test'), 1);
			return grunt.task.run(testTasks);
		}
	});

	grunt.registerTask('build', [
		'clean:dist',
		'jshint',
		'jscs',
		'createDefaultTemplate',
		'jst',
		'compass:dist',
		'useminPrepare',
		//'imagemin',
		'htmlmin',
		'concat',
		'cssmin',
		'uglify',
		'copy:dist',
		'rev',
		'usemin'
	]);

	grunt.registerTask('default', [
		'jshint',
		'test',
		'build'
	]);
};
