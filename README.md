# Front End Project Starter
This is a template for automation and ease of creating front-end site or even modifieying other templates.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

1 - Need knowledge of html css sass nunjucks gulp json javascript

2 - Gulp Server.


## Installing

To get started with this project clone this repository.

then type in the project folder `yarn install` to install all node modules that are needed to run this project.


## Gulp Envirements

This project comes with two enviements *Development* and *Production*.
the gulp file in this project has issue on turning on the production envirement that makes you stuck at development envirements to fix this.
to fix this issue open gulpfile.js replace this line:

`var env = process.env.NODE_ENV === "production" || "development";`  

with this new one:

`var env = process.env.NODE_ENV === "development" || "production";`

The style for this project is in the main file index.php.

## Authors

* **cryptomasdar** - *Initial work* - [cryptomasdar](https://github.com/cryptomasdar)
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

