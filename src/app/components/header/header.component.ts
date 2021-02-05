import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('page')page :string;
  userName;
  balance;
  balanceSub : Subscription;
  constructor(private router:Router, private loginService:LoginService) { }

  ngOnInit(): void {
    if(this.page === 'home'){
      let username = sessionStorage.getItem('email');
      console.log("usernae",username);
      // this.userName = this.loginService.getUsername(username)
      this.balance = this.loginService.getBalance(username);
      console.log("username",this.balance);
      if(!this.balance){this.router.navigate(['login'])}
      this.balanceSub = this.loginService.balanceSubject.subscribe((data)=>this.balance = data)
      
    }
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
