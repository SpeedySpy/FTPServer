import { createConnection } from "net";
import { createInterface } from "readline";

let currentCommand = '';
let isAuthenticated = false;

const client = createConnection({ port: 4242, host: 'localhost' }, () => {
  console.log("The client is connected succesfully.");
});

const r1 = createInterface ({
  input: process.stdin,
});

client.on("data", (data) => {
  //console.log("data = " + data);
  const message = data.toString();
  //console.log("message = " + message);
  console.log("Message received:", message);

  const [status, ...args] = message.trim().split(" ");

  if (status == 230 && currentCommand === "USER") {
    isAuthenticated = true;
  }

  if (status == 220) {
    currentCommand = "USER";

    r1.on("line", (input) => {
      client.write(input);
    });
  };

  if(status == 221) {
    currentCommand = "QUIT"
    client.destroy()
  }


  // console.log("currentCommand = " + currentCommand);
  // console.log("isAuthenticated = " + isAuthenticated);
});
