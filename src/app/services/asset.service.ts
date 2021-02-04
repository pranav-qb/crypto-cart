import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  assets=[];
  assetSubject= new Subject();

  constructor() { }

  addAsset(assetObj){
    this.assets.push(assetObj);
    this.assetSubject.next(this.assets.filter(el=>el.email === sessionStorage.getItem('email')));
    console.log("Asset array",this.assets)
  }
  buyAsset(assetId,userId){
    let asset = this.assets.find((d)=>d.assetId === assetId);
    asset.forSale = false;
    asset.email = userId;
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
    this.assetSubject.next(this.assets);
  }
  withDrawSale(assetId){
    let asset = this.assets.find((d)=>d.assetId === assetId);
    asset.forSale =false;
    this.assetSubject.next(this.assets);
  }
}
