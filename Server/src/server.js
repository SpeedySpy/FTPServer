import { count } from "console";
import { createServer } from "net";
import {list } from "./list";
const fs = require('fs'); //files stream

const tab_users = [
  { id: 1, username: "Biraveen", password: "sivaharan" }
]

export function launch(port) {
  const server = createServer((socket) => {
    console.log("New connection.");
    socket.on("data", (data) => {
      const message = data.toString();

      const [command, ...args] = message.trim().split(" ");
      

      switch(command) {

        case "USER":
          socket.write(USER(args[0])); //socket = client
          break;

        case "PASS":
          socket.write(PASS(args[0]));
          break;

        case "LIST":
         LIST(socket);
        break;

        case "PWD":
         socket.write("257, ${process.cwd()} \r\n");
          break;

        case "HELP":
          socket.write("201 - Veuillez consulter notre page d'aide");
          break;

        case "QUIT":
          socket.write("199 - closing the connection.\r\n")
          socket.destroy();
          break;
        default:
          console.log("The command is not supported:", command, args);
      
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
    });
    socket.write("220 Hello Biraveen, How are you doing today ? \r\n");
  });

  server.listen(port, () => {
    console.log("The server has started at localhost:${port}");
  });
}
// USER <username>: check if the user exist
export function VerifierUsers (username) {
    return tab_users.find((user) => {
      return user.username === username;
    });
};


export function USER (args) {
    return (VerifierUsers(args)) 
        ? "220 The user exists. \r\n" 
        : "Error 530 The user doesn't exist.\r\n"
};


// PASS <password>: authenticate the user with a password
export function Verifiermp (password) {
  let result = false;
  for (const user of tab_users) {
      if(user.password == password)
          result = true;
  }
  return result;
};



export function PASS(args) {
  let result = ''
  if(Verifiermp(args))
      result = "Message 230 Bro, your password is correct  !. \r\n";
  else
      result = "Error 530 Bro, your password is incorrect.\r\n";

      return result;
};



export function LIST(socket) {
  fs.readdir(process.cwd(), (err, files) => {
    let list="";
    files.forEach(file=>{list+=file+"\r\n"})
    socket.write(list)

  })
     
};

//  retr si on lance main.js ; récupère ce fichier , client télécharge le fichier ; RETR ... socket.write. ecrire les fichiers avec les données. 
//  Création d'un 2ème client => Pour télécharger le fichier
//  Exécute les requete sur le serveur
//  Serveur => relance le fichier 
//  Socket sauvegarde le fichier et fin
//  RETR => Reécrer un client de télécharger
