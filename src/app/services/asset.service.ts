import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  assets=[];
  assetSubject= new Subject();

  constructor(private loginService:LoginService) { }

  addAsset(assetObj){
    this.assets.push(assetObj);
    this.assetSubject.next(this.assets.filter(el=>el.email === sessionStorage.getItem('email')));
  }
  buyAsset(assetId,userId){
    
    let asset = this.assets.find((d)=>d.assetId === assetId);
    let buyerBalance = this.loginService.getBalance(userId)-asset.price;
    let sellerBalance = this.loginService.getBalance(asset.email)+asset.price;
    this.loginService.updateBalance(asset.email, sellerBalance);
    this.loginService.updateBalance(userId, buyerBalance);
    
    asset.forSale = false;
    asset.email = userId;
    this.assetSubject.next(this.assets.filter(el=>el.email === sessionStorage.getItem('email')));
    
  }
  getOwnAssets(id){
    return this.assets.filter(el=>el.email === id);
  }
  getForSaleAssets(id){
    return this.assets.filter(el=>el.email !== id && el.forSale === true);
  }
  sellAsset(assetId,price){
    let asset = this.assets.find((d)=>d.assetId === assetId);
    asset.forSale =true;
    asset.price = price;
    this.assetSubject.next(this.assets.filter(el=>el.email === sessionStorage.getItem('email')));
  }
  withDrawSale(assetId){
    let asset = this.assets.find((d)=>d.assetId === assetId);
    asset.forSale =false;
    this.assetSubject.next(this.assets.filter(el=>el.email === sessionStorage.getItem('email')));
  }
}
