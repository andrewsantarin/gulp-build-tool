# gulp-bundler
A tool to bundle traditional JavaScript files.

- [Features](#features)
- [Download](#download)
- [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Scripts](#scripts)

## Features
- No modules required (i.e. no `import`, `export`, `module.exports`, `require()`). Write your code as you used to do.
- Minification to reduce load times.
- Sourcemaps to provide debugging experience.
- Watchers to rebuild your bundle immediately when you apply changes to your source code.
- Configuration to run any combination of the above.

## Download
Clone the source code into your local machine. We'll assume your project's name is `my-project`:
```
git clone https://github.com/andrewsantarin/gulp-bundler.git my-project
cd my-project
```

If you prefer not to use Git, download [the .zip archive file](https://github.com/andrewsantarin/gulp-bundler/archive/master.zip) and unpack the contents yourself.

## Installation
Navigate to your local copy of the bundler if you haven't done it yet.
```
cd my-project
```

Install all dependencies
```
npm install
```

## Usage

### Configuration
Edit [gulpfile.builds.js](gulpfile.builds.js). There are two kinds of configurations: `jsConfigs` (for JS files) and `cssConfigs` (for CSS files). The configuration settings per bundle is as below:

| Field        | Type       | Default | Description                                                                                                                                                                     |
|--------------|------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`        | `string[]` |         | An array of files to bundle together. They are concatenated in the order you provide. If one file depends on the other, make sure that file comes after the file it depends on. |
| `dest`       | `string`   |         | The name of the file you want to bundle the `src` to. This is just the file, not where it's located. You can configure that in `destPath`.                                      |
| `destPath`   | `string`   |         | The location of the bundled code folder, relative to this configuration file. Do not include the bundle filename here. Use `dest` instead.                                      |
| `uglify`     | `boolean`  | false   | _(optional)_ Should the code be minified?                                                                                                                                       |
| `sourcemaps` | `boolean`  | false   | _(optional)_ Should the code be given sourcemaps for debugging on the browser?                                                                                                  |
Each entry in, for example, `jsConfigs`, compiles a certain collection of files in the order you provide to produce a bundle. Add more configuration entries to get more bundled files. This is particularly useful if you need to split your code into smaller bundled chunks.

### Scripts
- `npm run build:dev` : Runs your project scripts in development mode. Runs watchers in the background.
- `npm run build:prod` : Runs your project scripts in production mode.
