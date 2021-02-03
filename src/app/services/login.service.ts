import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

class user{
  userName:string;
  email:string;
  password:string;
  constructor(userName,email,password){
    this.email= email;
    this.userName = userName;
    this.password  = password;
  }
} 
export class LoginService {
  users:user[]=[];
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
      return true;
    }
  }
}
