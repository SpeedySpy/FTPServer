# Biraveen SIVAHARAN -Bachelor 3 Programmeur développeur

# FTP SERVER and CLIENT

In this challenge, we are going to create an FTP client and server 
For that we have several steps to respect :

## First part : USER <username>: check if the user exists

In this part, we are going to check if a user already exist in the server for that I created a program which is going to verify it.

I created a ramdom user to test and then I created a function which is going to verify the existents of the user or not followed by a phrase.

```bash
const tab_users = [
  { id: 1, username: "Biraveen", password: "sivaharan" }
]
```
But before doing we need to create a function which is going to find those users for that we are going to use this :
```bash
export function VerifierUsers (username) {
    return tab_users.find((user) => {
      return user.username === username;
    });
};
```
Now the function :
```bash
export function USER (args) {
    return (VerifierUsers(args)) 
        ? "220 The user exists. \r\n" 
        : "530 The user doesn't exist.\r\n"
};
```
Before your data base must be connected on localhost here is the code :
```bash
export function launch(port) {
  const server = createServer((socket) => {
    console.log("New connection.");
    socket.on("data", (data) => {
      const message = data.toString();
```
For execute our program we do this code :
```bash
npm run dev
```
When it is connected, from another terminal from your project re-type that code. Once both are done, you will receive this :
## From the server :
```bash
The server has started at localhost:${port}
```
## From the client :
```bash
The client is connected succesfully.
```
Let's test from the client :
```bash
USER Biraveen
Message received: 220 The user exists. 
```
If we do with a wrong USER :
```bash
USER birAveen
Message received: 530 The user doesn't exist.
```
## Second part : PASS <password>: authenticate the user with a password

In this new part, we are going to use the same server and client terminal.

So, this part is same as the first one, in this case we are going to test if the password is correct or not. For that we are going to use 2 functions first the verification of the existants of the password in the database and the second one is going to tell us if it is correct or not.

## The existants of the password 
```bash
export function Verifiermp (password) {
  let result = false;
  for (const user of tab_users) {
      if(user.password == password)
          result = true;
  }
  return result;
};
```
Then to see if the password entered is correct :
```bash
export function PASS(args) {
  let result = ''
  if(Verifiermp(args))
      result = "Message 230 Bro, your password is correct  !. \r\n";
  else
      result = "Error 530 Bro, your password is incorrect.\r\n";

      return result;
};
```
You can see there is a "if" condition which is going to verify if the password is correct with the help of the previous function. Then a phrase will appear if yes or not correct the password is. 

Let's test by doing again this command from the client terminal ( different terminal)
```bash
npm run dev
```
We put this :
```bash
PASS sivaharan
Message received: Message 230 Bro, your password is correct !.```
```
If it is not correct :
```bash
PASS Sij 
Message received: Error 530 Bro, your password is incorrect.
```
## Third part LIST : list the current directory of the server
In this third part, we are going to list all the elements of the current folder of the server.

For this we are going to use this function : 
```bash
export function LIST(socket) {
  fs.readdir(process.cwd(), (err, files) => {
    let list="";
    files.forEach(file=>{list+=file+"\r\n"})
    socket.write(list)
  })     
};
```
We must not forget to export the library of list :
```bash
import {list } from "./list";
const fs = require('fs'); //files stream
```
Let's test :
```bash
LIST
Message received: .babelrc.js
nodemon.json
node_modules
package-lock.json
package.json
README.md
src
yarn.lock
```
## Fourth part :CWD <directory>: change the current directory of the server
```bash
case "CWD":
          try{
            process.chdir(args[0]);
            socket.write(`250 New directory, ${process.cwd()} \r\n`);
          } catch(err) {
              socket.write(`non-existent file, try another path \r\n`);
          }
          console.log("command not supported:", command, args);
          break;
      }
```
Let's test :
```bash
CWD ../client
Message received: 250 New directory, C:\Users\sbira\OneDrive\Documents\my-ftp-live-main\client
```
## fifth part :PWD: display the name of the current directory of the server
```bash
PWD
Message received: 257, ${process.cwd()}
```
## Sixth part :HELP: send helpful information to the client
```bash
HELP
Message received: 201 - Veuillez consulter notre page d'aide
```
## Seventh part :QUIT: close the connection and stop the program
This is going to close the connection.
```bash
QUIT
Message received: 221 - closing connection.
```
