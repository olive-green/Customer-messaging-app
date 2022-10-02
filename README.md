# Customer Messaging App

# What is this?
A simple messaging app that can be used to respond to incoming questions/queries sent by our customers.
The app  allow a team of agents to respond to incoming messages from (potentially many) customers in a streamlined fashion

# App ScreenShots

## Client 
to install client dependencies run

### `npm install`

to start the client, run

### `npm start`

**Note: default client URL is `http://localhost:3000`**

## Server 

to install server dependencies, run

### `npm install`

in `/server/.env` file please change the mongoDB URL to your local mongo URL. (local MongoDB installation is needed)

to start the server

### `npm run dev`

**Note: default server URL is `http://localhost:3001`**

# App Features:

1. Messaging between customer and agent is real-time messaging which is implement through socket.io.
2. Users can register as a customer or agent.
4. Agents can see customers only.
5. Customers can only see agents.
6. Multiple agents can login at the same time, multiple customers can login at the same time.
7. Messages are stored in database. Once customer/agent sign in, they can see the previous conversation.


## Tech Stack (MERN)
MongoDB, Express, reactJS, nodeJS, Socket.io
