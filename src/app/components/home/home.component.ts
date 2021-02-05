import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AssetService } from 'src/app/services/asset.service';
import { LoginService } from 'src/app/services/login.service';
import * as uuid from 'uuid';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('add') add;
  @ViewChild('sell') sell;
  @ViewChild('update') update;
  @ViewChild('buy') buy;
  @ViewChild('cancel') cancelBuy;
  user;
  newAsset ={assetName:'',description:'',forSale:false,price:0,email:''}
  ownAssets;
  forSaleAssets;
  assetSubscripton:Subscription;
  assetPrice='';
  activeAssetId;

  constructor(private modalService:NgbModal,private assetService:AssetService,private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('email');
    if(!this.user){
      this.router.navigate(['login']);
    }
    this.ownAssets = this.assetService.getOwnAssets(this.user);
    this.forSaleAssets = this.assetService.getForSaleAssets(this.user);
    this.assetSubscripton = this.assetService.assetSubject.subscribe((data)=>this.ownAssets = data)
  }
  addAsset(){
    this.newAsset ={assetName:'',description:'',forSale:false,price:0,email:this.user}
    this.modalService.open(this.add,{size:'md',backdrop:'static',centered:true})
  }
  openSellAsset(asset){
    this.activeAssetId = asset.assetId;
    this.modalService.open(this.sell,{size:'sm',backdrop:'static',centered:true})
  }
  openUpdateAssetPrice(asset){
    this.activeAssetId = asset.assetId;
    this.assetPrice = asset.price;
    this.modalService.open(this.update,{size:'sm',backdrop:'static',centered:true})
  }
  openBuyAsset(asset){
    this.activeAssetId = asset.assetId;
    if(asset.price > this.loginService.getBalance(this.user)){
      this.modalService.open(this.cancelBuy,{size:'sm',backdrop:'static',centered:true})
    }
    else
    this.modalService.open(this.buy,{size:'sm',backdrop:'static',centered:true})
  }
  buyAsset(){
    this.assetService.buyAsset(this.activeAssetId,this.user);
    this.modalService.dismissAll();
    this.forSaleAssets.splice(this.forSaleAssets.indexOf(d=>d.assetId === this.activeAssetId),1);
  }
  withdrawSale(asset){
    this.assetService.withDrawSale(asset.assetId)
  }
  reset(){
    this.newAsset ={assetName:'',description:'',forSale:false,price:0,email:this.user}
  }
  addNewAsset(){
    let myId = uuid.v4();
    Object.assign(this.newAsset, {assetId: myId});
    this.assetService.addAsset(this.newAsset);
    this.modalService.dismissAll();
  }
  isDisabled(){
    if(this.newAsset.assetName === '' || this.newAsset.description === ''){
      return true;
    }
    return false;
  }
  cancel(){
    this.modalService.dismissAll();
    this.assetPrice = '';
  }
  sellAsset(){
    if(this.assetPrice ==='') return;
  this.modalService.dismissAll();
  this.assetService.sellAsset(this.activeAssetId,this.assetPrice);
  this.assetPrice='';
  }
  getUsername(email){
    return this.loginService.getUsername(email)
  }
}
