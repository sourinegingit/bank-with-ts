import './style.css'

interface User{
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  dob: Date;
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


// ایجاد شماره حساب و پسورد و شماره کارت رندوم 
const generateRandomNumber=(length:number):string=>{
  return Math.random().toString().slice(2,2+length);
}
const generateAccountNumber = (): string => generateRandomNumber(10);
const generateCardNumber = (): string => generateRandomNumber(16);
const generatePassword = (): string => generateRandomNumber(6);
// console.log(generateAccountNumber(),generateCardNumber(),generatePassword());

const createUser = (firstName: string, lastName: string, mobileNumber: string, email: string, dob: Date): User => {
  const accountNumber = generateAccountNumber();
  const cardNumber = generateCardNumber();
  const password = generatePassword();
  
  const user: User = {
      firstName,
      lastName,
      mobileNumber,
      email,
      dob,
      accountNumber,
      cardNumber,
      password,
      balance: 0 // Initial balance is 0
  };
  
  return user;
};
// Create a new user
const newUser = createUser("negin", "souri", "0987654321", "negin.souri@gmail.com", new Date("2001-10-24"));
console.log(newUser);

// واریز پول 
const depositMoney= (user: User, amount: number): void =>{
if(amount<=0){
  console.log("موجودی باید بیشتر از 0 باشد ");
  return;
}
user.balance+=amount
console.log(`واریز شد ${amount}. موجودی جدید ${user.balance} می باشد`);
}
// Deposit money
depositMoney(newUser, 1000);

// برداشت پول
const withdrawMoney = (user: User, amount: number): void => {
  if (amount <= 0) {
      console.log("موجودی باید بیشتر از صفرباشد.");
      return;
  }
  if (user.balance < amount) {
      console.log("موجودی کافی نیست.");
      return;
  }
  user.balance -= amount;
  console.log(`برداشت ${amount}. موجودی جدید ${user.balance}`);
};
// Withdraw money
withdrawMoney(newUser, 200);

// کار به کارت 
const transferMoney =(sourceUser:User,destinationUser: User, amount: number):void=>{
  if (sourceUser.balance < amount) {
    console.log("موجودی کافی نمی باشد");
    return;
}
sourceUser.balance -= amount;
destinationUser.balance += amount;
console.log(`جابه جایی ${amount} از ${sourceUser.accountNumber} به ${destinationUser.accountNumber} انجام شد.`);


}
// // Transfer money (assuming we have two users: newUser and anotherUser)
// const anotherUser = createUser("ali", "kazemi", "1122334455", "ali.kazemi@example.com", new Date("1992-08-24"));
// // depositMoney(anotherUser, 500);
// transferMoney(newUser, anotherUser, 300);

const resetPassword = (user: User, oldPassword: string, newPassword: string): void => {
  if (user.password !== oldPassword) {
      console.log("رمز عبور نادرست است.");
      return;
  }
  if (newPassword.length !== 6) {
      console.log("رمز عبور باید 6 رقمی باشد.");
      return;
  }
  user.password = newPassword;
  console.log("رمز عبور با موفقیت تغییر یافت.");
};

const closeAccount = (user: User): void => {
  console.log(`حساب کاربری بسته شد. ${user.firstName} ${user.lastName} مقدار  ${user.balance} دریاقت شد`);
  user.balance = 0;
  // Remove user from the system (this could be done with a JSON server delete operation)
};
// const authenticate = (user: User, password: string): boolean => {
//   if (user.password !== password) {
//       console.log("Incorrect password.");
//       return false;
//   }
//   return true;
// };
// Reset password
resetPassword(newUser, newUser.password, "654321");

// Close the account
closeAccount(newUser);
