"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the astounding ${chalk.red("generator-lyw-vue")} generator!`
      )
    );

    const prompts = [
      // {
      //   type: "confirm",
      //   name: "someAnswer",
      //   message: "Would you like to enable this option?",
      //   default: true
      // },
      {
        type: "input",
        name: "name",
        message: "Name of project:",
        default: path.basename(process.cwd())
      },
      {
        type: "input",
        name: "description",
        message: "Description:",
        default: ""
      },
      {
        type: "confirm",
        name: "includeVuex",
        message: "would you like include Vuex?",
        default: true
      }
    ];

    return this.prompt(prompts).then(answers => {
      // To access props later use this.props.someAnswer;
      this.name = answers.name;
      this.description = answers.description;
      this.includeVuex = answers.includeVuex;
      this.log(chalk.green("name: ", this.name));
      this.log(chalk.green("description: ", this.description));
      this.log(chalk.green("includeVuex: ", this.includeVuex));
    });
  }

  writing() {
    this.fs.copy(this.templatePath(), this.destinationPath(), {
      globOptions: {
        dot: true,
        ignore: ["**/store/**"]
      }
    });
    const pkgJson = {
      name: this.name,
      description: this.description
    };
    // 根据用户选择，决定是否安装vuex
    if (this.includeVuex) {
      this.fs.copy(
        this.templatePath("src/@selection/store"),
        this.destinationPath("src/store")
      );
      this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
    }
  }

  install() {
    this.installDependencies();
  }
};
