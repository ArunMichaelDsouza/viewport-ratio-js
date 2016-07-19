module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['src/viewport-ratio.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
        },
        uglify: {
            target: {
                files: {
                    'build/viewport-ratio.min.js': ['src/viewport-ratio.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['watch']);
}
