import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController  } from '@ionic/angular';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  contador: number=0;
  CUENTA: string;
  CONTRA: string;
  ID: string;
  TIPO_USER: string;
  REPCONTRA: string;
  listado = [];

  ngOnInit() {
    this.listar(); 
  }

  listar(){
    this.api.getUsers();
    this.listado = this.api.listado;
  }

  constructor(private crud: CrudService,
              private alertController: AlertController,
              private toastController: ToastController,
              public navCtrl: NavController,
              private api: ApirestService) { }

    async agregar(cuenta: HTMLInputElement, contra: HTMLInputElement,repcontra: HTMLInputElement,tipo_user: HTMLInputElement)
          {
            const CUENTA    = cuenta.value.trim();
            const CONTRA  = contra.value.trim();
            const REPCONTRA  = repcontra.value.trim();
            const ID = this.contador+1;
            const TIPO_USER = tipo_user.value.trim();
        
            if(CUENTA.length < 1)
            {
                const alert = await this.alertController.create({
                  header: 'Alerta',
                  subHeader: 'Error en el ingreso de datos',
                  message: 'Falta la cuenta',
                  buttons: ['OK'],
                });    
                await alert.present();      
            }
            else if(CONTRA.length < 1)
            { 
                    const alert = await this.alertController.create({
                      header: 'Alerta',
                      subHeader: 'Error en el ingreso de datos',
                      message: 'Falta la contraseña',
                      buttons: ['OK'],
                    });    
                    await alert.present();      
            }else if(REPCONTRA.length < 1)
            { 
                    const alert = await this.alertController.create({
                      header: 'Alerta',
                      subHeader: 'Error en el ingreso de datos',
                      message: 'Falta repetir la contraseña',
                      buttons: ['OK'],
                    });    
                    await alert.present();      
            }
              
            else if(TIPO_USER.length < 1)
            {
                const alert = await this.alertController.create({
                  header: 'Alerta',
                  subHeader: 'Error en el ingreso de datos',
                  message: 'Falta el tipo de usuario',
                  buttons: ['OK'],
                });    
                await alert.present();      
            }
            else if(REPCONTRA != CONTRA){
              const alert = await this.alertController.create({
                header: 'Alerta',
                subHeader: 'Error en el ingreso de datos',
                message: 'Las contraseñas no coinciden',
                buttons: ['OK'],
              });    
              await alert.present();   
            }
            else
            {
            
                  const datos = [{ "cuenta"      : cuenta.value,
                                    "contra"  : contra.value,
                                    "id" : ID,
                                    "tipo_user" : tipo_user.value
                                  }];

                  await this.crud.agregar(cuenta.value, datos);
                  cuenta.value= ""
                  contra.value= ""
                  repcontra.value= ""
                  tipo_user.value= ""
                  
                  const toast = await this.toastController.create({
                    message: 'Los datos fueron guardados',
                    duration: 2000,
                    position: 'middle'
                  });
          
              await toast.present();
            }
          }

}
