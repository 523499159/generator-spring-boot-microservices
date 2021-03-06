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

MicroserviceGenerator.prototype.configService = function configService() {
    // ----------------------------
    // Micro service starter REST
    // ----------------------------
    var packageFolder = this.packageName.replace(/\./g, '/');
    var configurationServiceTemplate = 'configuration-service/';


    var serviceDir = 'configuration-service/';
    var serviceDirTemplate = 'configuration-service/';
    var javaDir = serviceDir + 'src/main/java/' + packageFolder + '/';
    var javaDirTemplate = serviceDirTemplate + 'src/main/java/';
    var resourceDir = serviceDir + 'src/main/resources/';
    var resourceConfigDir = resourceDir + 'src/main/resources/';
    var resourceDirTemplate = serviceDirTemplate + 'src/main/resources/';
    var resourceConfigDirTemplate = resourceDirTemplate + 'config/';
    var commonFileDir = 'common/';

    // Resource
    this.template(resourceDirTemplate + 'application.properties', resourceDir  + 'application.properties', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(resourceConfigDirTemplate + 'eureka-service.properties', resourceConfigDir  + 'eureka-service.properties', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    // this.template(resourceConfigDirTemplate + 'zipkin-service.properties', resourceConfigDir  + 'zipkin-service.properties', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(resourceConfigDirTemplate + 'zuul-service.properties', resourceConfigDir  + 'zuul-service.properties', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Java
    this.template(javaDirTemplate + 'ConfigurationServiceApplication.java', javaDir + 'ConfigurationServiceApplication.java', this, {});

    // Test
    // this.template(testDirTemplate + 'rest/controller/HomeControllerTest.java', testDir + 'rest/controller/HomeControllerTest.java', this, {});
    // this.template(testDirTemplate + 'core/package-info.java', testDir + 'core/package-info.java', this, {});

    // Project
    this.template(commonFileDir + '.gitignore', serviceDir + '.gitignore', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(commonFileDir + 'mvnw', serviceDir + 'mvnw', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(commonFileDir + 'mvnw.cmd', serviceDir + 'mvnw.cmd', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Common files for every project
    this.template(serviceDirTemplate + 'pom.xml', serviceDir + 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // ----------------------------
    // Micro service starter MAIN
    // ----------------------------
    this.config.set('packageName', this.packageName);
    this.config.set('packageFolder', packageFolder);
};

MicroserviceGenerator.prototype.eurekaService = function eurekaService() {
    var packageFolder = this.packageName.replace(/\./g, '/');

    var serviceDir = 'eureka-service/';
    var serviceDirTemplate = 'eureka-service/';
    var javaDir = serviceDir + 'src/main/java/' + packageFolder + '/';
    var javaDirTemplate = serviceDirTemplate + 'src/main/java/';
    var resourceDir = serviceDir + 'src/main/resources/';
    var javaConfigDir = resourceDir + 'src/main/resources/';
    var resourceDirTemplate = serviceDirTemplate + 'src/main/resources/';
    var commonFileDir = 'common/';

    // Resource
    this.template(resourceDirTemplate + 'bootstrap.properties', resourceDir  + 'bootstrap.properties', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Java
    this.template(javaDirTemplate + 'EurekaServiceApplication.java', javaDir + 'EurekaServiceApplication.java', this, {});

    // Project
    this.template(commonFileDir + '.gitignore', serviceDir + '.gitignore', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(commonFileDir + 'mvnw', serviceDir + 'mvnw', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(commonFileDir + 'mvnw.cmd', serviceDir + 'mvnw.cmd', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Common files for every project
    this.template(serviceDirTemplate + 'pom.xml', serviceDir + 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
};

MicroserviceGenerator.prototype.zuulService = function zuulService() {
    var packageFolder = this.packageName.replace(/\./g, '/');

    var serviceDir = 'zuul-service/';
    var serviceDirTemplate = 'zuul-service/';
    var javaDir = serviceDir + 'src/main/java/' + packageFolder + '/';
    var javaDirTemplate = serviceDirTemplate + 'src/main/java/';
    var resourceDir = serviceDir + 'src/main/resources/';
    var resourceDirTemplate = serviceDirTemplate + 'src/main/resources/';
    var commonFileDir = 'common/';

    // Resource
    this.template(resourceDirTemplate + 'bootstrap.properties', resourceDir  + 'bootstrap.properties', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Java
    this.template(javaDirTemplate + 'ZuulProxyClientApplication.java', javaDir + 'ZuulProxyClientApplication.java', this, {});
    this.template(javaDirTemplate + 'config/ZuulServiceConfiguration.java', javaDir + 'config/ZuulServiceConfiguration.java', this, {});
    this.template(javaDirTemplate + 'config/ZuulServiceConfiguration.java', javaDir + 'config/ZuulServiceConfiguration.java', this, {});

    // Project
    this.template(commonFileDir + '.gitignore', serviceDir + '.gitignore', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(commonFileDir + 'mvnw', serviceDir + 'mvnw', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(commonFileDir + 'mvnw.cmd', serviceDir + 'mvnw.cmd', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Common files for every project
    this.template(serviceDirTemplate + 'pom.xml', serviceDir + 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
};

MicroserviceGenerator.prototype.zipkinServer= function zipkinServer() {
    var packageFolder = this.packageName.replace(/\./g, '/');

    var serviceDir = 'zipkin-server/';
    var serviceDirTemplate = 'zipkin-server/';
    var javaDir = serviceDir + 'src/main/java/' + packageFolder + '/';
    var javaDirTemplate = serviceDirTemplate + 'src/main/java/';
    var resourceDir = serviceDir + 'src/main/resources/';
    var resourceDirTemplate = serviceDirTemplate + 'src/main/resources/';
    var commonFileDir = 'common/';

    // Resource
    this.template(resourceDirTemplate + 'bootstrap.properties', resourceDir  + 'bootstrap.properties', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Java
    this.template(javaDirTemplate + 'ZipkinServerApplication.java', javaDir + 'ZipkinServerApplication.java', this, {});

    // Project
    this.template(commonFileDir + '.gitignore', serviceDir + '.gitignore', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(commonFileDir + 'mvnw', serviceDir + 'mvnw', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(commonFileDir + 'mvnw.cmd', serviceDir + 'mvnw.cmd', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Common files for every project
    this.template(serviceDirTemplate + 'pom.xml', serviceDir + 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
};

MicroserviceGenerator.prototype.hystrixDashboard= function hystrixDashboard() {
    var packageFolder = this.packageName.replace(/\./g, '/');

    var serviceDir = 'hystrix-dashboard/';
    var serviceDirTemplate = 'hystrix-dashboard/';
    var javaDir = serviceDir + 'src/main/java/' + packageFolder + '/';
    var javaDirTemplate = serviceDirTemplate + 'src/main/java/';
    var resourceDir = serviceDir + 'src/main/resources/';
    var resourceDirTemplate = serviceDirTemplate + 'src/main/resources/';
    var commonFileDir = 'common/';

    // Resource
    this.template(resourceDirTemplate + 'bootstrap.properties', resourceDir  + 'bootstrap.properties', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Java
    this.template(javaDirTemplate + 'HystrixDashboardApplication.java', javaDir + 'HystrixDashboardApplication.java', this, {});

    // Project
    this.template(commonFileDir + '.gitignore', serviceDir + '.gitignore', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(commonFileDir + 'mvnw', serviceDir + 'mvnw', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template(commonFileDir + 'mvnw.cmd', serviceDir + 'mvnw.cmd', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Common files for every project
    this.template(serviceDirTemplate + 'pom.xml', serviceDir + 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
};


MicroserviceGenerator.prototype.projectfiles = function projectfiles() {

};
