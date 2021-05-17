import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavparamService } from '../navparam.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public _storage: Storage | null = null;  

  lstAdjectives: Array<string> = ["Sleepy","Proud","Awesome","Boring","Bad","Good","Amazing","Stunning","Magnificient","Ordinary"];  
  lstColors: Array<string> = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet", "Black", "White", "Gray", "Pink"];
  lstAnimals: Array<string> = ["Panda", "Worm", "Frog", "Skunk", "Chimp", "Penguin", "Lion", "Giraffe", "Dog", "Cat", "Squirrel", "Whale"];  
  
  itemAdjective: number = 0;
  itemColor: number = 0;
  itemAnimal: number = 0;

  labelAdjective: string;
  labelColor: string;
  labelAnimal: string;
  labelUsername: string;

  constructor(
    private router: Router, 
    private navParamService: NavparamService,
    private localStore: Storage
    )
    { 
      this.create()
      this.init(); 
    }

  async create() {
    const _storage = await this.localStore.create();  
  }

  init() {
    this.localStore.get("Adjective").then((result) => {
      if (result != null && result != undefined)
        this.itemAdjective = result;
      else 
        this.itemAdjective = 0;
      this.labelAdjective = this.lstAdjectives[this.itemAdjective];
    });

    this.localStore.get("Color").then((result) => {
      if (result != null && result != undefined)
        this.itemColor = result;
      else
        this.itemColor = 0;
      this.labelColor = this.lstColors[this.itemColor];
    });

    this.localStore.get("Animal").then((result) => {
      if (result != null && result != undefined)
        this.itemAnimal = result;
      else
        this.itemAnimal = 0;
      this.labelAnimal = this.lstAnimals[this.itemAnimal];
    });
  }

  ionViewWillEnter() {
    this.localStore.get("Username").then((result) => {
      if (result != null && result != undefined)
        this.labelUsername = result;
      else 
        this.labelUsername = "Create Username";
    });
  }

  adjectivePicker() {
    this.itemAdjective += 1;
    if (this.itemAdjective >= this.lstAdjectives.length) {
      this.itemAdjective = 0;
    }
    this.labelAdjective= this.lstAdjectives[this.itemAdjective];
  }

  colorPicker() {
    this.itemColor += 1;
    if (this.itemColor >= this.lstColors.length) {
      this.itemColor = 0;
    }
    this.labelColor = this.lstColors[this.itemColor];
  }

  animalPicker() {
    this.itemAnimal += 1;
    if (this.itemAnimal >= this.lstAnimals.length) {
      this.itemAnimal = 0;
    }
    this.labelAnimal = this.lstAnimals[this.itemAnimal];
  }
  
  genUserName(){
    this.localStore.set("Adjective", this.itemAdjective);
    this.localStore.set("Color", this.itemColor);
    this.localStore.set("Animal", this.itemAnimal);
    let names = [this.lstAdjectives[this.itemAdjective], this.lstColors[this.itemColor], this.lstAnimals[this.itemAnimal]];
    this.navParamService.setNavData(names.join(","));
    this.router.navigate(["/username"]);
  }
}