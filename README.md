# grunt-sync-config

> Keep various config files in sync (e.g. package.json and bower.json)

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sync-config --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sync-config');
```

## The "sync-config" task

If you need to keep config values in sync across various config files, this task is for you. Configure at only one place (e.g. package.json) and copy the relevant values to another (e.g. bower.json).

### Overview
In your project's Gruntfile, add a section named `sync-config` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  "sync-config": {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

Please note, that `sync-config` cannot handle multiple input files. I would have like it to handle multiple output files (such as keep bower.json and manifest.json in sync with package.json), but that is not the way Grunt handles files. So you have to configure one task for each file.

### Options

#### options.indent
Type: `Number`
Default: `2`



#### options.include
Type: `Array<String>`

An array of properties to copy from the source file to the destination file. You can also use a different property name for the destination file using `property_in_src as property_in_dest`.


### Usage Examples

In this example, we copy the name, description, version and author from `package.json` to `bower.json`.

```js
grunt.initConfig({
  "sync-config": {
    "options": {
      "indent": 4,
      'include': [
        'name',
        'description',
        'version',
        'author as authors' // is 'author' in package.json, but 'authors' in bower.json
      ]
    },
    "bower": {
      files: {
        'bower.json': 'package.json'
      }
    }
  },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- 0.2.0 Rename `properties` to `include`
- 0.1.0 Initial release
