# Project 3 - Reverb

## Project Description

Reverb (styled as ReverB) is an upcoming social media app designed for Revature employees that emphasizes personal connectivity by echoing professional growth. Users can create profiles where they can post images and create messages that resonate with their experience and insight. Users can also view and comment on posts from other profiles, and “reverb” (like) on posts that personally reverberate with them.

## Technologies Used

* Java
* Spring Boot
* Spring Data
* Spring Framework
* Firebase Authentication
* React Typescript
* React Redux
* React Bootstrap
* HTML/CSS
* Jenkins
* Docker
* Git
* Maven

## Features

* Users can register and log in
* Users can edit their personal profile including a picture and bio
* Users can create posts on their profile including images and text
* Users can view a feed of posts from other profiles
* Users can comment on posts
* Users can "reverb" (like) comments and posts
* Sessions are managed using Firebase

## Getting Started
   
* Install JDK 8, Maven, Git, and NPM.
* Create a firebase account, and a new firebase project, with no Google Analytics.
* Enable email/password as sign in provider.
* Add a web app to the firebase project.
* Clone the frontend and backend using the following commands:
* * git clone https://github.com/Revature-Reverb/frontend.git
* * git clone https://github.com/Revature-Reverb/backend.git
* Enter the your firebase project’s web app’s settings and copy the configuration properties into the front end’s firebase.ts file.
* In the same settings, on the Service Provider tab, click on Generate new private key. Copy the contents of that key into the backend’s firebase_config.json file. 
* In backend/src/main/resources, edit the applications.property file to have the correct spring.datasource parameters to the desired database.
* Run Maven Update either within an IDE (having imported the backend as a Maven project) or using the following command in the backend directory:
* * mvn clean install -U
* Start the backend as a Spring Boot Application within an IDE or using the following command in the backend directory:
* * mvn spring-boot:run
* Install frontend dependencies using the command:
* * npm install --legacy-peer-deps
* Connect to Reverbapplication-env.eba-e5qubfd5.us-west-1.elasticbeanstalk.com to view the webapp.

## Usage

Using the social media app should be intuitive and easy.
