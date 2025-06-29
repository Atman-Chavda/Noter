# Noter

Noter is a note-taking web app that runs locally on your machine. It lets you organize your notes by categories and keeps everything private by avoiding any backend servers or API calls. Your notes stay entirely on your device, giving you complete control and peace of mind.

## How to use Noter using Noter

### Step-1: Create Docker Image

This will require you to have Docker Desktop installed on your machine

Run this command in your PowerShell to create the image

```bash
docker build -t noter .
```
### Step-2: Create Docker Container from Image

Run this command in your PowerShell to create a container

```bash
docker run -p 8080:4200 noter 
```
This command will start your application on port 8080

You can use the below command so you don't have to build the image again and again

```bash
docker run -it -p 4200:4200 -v ${PWD}:/usr/src/app my-angular-app
```
This will start your application on port 4200

## How to run Noter if you don't have Docker or don't want to use Docker 

### Step-1: Install all the dependencies

To install all the dependencies, use the command given below

```bash
npm i
```

### Step-2: Build and run your application

For this use the command given below.

```bash
ng serve
```

Your application should start on port 4200.


