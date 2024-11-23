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