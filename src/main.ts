import "./style.css";

// interface User{
//   firstName: string;
//   lastName: string;
//   mobileNumber: string;
//   email: string;
//   dob: string;
//   accountNumber: string;
//   cardNumber: string;
//   password: string;
//   balance: number;
// }
// interface Transaction {
//   fromAccount: string;
//     toAccount: string;
//     amount: number;
//     transactionDate: Date;
// }

// interface BankData {
//   users: User[];
//   transactions: Transaction[];
// }

// // ایجاد شماره حساب و پسورد و شماره کارت رندوم
// const generateRandomNumber=(length:number):string=>{
//   return Math.random().toString().slice(2,2+length);
// }
// const generateAccountNumber = (): string => generateRandomNumber(10);
// const generateCardNumber = (): string => generateRandomNumber(16);
// const generatePassword = (): string => generateRandomNumber(6);
// // console.log(generateAccountNumber(),generateCardNumber(),generatePassword());

// const createUser = (firstName: string, lastName: string, mobileNumber: string, email: string, dob: Date): User => {
//   const accountNumber = generateAccountNumber();
//   const cardNumber = generateCardNumber();
//   const password = generatePassword();

//   const user: User = {
//       firstName,
//       lastName,
//       mobileNumber,
//       email,
//       dob,
//       accountNumber,
//       cardNumber,
//       password,
//       balance: 0 // Initial balance is 0
//   };

//   return user;
// };
// // Create a new user
// const newUser = createUser("negin", "souri", "0987654321", "negin.souri@gmail.com", new Date("2001-10-24"));
// console.log(newUser);

// // واریز پول
// const depositMoney= (user: User, amount: number): void =>{
// if(amount<=0){
//   console.log("موجودی باید بیشتر از 0 باشد ");
//   return;
// }
// user.balance+=amount
// console.log(`واریز شد ${amount}. موجودی جدید ${user.balance} می باشد`);
// }
// // Deposit money
// depositMoney(newUser, 1000);

// // برداشت پول
// const withdrawMoney = (user: User, amount: number): void => {
//   if (amount <= 0) {
//       console.log("موجودی باید بیشتر از صفرباشد.");
//       return;
//   }
//   if (user.balance < amount) {
//       console.log("موجودی کافی نیست.");
//       return;
//   }
//   user.balance -= amount;
//   console.log(`برداشت ${amount}. موجودی جدید ${user.balance}`);
// };
// // Withdraw money
// withdrawMoney(newUser, 200);

// // کار به کارت
// const transferMoney =(sourceUser:User,destinationUser: User, amount: number):void=>{
//   if (sourceUser.balance < amount) {
//     console.log("موجودی کافی نمی باشد");
//     return;
// }
// sourceUser.balance -= amount;
// destinationUser.balance += amount;
// console.log(`جابه جایی ${amount} از ${sourceUser.accountNumber} به ${destinationUser.accountNumber} انجام شد.`);

// }
// // // Transfer money (assuming we have two users: newUser and anotherUser)
// // const anotherUser = createUser("ali", "kazemi", "1122334455", "ali.kazemi@example.com", new Date("1992-08-24"));
// // // depositMoney(anotherUser, 500);
// // transferMoney(newUser, anotherUser, 300);

// const resetPassword = (user: User, oldPassword: string, newPassword: string): void => {
//   if (user.password !== oldPassword) {
//       console.log("رمز عبور نادرست است.");
//       return;
//   }
//   if (newPassword.length !== 6) {
//       console.log("رمز عبور باید 6 رقمی باشد.");
//       return;
//   }
//   user.password = newPassword;
//   console.log("رمز عبور با موفقیت تغییر یافت.");
// };

// const closeAccount = (user: User): void => {
//   console.log(`حساب کاربری بسته شد. ${user.firstName} ${user.lastName} مقدار  ${user.balance} دریاقت شد`);
//   user.balance = 0;
//   // Remove user from the system (this could be done with a JSON server delete operation)
// };
// // const authenticate = (user: User, password: string): boolean => {
// //   if (user.password !== password) {
// //       console.log("Incorrect password.");
// //       return false;
// //   }
// //   return true;
// // };
// // Reset password
// resetPassword(newUser, newUser.password, "654321");

// // Close the account
// closeAccount(newUser);

// ----------------------------calling with api------------------------

interface User {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  dob: string;
  accountNumber: string;
  cardNumber: string;
  password: string;
  balance: number;
}
interface Transaction {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transactionDate: Date;
}

// interface BankData {
//   users: User[];
//   transactions: Transaction[];
// }

// ایجاد شماره حساب و پسورد و شماره کارت رندوم
const generateRandomNumber = (length: number): string => {
  return Math.random()
    .toString()
    .slice(2, 2 + length);
};
const generateAccountNumber = (): string => generateRandomNumber(10);
const generateCardNumber = (): string => generateRandomNumber(16);
const generatePassword = (): string => generateRandomNumber(6);
// console.log(generateAccountNumber(),generateCardNumber(),generatePassword());

const createUser = async (user: User): Promise<User> => {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

// deposit money
const depositMoney = async (
  amount: number,
  accountNumber: string
): Promise<User> => {
  const users = await fetch("http://localhost:3000/users").then((response) => {
    return response.json();
  });
  // console.log(users);
  const user = users.find((user: User) => user.accountNumber === accountNumber);
  if (user) {
    user.balance += amount;
    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ balance: user.balance }),
    });
    return user;
  } else {
    throw new Error("User not found");
  }
};

