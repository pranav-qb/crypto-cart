import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetService } from 'src/app/services/asset.service';
import * as uuid from 'uuid';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('add') add;
  user;
  newAsset ={assetName:'',description:'',forSale:false,price:0,email:''}
  ownAssets;

  constructor(private modalService:NgbModal,private assetService:AssetService) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('email');
    this.ownAssets = this.assetService.getOwnAssets(this.user);
    console.log(this.ownAssets)
  }
  addAsset(){
    this.newAsset ={assetName:'',description:'',forSale:false,price:0,email:this.user}
    this.modalService.open(this.add,{size:'sm',backdrop:'static',centered:true})
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

}
