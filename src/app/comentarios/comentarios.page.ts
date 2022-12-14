import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../apirest.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  listadocoment = [];
  id :any ;
  constructor(private api: ApirestService, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id= this.activatedRoute.snapshot.paramMap.get("id");
    this.listarComents(this.id);
    console.log("id hi",this.id)
  }
  listarComents(id:string){
    this.api.getComents(id);
    this.listadocoment = this.api.listadocoments;
    console.log("Ok")
  }
}