// withdraw
const withdrawMoney = async (
  accountNumber: string,
  amount: number
): Promise<User> => {
  const users = await fetch("http://localhost:3000/users").then((response) =>
    response.json()
  );

  const user = users.find((user: User) => user.accountNumber === accountNumber);
  if (user) {
    if (user.balance < amount) {
      throw new Error("Insufficient balance");
    }
    user.balance -= amount;
    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ balance: user.balance }),
    });
    return user;
  } else {
    throw new Error("User not found");
  }
};

// Transfer money between two users
const transferMoney = async (fromAccount: string, toAccount: string, amount: number): Promise<Transaction> => {
  const users = await fetch('http://localhost:3000/users')
      .then(response => response.json());
  
  const fromUser = users.find((user: User) => user.accountNumber === fromAccount);
  const toUser = users.find((user: User) => user.accountNumber === toAccount);
  
  if (fromUser && toUser) {
      if (fromUser.balance < amount) {
          throw new Error('Insufficient balance');
      }
      
      // Update balances
      fromUser.balance -= amount;
      toUser.balance += amount;
      
      // Save updated balances
      await fetch(`http://localhost:3000/users/${fromUser.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ balance: fromUser.balance })
      });

      await fetch(`http://localhost:3000/users/${toUser.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ balance: toUser.balance })
      });

      // Create a transaction record
      const transaction: Transaction = {
          fromAccount,
          toAccount,
          amount,
          transactionDate: new Date().toISOString(),
      };

      await fetch('http://localhost:3000/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transaction)
      });

      return transaction;
  } else {
      throw new Error('User(s) not found');
  }
};


const closeAccount = async (accountNumber: string): Promise<void> => {
  const users = await fetch('http://localhost:3000/users')
      .then(response => response.json());

  const user = users.find((user: User) => user.accountNumber === accountNumber);
  if (user) {
      user.balance = 0; // Withdraw all balance
      await fetch(`http://localhost:3000/users/${user.id}`, {
          method: 'DELETE',
      });
      console.log(`Account with account number ${accountNumber} has been closed.`);
  } else {
      throw new Error('User not found');
  }
};

// Reset the password
const resetPassword = async (accountNumber: string, oldPassword: string, newPassword: string): Promise<User> => {
  const users = await fetch('http://localhost:3000/users')
      .then(response => response.json());

  const user = users.find((user: User) => user.accountNumber === accountNumber);
  if (user && user.password === oldPassword) {
      user.password = newPassword;
      await fetch(`http://localhost:3000/users/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: newPassword })
      });
      return user;
  } else {
      throw new Error('Incorrect old password or user not found');
  }
};
const user = {
  firstName: "John",
  lastName: "Doe",
  mobileNumber: "1234567890",
  email: "john.doe@example.com",
  dob: "1990-01-01",
  accountNumber: generateAccountNumber(),
  cardNumber: generateCardNumber(),
  password: generatePassword(),
  balance: 0,
};
createUser(user)
  .then((newUser) => {
    console.log("User created:", newUser);
  })
  .catch((err) => console.error("Error:", err));

//------------------------------
//     const newUser=await createUser(user);
// console.log("User created:",newUser);
// -----------------------------------

// depositMoney(100, '3147256732')  
//   .then((updatedUser) => {
//     console.log("Deposit successful:", updatedUser);  
//   })
//   .catch((err) => console.error("Error:", err));


//   withdrawMoney('3147256732', 50)  // Withdraw 50 from the account with number '1234567890'
//   .then((updatedUser) => {
//     console.log("Withdrawal successful:", updatedUser);  // Logs the updated user after withdrawal
//   })
//   .catch((err) => console.error("Error:", err));  // Catches any errors that occur

//   transferMoney('3147256732', '8687421453', 200) 
//   .then((transaction) => {
//     console.log("Transaction successful:", transaction);  
//   })
//   .catch((err) => console.error("Error:", err));  


//   closeAccount('8687421453')  // Close the account with number '1234567890'
//   .then(() => {
//     console.log("Account closed successfully.");  // Logs confirmation of account closure
//   })
//   .catch((err) => console.error("Error:", err));  // Catches any errors that occur

//   resetPassword('1234567890', 'oldPassword', 'newPassword')  
//   .then((updatedUser) => {
//     console.log("Password reset successful:", updatedUser);
//   })
//   .catch((err) => console.error("Error:", err));  

//   async function performBankOperations() {
//     try {
//       const newUser = await createUser(user);  // Create new user
//       console.log("New User:", newUser);
      
//       const depositUser = await depositMoney(100, newUser.accountNumber);  // Deposit money
//       console.log("User after deposit:", depositUser);
      
//       const transferTransaction = await transferMoney(depositUser.accountNumber, '0987654321', 50);  // Transfer money
//       console.log("Transfer details:", transferTransaction);
      
//       const closedAccount = await closeAccount(newUser.accountNumber);  // Close account
//       console.log("Account closed:", closedAccount);
      
//     } catch (err) {
//       console.error("Error during operations:", err);  // Handle any errors
//     }
//   }
  
//   performBankOperations();  // Call the function to perform all operations
  