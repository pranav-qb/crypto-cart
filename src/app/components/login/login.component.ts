import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private loginService:LoginService, private router:Router) { }
  tab : string = 'login';
  loginData = {email:'',password:''};
  signupData = {email:'',userName:'',password:'',confirmpassword:''}
  showError=false;
  errorMessage:string ="";
  
  ngOnInit(): void {
  }
  isDisabled(type){
    if(type === 'login'){
      return this.loginData.email ==='' || this.loginData.password === ''
    }
    else{
      return (this.signupData.password !== this.signupData.confirmpassword ||this.signupData.password ==='') || this.signupData.email==='' || this.signupData.userName ===''
    }
  }
  reset(){
    if(this.tab=="login"){
      this.loginData = {email:'',password:''};
    }
    else{
      this.signupData = {email:'',userName:'',password:'',confirmpassword:''}
    }
  }
  login(){
    if(this.isDisabled('login')) return;
    let data = this.loginService.logIn(this.loginData)
    if(!data){
      this.showError = true;
      this.errorMessage="Email and Password don't match, Try again"
    }
    else{
      sessionStorage.setItem("email",this.loginData.email)
      this.router.navigate(['home']);
    }
  }
  signup(){
    if(this.isDisabled('signup'))return;
    let data = this.loginService.signUp(this.signupData);
    if(!data){
      this.showError=true;
      this.errorMessage="User already exist";
    }
    else{
      this.router.navigate(['home']);
      sessionStorage.setItem("email",this.signupData.email)
    }
  }
}
