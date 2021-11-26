module.exports = (grunt) => {
    const config = grunt.file.readJSON('package.json');
    const development = grunt.option('mode') !== 'production';

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    const gruntConfig = {
        pkg: config,

        clean: {
            files: ['dist/*', '!dist/bundle.js', '!dist/bundle.min.js', '!dist/bundle.min.obfsc.js', '!dist/bundle.min.css', '!dist/*html'],
        },

        concat: {
            js: {
                files: {
                    'dist/bundle.js': [
                        'src/**/*.js',
                    ],
                },
            },
        },

        uglify: {
            js: {
                src: 'dist/bundle.js',
                dest: 'dist/bundle.min.js',
            },
        },
    };

    grunt.initConfig(gruntConfig);

    grunt.registerTask('default', ['clean']);

    if (!development) {
        grunt.registerTask('default', ['concat', 'uglify']);
    }
};
