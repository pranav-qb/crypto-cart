import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

class user{
  userName:string;
  email:string;
  password:string;
  balance:number=1000;
  constructor(userName,email,password){
    this.email= email;
    this.userName = userName;
    this.password  = password;
  }
} 
export class LoginService {
  users:user[]=[];
  balanceSubject = new Subject();
  constructor() { }
  signUp(userObj){
    let newUser = new user(userObj.userName,userObj.email,userObj.password);
    let isPresent = this.users.find(data=>data.email === userObj.email)
    if(isPresent){
      return false;
    }
    else{
      this.users.push(newUser);
    console.log("users",this.users)

      return true;
    }
    
  }
  logIn(userObj){
    console.log("users",this.users)
    let data = this.users.find(data=>data.email === userObj.email);
    if(!data || data.password !== userObj.password){
      return false;
    }
    else{
      this.balanceSubject.next(data.balance);
      return true;
    }
  }
  getBalance(userID){
    console.log("in service get balance",userID)
    let data = this.users.find(data=>data.email === userID);
  
    if(!data) return undefined
    return data.balance
  }
  getUsername(userID){
    let data = this.users.find(data=>data.email === userID);
   
    return data.userName
  }
  // updateBalance(buyer,seller,price){
  //   console.log("buyer",buyer,"Seller",seller)
  //   let bdata = this.users.find(data=>data.email === buyer);
  //   bdata.balance = +bdata.balance - price;
  //   console.log("balance",bdata.balance,bdata)
  //   let sdata = this.users.find(data=>data.email === seller);
  //   sdata.balance = +sdata.balance +price;
  //   console.log("balance",sdata.balance,sdata)
  //   this.balanceSubject.next(this.getBalance(buyer));
  // }
  updateBalance(userId,bal){
    console.log(userId,bal)
    let bdata = this.users.find(data=>data.email === userId);
    bdata.balance = bal;
    this.balanceSubject.next(bal);
  }
}
