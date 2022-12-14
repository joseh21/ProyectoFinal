import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../apirest.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asistencia1',
  templateUrl: './asistencia1.page.html',
  styleUrls: ['./asistencia1.page.scss'],
})
export class Asistencia1Page implements OnInit {
  listadoasistencia = [];
  listadoasistenciagen = [];
  listadoalum = [];
  id :any ;
  constructor(private api: ApirestService, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id= this.activatedRoute.snapshot.paramMap.get("id");
    this.listarAsistGeneral(this.id);
    this.api.getAlumnos();
    this.listadoalum = this.api.listaAlumnos;
    console.log("id hola",this.id)
  }
  listarAsistGeneral(id:string){
    this.api.getAsistgen(id);
    this.listadoasistenciagen = this.api.listasistenciageneral;
    console.log("Ok")
  }
}
