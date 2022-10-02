# Customer Messaging App

# What is this?
A simple messaging app that can be used to respond to incoming questions/queries sent by our customers.
The app  allow a team of agents to respond to incoming messages from (potentially many) customers in a streamlined fashion

# App ScreenShots

# Login
![Login](https://user-images.githubusercontent.com/65541151/193476718-5d886c79-0600-46fb-9816-fd04486e2ce9.png)

# Welcome

![Welcome](https://user-images.githubusercontent.com/65541151/193476749-ec0148a9-49b2-476c-97c6-5474c9b0c797.png)

# Customer Chat
![CustomerChat](https://user-images.githubusercontent.com/65541151/193476782-e0f7642a-c625-45f1-91f0-bf363f58e065.png)

# Agent Chat 
![AgentChat](https://user-images.githubusercontent.com/65541151/193476803-6b9c7c18-b867-4cc4-8146-93d5bcd8c600.png)


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
