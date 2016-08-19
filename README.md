React Portlet Demo ES2015
=========================

A Liferay portlet that just list all users and shows how React and Spring Portlet MVC can be used to create single page HTML5 portlets.

The demonstrator consists of two parts:

1. A [Spring Portlet MVC](http://docs.spring.io/spring/docs/4.0.x/spring-framework-reference/html/portlet.html) backend that handles all AJAX requests as resource requests. 
   It leverages the [thymeleaf](http://www.thymeleaf.org/) HTML5 template engine to pass the resource URL and other parameters as JavaScript variables to the frontend. 
2. An [React](https://facebook.github.io/react/) frontend that can also be run **standalone with node.js**, which can greatly accelerate the development.

## Build

### Prerequisites
* [Maven](https://maven.apache.org/) build tool (should come with your favorite IDE)
* [node.js](http://nodejs.org/) and [Gulp](http://gulpjs.com/) to build and run the HTML5/JavaScript code
* [SASS](http://sass-lang.com/) to compile the Sassy CSS into CSS

### Create the WAR file

Just run **mvn package** on the command line.

## Run

### On a Liferay 6.2 Portal

Drop the generated _liferay-react-portlet-*.war_ file in the_target_ directory into the *{liferay-home}/deploy* folder.
Alternatively execute on the command line: **mvn liferay:deploy -D\<base_path_of_your_lifery_installation\>**

### Standalone

Run **npm install** and **gulp watch** in the root directory of the project. The webapp will be available on *localhost:9000*.
     



