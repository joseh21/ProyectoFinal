import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../apirest.service';
import { ActivatedRoute}  from  '@angular/router';
import { CrudService } from '../crud.service';
import { NavController  } from '@ionic/angular';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  listadoalumno =  [];
  constructor(private api: ApirestService, public ActivatedRoute:ActivatedRoute,private crud: CrudService) { }

  ngOnInit() { 
    this.listar1();
  }
  listar1(){
    this.api.getAlumnos();
    this.listadoalumno = this.api.listaAlumnos;
  }
}
