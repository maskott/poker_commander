import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-manage-players',
  templateUrl: 'manage-players.html'
})
export class ManagePlayersPage {
  icons: string[];
  players: Array<{title: string, note: string, icon: string}>;
  inputName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.get('players').then((val) => {
      console.log(val);
      this.players = val;
    });
  }

  public set(settingName,value){
    return this.storage.set(`setting:${ settingName }`,value);
  }
  public async get(settingName){
    return await this.storage.get(`setting:${ settingName }`);
  }
  public async remove(settingName){
    return await this.storage.remove(`setting:${ settingName }`);
  }
  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

  addPlayerModal(event) {
    const prompt = this.alertCtrl.create({
      title: 'Add Player',
      message: "Enter a name for the new Player",
      inputs: [
        {
          name: 'playername',
          placeholder: 'Player Name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.createPlayer(data);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  createPlayer(data) {
    console.log(data);
    this.players.push({
      title: data.playername,
      note: 'This is ' + data.playername,
      icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    });
    this.set('players', this.players);
  }
  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
