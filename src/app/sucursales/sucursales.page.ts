import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../apirest.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.page.html',
  styleUrls: ['./sucursales.page.scss'],
})
export class SucursalesPage implements OnInit {
  cuentauser: any;
  listarsucur = [];
  constructor(private api: ApirestService, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cuentauser = this.activatedRoute.snapshot.paramMap.get("id");
    this.listarr(this.cuentauser);
    console.log("id",this.cuentauser)
  }
  listarr(id:string){
    this.api.getSucursales(id);
    this.listarsucur = this.api.listaSucursales;
    console.log("listarsucur")
  }

}
