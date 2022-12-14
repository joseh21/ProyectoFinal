import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { AlertController, NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController  } from '@ionic/angular';
import { ApirestService } from '../apirest.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  CUENTA: string;
  CONTRA: string;
  ID: string;
  TIPO_USER: string;
  listado = [];
  listado1 = [];
  listadoalum = [];
  listadoprofe = [];


  constructor(private crud: CrudService,
              private alertController: AlertController,
              private toastController: ToastController,
              public navCtrl: NavController,
              private api: ApirestService,
              public rou:Router) {}
    
  ngOnInit() { 
    this.listar1();
  }
  listar1(){
    //this.api.getUsers();
    //this.listado1 = this.api.listado;
    this.api.getAlumnos();
    this.listadoalum = this.api.listaAlumnos;
    this.api.getProfesores();
    this.listadoprofe = this.api.listaProfesores;
  }
  Alumnosapirest(){
    const User     = '';
    const Contra      = '1234';
    const Id         = '';
    const Tipo_user  = 'estudiante';
    for (let clave of this.listadoalum){
        const User  = clave.credencialAcesso;
        const Id    = clave.id;

        this.agregar(User,Contra,Id,Tipo_user);
     }
  }
  Profesoresapirest(){
    const User     = '';
    const Contra      = '1234';
    const Id         = '';
    const Tipo_user  = 'profesor';
    for (let clave of this.listadoprofe){
        const User  = clave.credencialAcesso;
        const Id    = clave.id;
        this.agregar(User,Contra,Id,Tipo_user);
     }
  }
  async agregar(cuenta: string , contra:string , id:string ,tipo_user:string )
  {
    const CUENTA      = cuenta;
    const CONTRA      = contra;
    const ID          = id;
    const TIPO_USER   = tipo_user;
  
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
    else
    {
          const datos = [{ "cuenta"      : cuenta,
                            "contra"  : contra,
                            "id" : id,
                            "tipo_user" : tipo_user
                          }];
          // validar los datos antes de guardar...
          await this.crud.agregar(cuenta, datos);
          cuenta= ""
          contra= ""
          id= ""
          tipo_user= "" 

    }
    //console.log('okkkkk');

  }  async listar() {
    this.listado = await this.crud.listar();
  }


  async leerreg(cuenta:HTMLInputElement,contra: HTMLInputElement)
  { 
    this.Alumnosapirest();
    this.Profesoresapirest();
    const resultado = await this.crud.leer(cuenta.value);
    const CUENTA    = cuenta.value.trim();
    const CONTRA  = contra.value.trim();

    if(CUENTA.length < 1){
      const alert = await this.alertController.create({
        header: 'Alerta',
        subHeader: 'Error en el ingreso de datos',
        message: 'Falta ingresar Usuario o cuenta',
        buttons: ['OK'],
      });    
      await alert.present();   
    }else if(CONTRA.length < 1){
      const alert = await this.alertController.create({
        header: 'Alerta',
        subHeader: 'Error en el ingreso de datos',
        message: 'Falta ingresar la contraseña',
        buttons: ['OK'],
      });    
      await alert.present();   
    }else{
      if(resultado != null){
        if(contra.value == resultado[0].contra){
            if(resultado[0].tipo_user == 'estudiante'){
              const id  =resultado[0].id ;
              console.log(id);
              this.rou.navigate(['inicio-estudiante',id]);
            }else if (resultado[0].tipo_user == 'profesor'){
              //this.navCtrl.navigateRoot('inicio-profesor');
              const id  =resultado[0].id ;
              console.log(id);
              this.rou.navigate(['inicio-profesor',id]);
            }else if (resultado[0].tipo_user == 'admin'){
              this.navCtrl.navigateRoot('inicio-admin');

            }else if(resultado[0].tipo_user == 'otros'){
              const id  =resultado[0].id ;
              console.log(id);
              this.rou.navigate(['inicio-otros',id]);
            } 
          }else{
            const alert = await this.alertController.create({
              header: 'Alerta',
              subHeader: 'Error en el ingreso de datos',
              message: 'La contraseña es incorrecta',
              buttons: ['OK'],
            });    
            await alert.present();   
          }
        
      }else {
          const alert = await this.alertController.create({
            header: 'Alerta',
            subHeader: 'Error en el ingreso de datos',
            message: 'Usuario no exise',
            buttons: ['OK'],
          });    
          await alert.present();   

        }
      } 
    } 
  async hola(){
    //this.api.postAsistencia();
  }

}  
 


