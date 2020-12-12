# Front End Project Starter
This is a template for automation and ease of creating front-end site or even modifieying other templates.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

1 - Need knowledge of html css sass nunjucks gulp json javascript

2 - Gulp Server.


## Installing

1 - To get started with this project clone this repository.

2 - If you are using npm type `npm install` or `yarn install` in case you are using yarn to install all node modules from the package.json file.

## Launching the Gulp Server

Open a new Terminal tab and type `gulp` if installed gulp globally or `npm gulp` , `yarn gulp`.

After running the server a folder named `build` will be created with your processed code.

## Project Structure

* use the `package.json` file to update you project name and description along with you name.
* `source` folder is where you will write the code its has templates folder that contains html/nunjucks files scss folder for styling and js for JavaScript you can add a folder with name of images that will have all your images.
* `build` this folder contains all the processed code **HTML CSS JavaScript** from the source folder.


## Gulp Envirements

This project comes with two enviements ***Development*** and ***Production***.
the gulp file in this project has issue on turning on the production envirement that makes you stuck at development envirements to fix this.
to fix this issue open gulpfile.js replace this line:

`var env = process.env.NODE_ENV === "production" || "development";`  

with this new one:

`var env = process.env.NODE_ENV === "development" || "production";`

## Authors

* **cryptomasdar** - *Initial work* - [cryptomasdar](https://github.com/cryptomasdar)
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

