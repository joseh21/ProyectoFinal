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
  selector: 'app-inicio-estudiante',
  templateUrl: './inicio-estudiante.page.html',
  styleUrls: ['./inicio-estudiante.page.scss'],
})
export class InicioEstudiantePage implements OnInit {
  code: any;
  cuentauser: any;
  scanActive = false;
  scanResult = null;
  listadoMateria = [];
  @ViewChild('video',{static:false}) video: ElementRef;
  @ViewChild('canvas',{static:false}) canvas: ElementRef;
  videoElement: any;
  canvasElement: any;
  canvasContext: any;
  loading: HTMLIonLoadingElement;

  constructor(private barcodeScanner: BarcodeScanner, 
    private toastCtrl: ToastController, 
    private loadingCtrl: LoadingController,
    private crud: CrudService,
    private alertController: AlertController,
    private toastController: ToastController,
    public navCtrl: NavController,
    private api: ApirestService,
    public ActivatedRoute:ActivatedRoute,
    public roun:Router) {}

  ngAfterViewInit(){
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }
  ngOnInit() {
    this.api.getMaterias();
    this.listadoMateria = this.api.listaMateria;
    console.log(this.listadoMateria);
  }
  captar(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }
  async starscan(){
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline',true);
    this.videoElement.play();

    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
    requestAnimationFrame(this.scan.bind(this));
  }
  async scan(){
    this.cuentauser = this.ActivatedRoute.snapshot.paramMap.get("id");
    console.log('SCAN');
    if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA){
      if(this.loading){
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width,imageData.height,{
        inversionAttempts: 'dontInvert'
      });
      console.log('code: ',code);
      if(code){
        this.scanActive = false;
        this.scanResult = code.data;
        //this.showQrToast();
        if(this.scanResult == 'clase de matematicas N1'){
          this.api.postAsistencia(this.cuentauser,'2','clase de matematicas N1','2','SI');
          const alert = await this.alertController.create({
            header: 'Alerta',
            subHeader: 'Se ingreso su asistencia correctamente',
            buttons: ['OK'],
          });    
          await alert.present(); 
        }else if(this.scanResult == 'clase de lenguaje N6'){
          this.api.postAsistencia(this.cuentauser,'1','clase de lenguaje N6','1','SI');
          const alert = await this.alertController.create({
            header: 'Alerta',
            subHeader: 'Se ingreso su asistencia correctamente',
            buttons: ['OK'],
          });    
          await alert.present(); 
        }else if(this.scanResult == 'clase de ingles N4'){
          this.api.postAsistencia(this.cuentauser,'3','clase de ingles N4','3','SI');
          const alert = await this.alertController.create({
            header: 'Alerta',
            subHeader: 'Se ingreso su asistencia correctamente',
            buttons: ['OK'],
          });    
          await alert.present(); 
        }
        else{
          const alert = await this.alertController.create({
            header: 'Alerta',
            subHeader: 'Ingrese el QR correspondiente',
            buttons: ['OK'],
          });    
          await alert.present();  

        }
      }else{
        if(this.scanActive){
        requestAnimationFrame(this.scan.bind(this));
        }
      }
    }else{
      requestAnimationFrame(this.scan.bind(this));
 
    }
  }
  reset(){
    this.scanResult=null;
  }
  stopscan(){
    this.scanActive = false;
  }
  async rutasistencia(){
    this.cuentauser = this.ActivatedRoute.snapshot.paramMap.get("id");
    const id  = this.cuentauser;
    console.log(id);
    this.roun.navigate(['asistencia',id]);
  }
  async rutalista(){
    this.cuentauser = this.ActivatedRoute.snapshot.paramMap.get("id");
    const id  = this.cuentauser;
    console.log(id);
    this.roun.navigate(['lista',id]);
  }
  //async showQrToast(){
   // const toast = await this.toastCtrl.create({
  //message: `Open ${this.scanResult}?`,
  //position: 'top',
  //buttons:[{
    //text: 'Open',
    //handler: () =>{
     // window.open(this.scanResult, '_system','location=yes');
    //}
  //}]

   // });
    //toast.present();
  //}
  
}
