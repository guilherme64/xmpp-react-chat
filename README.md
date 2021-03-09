
# Simple XMPP Chat


## Api implementation
The app was implemented using the StanzaJS library to almost every XMPP interaction between users and messages.
The features involving user management were created using the ejabberdAPI, with the provided authentication.
I also created a class where I stored all the methods related to the ejabberdApi.

## Front-end implementation
The front-end was developed using React latest version.
The core of this app is based in React Hooks and Redux.
Since the app is a simple version of a chat and due to the time of development, I didn't create separate reducers, using only one file to all the state changes of the app. 
The main login logic is inside the Login component. The structure of this part of the code bothers me, so I would change that eventually.

## How Long I took
I started developing the app on last Monday (March 1st), but due to some bugs I encountered while creating the environment using docker, I only started developing the app on Wednesday (March 3rd).
Since this day, I worked roughly 4 hours a day to develop this app.

## How to Deploy

 A docker file was added to the project. to build the image run the command

    docker build -t sample:dev .
    
After the build is finished, run the command to deploy the app on localhost:3001.

    docker run -v **${**PWD**}**:/app -v /app/node_modules -p 3001:3000 --rm sample:dev


> Written with [StackEdit](https://stackedit.io/).