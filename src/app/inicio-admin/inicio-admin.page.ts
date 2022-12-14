import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { NavController  } from '@ionic/angular';
@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.page.html',
  styleUrls: ['./inicio-admin.page.scss'],
})
export class InicioAdminPage implements OnInit {

  constructor(public navCtrl: NavController,private crud: CrudService) { }

  ngOnInit() {
  }
  async salirylimpiar(){
    await this.crud.limpiar();
    this.navCtrl.navigateRoot('home');
  }
}
