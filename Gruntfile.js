module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    //require('time-grunt')(grunt);

    grunt.initConfig({
        project: {
            app: 'app',
            dist: 'dist'
        },
        bootstrap: {
            src: 'bower_components/bootstrap-sass',
            pkg: grunt.file.readJSON('bower_components/bootstrap-sass/package.json'),
            banner: '/*!\n' +
                ' * Bootstrap v<%= bootstrap.pkg.version %> by @fat and @mdo\n' +
                ' * Copyright <%= grunt.template.today("yyyy") %> <%= bootstrap.pkg.author %>\n' +
                ' * Licensed under <%= _.pluck(bootstrap.pkg.licenses, "url").join(", ") %>\n' +
                ' *\n' +
                ' * Designed and built with all the love in the world by @mdo and @fat.\n' +
                ' */\n\n',
            jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }\n\n'
        },
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: [
                    // Vendor scripts.
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass/assets/javascripts/',
                        src: ['**/*.js'],
                        dest: 'app/js/bootstrap-sass/'
                    },

                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist/',
                        src: ['**/*.js', '**/*.map'],
                        dest: 'app/js/jquery/'
                    },

                    // Fonts.
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        cwd: 'bower_components/',
                        src: ['bootstrap-sass/assets/fonts/**'],
                        dest: 'app/fonts/'
                    },

                    // Stylesheets
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass/assets/stylesheets/',
                        src: ['**/*.scss'],
                        dest: 'app/scss/'
                    }
                ]
            },
        },

        watch: {
            pug: {
                files: ['<%= project.app %>/*.pug'],
                tasks: ['pug'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            sass: {
                files: ['<%= project.app %>/scss/**/*.scss'],
                tasks: ['sass:dev', 'autoprefixer', 'cssmin'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            js: {
                files: [
                    //                    '<%= project.app %>/js/*.js',
                    '<%= project.app %>/js/**/*.js',
                    '!<%= project.app %>/js/vendor/**/*.js',
                    '!<%= project.app %>/js/plugins/**/*.js'
                ],
                tasks: ['clean', 'jshint', 'concat', 'uglify'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= project.app %>/**/*.html',
                    '<%= project.app %>/*.html',
                    '<%= project.app %>/*.pug',
                    '<%= project.app %>/css/**/*.css',
                    //                    '<%= project.app %>/css/*.css',
                    '<%= project.app %>/js/**/*.js',
                    //                    '<%= project.app %>/js/*.js',
                    '<%= project.app %>/images/**/*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },


        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: false,
                    base: '<%= project.dist %>'
                }
            },
            dist: {
                options: {
                    open: false,
                    base: '<%= project.dist %>',
                    livereload: false
                }
            }
        },



        sass: {
            options: {
                //    includePaths: ['<%= bootstrap.src %>/lib/']
                includePaths: ['bower_components/bootstrap-sass/assets/stylesheets'],
                sourcemap: true
            },
            dev: {
                files: {
                    '<%= project.app %>/css/app.css': '<%= project.app %>/scss/app.scss'
                }
            },
            dist: {
                options: {
                    style: 'expanded',
                },
                files: {
                    '<%= project.app %>/css/app.css': '<%= project.app %>/scss/app.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 180 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= project.app %>/css',
                    src: '*.css',
                    dest: '<%= project.app %>/css'
                }]
            }
        },

        ///watch: {
        //    gruntfile: {
        //      files: 'Gruntfile.js',
        //      tasks: ['jshint:gruntfile'],
        //    },
        ///    scripts: {
        ///      files: ['app/scripts/*.js', 'app/styles/*.css', '!lib/dontwatch.js'],
        ///      tasks: ['concat', 'uglify'],
        ///    },
        //    test: {
        //      files: '<%= jshint.test.src %>',
        //    tasks: ['jshint:test', 'qunit'],
        //    },
        ///  },

        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
                boss: true
            },
            files: ['Gruntfile.js', 'app/js/*.js'],
        },

        concat: {
            options: {
                separator: '\n\n',
                sourcemap: true,
                //	sourceMapName: '<%= project.app %>/js/concat.map'

            },

            bootstrap: {
                options: {
                    //                    banner: '<%= bootstrap.banner %><%= bootstrap.jqueryCheck %>'
                    banner: '<%= bootstrap.jqueryCheck %>'
                },
                src: [
                    '<%= bootstrap.src %>/assets/javascripts/bootstrap/affix.js',
                    // '<%= bootstrap.src %>/js/alert.js',
                    // '<%= bootstrap.src %>/js/button.js',
                    // '<%= bootstrap.src %>/js/carousel.js',
                    '<%= bootstrap.src %>/assets/javascripts/bootstrap/collapse.js',
                    '<%= bootstrap.src %>/assets/javascripts/bootstrap/dropdown.js'
                    // '<%= bootstrap.src %>/js/modal.js',
                    // '<%= bootstrap.src %>/js/tooltip.js',
                    // '<%= bootstrap.src %>/js/popover.js',
                    // '<%= bootstrap.src %>/js/scrollspy.js',
                    // '<%= bootstrap.src %>/js/tab.js',
                    // '<%= bootstrap.src %>/js/transition.js'

                ],
                dest: '<%= project.app %>/js/plugins/bootstrap.js'
            },

            //   plugins: {
            //                files: {
            //                    '<%= project.app %>/js/plugins.js': ['<%= project.app %>/js/plugins/bootstrap.min.js', '<%= project.app %>/js/plugins/*.min.js']
            //                }
            //            }

            scripts: {
                src: ['app/js/*.js', 'app/js/jquery/jquery.js', 'app/js/plugins/bootstrap.js'],
                dest: 'app/js/all.js',
            },
            //	styles: {
            //	src: ['dist/css/*.min.css'],
            //	dest: 'dist/css/styles.min.css',
            //    },
        },
        uglify: {
            options: {
                compress: true,
                mangle: true,
                report: 'min',
                preserveComments: 'some',
                //      preserveComments: /(?:^!|@(?:license|preserve|cc_on))/
                sourceMap: true,
                sourceMapIncludeSources: true,
                //                sourceMapIn: '<%= project.app %>/js/all.js.map',
            },
            dev: {
                options: {
                    mangle: {
                        reserved: ['jQuery']
                    }
                },
            },
            dist: {
                options: {
                    //        beautify: true
                    reserved: ['jQuery']
                },
                files: {
                    'dist/js/main.min.js': ['<%= concat.scripts.dest %>']
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1,
                level: {
                    1: {
                        specialComments: 0
                    }
                }
            },
            target1: {
                files: {
                    'dist/css/styles.min.css': ['app/css/*.css']
                },
            },
            /*  target2: {
                files: [{
                  expand: true,
                  cwd: 'app/styles',
                  src: ['*.css', '!*.min.css'],
                  dest: 'dist/css',
                  ext: '.min.css'
                }]
              }*/
        },
        imagemin: {
            options: {
                cache: false
            },

            dist: {
                files: [{
                    expand: true,
                    //          cwd: '<%= project.app %>/images',
                    cwd: 'app/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img/'
                }]
            }
        },
        clean: {
            build: {
                src: ['app/js/all.js']
            }
        },

        pug: {
            compile: {
                options: {
                    data: {
                        debug: false
                        // timestamp: '<%= grunt.template.today() %>'
                        //        timestamp: '<%= new Date().getTime() %>'

                    }
                },
                files: {
                    'dist/index.html': ['app/index.pug']
                }
            },
            debug: {
                options: {
                    data: {
                        debug: true
                    }
                },
                files: {
                    'dist/debug.html': 'app/index.pug'
                }
            },
        }


    });

    //  grunt.loadNpmTasks('grunt-contrib-watch');
    //  grunt.loadNpmTasks('grunt-contrib-concat');
    //  grunt.loadNpmTasks('grunt-contrib-uglify');
    //  grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('copy-bootstrap', ['copy']);
    grunt.registerTask('build', ['clean', 'sass', 'autoprefixer', 'jshint', 'cssmin', 'concat', 'uglify', 'pug']);
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('img', ['imagemin']);



    grunt.registerTask('server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });


};



/*
    "grunt": "^1.0.1",
    "grunt-autoprefixer": "^3.0.4",
    "grunt-contrib-clean": "^1.1.0",
    "grunt-contrib-concat": "^1.0.1",
    "grunt-contrib-copy": "^1.0.0",
    "grunt-contrib-cssmin": "^2.2.1",
    "grunt-contrib-imagemin": "^2.0.1",
    "grunt-contrib-jshint": "^1.1.0",
    "grunt-contrib-qunit": "^2.0.0",
    "grunt-contrib-sass": "^1.0.0",
    "grunt-contrib-uglify": "^3.1.0",
    "grunt-contrib-watch": "^1.0.0",
    "grunt-sass": "^2.0.0",


				"Android 2.3",
				"Android >= 4",
				"Chrome >= 20",
				"Firefox >= 24",
				"Explorer >= 8",
				"iOS >= 6",
				"Opera >= 12",
				"Safari >= 6"
*/