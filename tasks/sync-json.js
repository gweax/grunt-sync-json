/*
 * grunt-sync-config
 * https://github.com/gweax/grunt-sync-config
 *
 * Copyright (c) 2014 Matthias Reuter
 * Licensed under the MPL-2.0 license.
 */

"use strict";

module.exports = function (grunt) {

    grunt.registerMultiTask("sync-json", "Keep various json files in sync (e.g. package.json and bower.json)", function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            "indent": 2
        });

        if (!options.hasOwnProperty("include")) {
            grunt.fail.warn("no properties to copy");
        }

        if (!Array.isArray(options.include)) {
            grunt.fail.warn("properties is not an array");
        }

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            if (f.src.length > 1) {
                grunt.fail.warn("cannot handle multiple source files");
            }

            if (!grunt.file.exists(f.dest)) {
                grunt.fail.warn("destination " + f.dest + " does not exist");
            }

            var src = grunt.file.readJSON(f.src[0]),
                dest = grunt.file.readJSON(f.dest) || {};

            options.include.forEach(function (property) {
                // allow different keys in src and dest ("key_in_src as key_in_dest")
                var names = property.split(/\s+as\s+/),
                    srcProp = names[0],
                    destProp = names[1] || srcProp;

                if (src.hasOwnProperty(srcProp)) {
                    dest[destProp] = src[srcProp];
                }
            });

            grunt.file.write(f.dest, JSON.stringify(dest, null, options.indent));

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" in sync with ' + f.src[0] + '.');
        });
    });

};
