
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