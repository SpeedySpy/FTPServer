export function LIST(socket) {
    fs.readdir(process.cwd(), (err, files) => {
      let list="";
      files.forEach(file=>{list+=file+"\r\n"})
      socket.write(list)
  
    })
       
  };
  