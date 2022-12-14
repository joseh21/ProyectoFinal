import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../apirest.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  listadoasistencia = [];
  listadoasistenciagen = [];
  id :any ;
  constructor(private api: ApirestService, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id= this.activatedRoute.snapshot.paramMap.get("id");
    this.listarAsistAlumno(this.id);
    console.log("id hola",this.id)
  }
  listarAsistAlumno(id:string){
    this.api.getAsistAlum(id);
    this.listadoasistencia = this.api.listasistenciaAlumno;
    console.log("Ok")
  }
  listarAsistGeneral(id:string){
    this.api.getAsistgen(id);
    this.listadoasistenciagen = this.api.listasistenciageneral;
    console.log("Ok")
  }
}
