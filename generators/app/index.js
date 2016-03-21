'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var MicroserviceGenerator = module.exports = function MicroserviceGenerator(args, options, config) {
    yeoman.Base.apply(this, arguments);
};

util.inherits(MicroserviceGenerator, yeoman.Base);

MicroserviceGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    console.log(chalk.blue(
        '\n.............................................\n' +
        '... Spring cloud microservice generator .....\n' +
        '.............................................\n' +
        chalk.blue('\nWelcome to the Spring Cloud Microservice Generator\n\n')));

    var prompts = [
        {
            type: 'string',
            name: 'packageName',
            message: '(1/7) What is your default package name?',
            default: 'com.example.service'
        },
        {
            type: 'string',
            name: 'baseName',
            message: '(2/7) What is the base name of service?',
            default: 'myservice'
        },
        {
            type: 'string',
            name: 'serviceDescription',
            message: '(3/7) Give a short description of service.',
            default: 'Microservice infrastructure for project XYZ'
        },
        {
            type: 'string',
            name: 'configurationService',
            message: '(4/7) Do you need a configuration service?',
            default: 'Yes'
        },
        {
            type: 'string',
            name: 'registryService',
            message: '(5/7) Do you need a service registry?',
            default: 'Yes'
        },
        {
            type: 'string',
            name: 'proxyService',
            message: '(6/7) Do you need a micro-proxy service?',
            default: 'Yes'
        },
        {
            type: 'string',
            name: 'dashboardService',
            message: '(7/7) Do you need a dashboard service?',
            default: 'Yes'
        }
    ];

    this.prompt(prompts, function (props) {
        this.packageName = props.packageName;
        this.baseName = props.baseName;
        this.serviceDescription = props.serviceDescription;
        this.configurationService = props.configurationService;
        this.registryService = props.registryService;
        this.proxyService = props.proxyService;
        this.dashboardService = props.dashboardService;

        cb();
    }.bind(this));
};

MicroserviceGenerator.prototype.app = function app() {
    // ----------------------------
    // Micro service starter REST
    // ----------------------------
    var packageFolder = this.packageName.replace(/\./g, '/');
    var restDir = this.baseName + '-rest/';
    var restDirTemplate = 'microservice-starter-rest/';
    var javaDir = restDir + 'src/main/java/' + packageFolder + '/';
    var javaDirTemplate = restDirTemplate + 'src/main/java/package/';
    var dockerDir = restDir + 'src/main/docker/';
    var dockerDirTemplate = restDirTemplate + 'src/main/docker/';
    var resourceDir = restDir + 'src/main/resources/';
    var resourceDirTemplate = restDirTemplate + 'src/main/resources/';
    var testDir = restDir + 'src/test/java/' + packageFolder + '/';
    var testDirTemplate = restDirTemplate + 'src/test/java/package/';

    // Docker
    //this.template(dockerDirTemplate + 'Dockerfile', dockerDir  + 'Dockerfile', this, {});

    // Resource
    this.template(resourceDirTemplate + 'application.yml', resourceDir  + 'application.yml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    //this.template(resourceDirTemplate + 'application-dev.yml', resourceDir  + 'application-dev.yml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    //this.template(resourceDirTemplate + 'application-prod.yml', resourceDir  + 'application-prod.yml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(resourceDirTemplate + 'bootstrap.yml', resourceDir  + 'bootstrap.yml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Test
    //this.template(testDirTemplate + 'ApplicationTests.java', testDir + 'ApplicationTests.java', this, {});
    this.template(testDirTemplate + 'rest/controller/HomeControllerTest.java', testDir + 'rest/controller/HomeControllerTest.java', this, {});
    this.template(testDirTemplate + 'core/package-info.java', testDir + 'core/package-info.java', this, {});


    // Java
    this.template(javaDirTemplate + 'Application.java', javaDir + 'Application.java', this, {});
    this.template(javaDirTemplate + 'config/ApplicationSettings.java', javaDir + 'config/ApplicationSettings.java', this, {});
    this.template(javaDirTemplate + 'config/SecurityConfig.java', javaDir + 'config/SecurityConfig.java', this, {});
    this.template(javaDirTemplate + 'config/CustomPermissionEvaluator.java', javaDir + 'config/CustomPermissionEvaluator.java', this, {});
    this.template(javaDirTemplate + 'rest/controller/HomeController.java', javaDir + 'rest/controller/HomeController.java', this, {});
    this.template(javaDirTemplate + 'rest/assembler/package-info.java', javaDir + 'rest/assembler/package-info.java', this, {});
    //this.template(javaDirTemplate + 'rest/global/GlobalExceptionHandler.java', javaDir + 'rest/global/GlobalExceptionHandler.java', this, {});
    this.template(javaDirTemplate + 'core/package-info.java', javaDir + 'core/package-info.java', this, {});


    // Project
    this.template(restDirTemplate + 'pom.xml', restDir + 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // ----------------------------
    // Micro service starter MODEL
    // ----------------------------
    var modelDir = this.baseName + '-model/';
    var modelDirTemplate = 'microservice-starter-model/';
    var modelJavaDir = modelDir + 'src/main/java/' + packageFolder + '/model/';
    var modelJavaDirTemplate = modelDirTemplate + 'src/main/java/package/';
    var modelResourceDir = modelDir + 'src/main/resources/';
    var modelResourceDirTemplate = modelDirTemplate + 'src/main/resources/';
    var modelTestDir = modelDir + 'src/test/java/' + packageFolder + '/model/';
    var modelTestDirTemplate = modelDirTemplate + 'src/test/java/package/';


    // Java
    this.template(modelJavaDirTemplate + 'package-info.java', modelJavaDir + 'package-info.java', this, {});

    // Project
    this.template(modelDirTemplate + 'pom.xml', modelDir + 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // ----------------------------
    // Micro service starter IT
    // ----------------------------
    var itDir = this.baseName + '-it/';
    var itDirTemplate = 'microservice-starter-it/';
    var itResourceDir = itDir + 'src/test/resources/';
    var itResourceDirTemplate = itDirTemplate + 'src/test/resources/';
    var itTestDir = itDir + 'src/test/java/' + packageFolder + '/it/';
    var itTestDirTemplate = itDirTemplate + 'src/test/java/package/';

    // Java
    this.template(itTestDirTemplate + 'IntegrationTest.java', itTestDir + 'IntegrationTest.java', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Project
    this.template(itDirTemplate + 'pom.xml', itDir + 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Resource
    this.template(itResourceDirTemplate + 'mock1.json', itResourceDir + 'mock1.json', this, { 'interpolate': /<%=([\s\S]+?)%>/g });


    // ----------------------------
    // Micro service starter MAIN
    // ----------------------------
    this.template('pom.xml', 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template('.npmignore', '.gitignore', this, {});

    this.config.set('packageName', this.packageName);
    this.config.set('packageFolder', packageFolder);
};

MicroserviceGenerator.prototype.projectfiles = function projectfiles() {

};
