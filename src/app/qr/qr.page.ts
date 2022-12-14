import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../apirest.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  id: any;
  constructor(private api: ApirestService, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id= this.activatedRoute.snapshot.paramMap.get("id");
    //this.listarAsistGeneral(this.id);
    console.log("id hola",this.id)
  }
  

}
