import './style.css'

interface User{
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  dob: Date;
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
console.log(generateAccountNumber());
