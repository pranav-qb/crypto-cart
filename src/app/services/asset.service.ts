import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  assets=[];

  constructor() { }

  addAsset(assetObj){
    this.assets.push(assetObj);
    console.log("Asset array",this.assets)
  }
  getOwnAssets(id){
    console.log("id",id)
    return this.assets.filter(el=>el.email === id);
  }
}
