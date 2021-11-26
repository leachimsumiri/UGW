module.exports = (grunt) => {
    const config = grunt.file.readJSON('package.json');
    const development = grunt.option('mode') !== 'production';

    require('load-grunt-tasks')(grunt);

    const gruntConfig = {
        pkg: config,

        clean: {
            files: ['dist/*', '!dist/bundle.js', '!dist/bundle.min.js', '!dist/*html'],
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
