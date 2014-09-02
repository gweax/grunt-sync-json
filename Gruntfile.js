/*
 * grunt-sync-config
 * https://github.com/gweax/grunt-sync-config
 *
 * Copyright (c) 2014 Matthias Reuter
 * Licensed under the MPL-2.0 license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        copy: {
            'tests': {
                files: {
                    "tmp/src.json": "test/files/src.json",
                    "tmp/dest.json": "test/files/dest.json"
                }
            }
        },

        // Configuration to be run (and then tested).
        "sync-config": {
            "custom-options": {
                "options": {
                    "indent": 4,
                    "include": [
                        "foo",
                        "bar",
                        "baz"
                    ]
                },
                "files": {
                    "tmp/dest.json": "tmp/src.json"
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*.test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'copy', 'sync-config', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
