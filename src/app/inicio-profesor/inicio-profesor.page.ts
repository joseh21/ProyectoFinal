import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';
import { ActivatedRoute}  from  '@angular/router';
import { CrudService } from '../crud.service';
import { AlertController, NavParams } from '@ionic/angular';
import { NavController  } from '@ionic/angular';
import { ApirestService } from '../apirest.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio-profesor',
  templateUrl: './inicio-profesor.page.html',
  styleUrls: ['./inicio-profesor.page.scss'],
})
export class InicioProfesorPage implements OnInit {
  cuentauser: any;
  constructor(private api: ApirestService,
    public ActivatedRoute:ActivatedRoute,
    public roun:Router) {}

  ngOnInit() {
  }
  async rutasistencia(){
    this.cuentauser = this.ActivatedRoute.snapshot.paramMap.get("id");
    const id  = this.cuentauser;
    console.log(id);
    this.roun.navigate(['asistencia1',id]);
  }
  async rutalista(){
    this.cuentauser = this.ActivatedRoute.snapshot.paramMap.get("id");
    const id  = this.cuentauser;
    console.log(id);
    this.roun.navigate(['lista',id]);
  }
  async rutaqr(){
    this.cuentauser = this.ActivatedRoute.snapshot.paramMap.get("id");
    const id  = this.cuentauser;
    console.log(id);
    this.roun.navigate(['qr',id]);
  }
  async rutasucursales(){
    this.cuentauser = this.ActivatedRoute.snapshot.paramMap.get("id");
    const id  = this.cuentauser;
    console.log(id);
    this.roun.navigate(['sucursales',id]);
  }
}
