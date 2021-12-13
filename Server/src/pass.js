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
  