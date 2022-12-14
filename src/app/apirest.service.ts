import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado = [];
  listadopost = [];
  listadocoments = [];
  listaAlumnos = [];
  listaProfesores = [];
  listaMateria = [];
  listaMaterias = [];
  listaSucursales = [];
  listasistenciaAlumno = [];
  listasistenciageneral = [];
  item : any;
  private urlBaseApi = 'https://jsonplaceholder.typicode.com/';
  private urlBaseApi1 = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { }

  getUsers()
  {
    let url = this.urlBaseApi + 'users';
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listado.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }
  getUser(id: string)
  {
    let url = this.urlBaseApi + 'users';
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data: any) =>
      {
        resolve(data);
        this.item = data;
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }
  getPosts(id: string)
  {
    let url = this.urlBaseApi + 'posts?userId=' + id;
    this.listadopost = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listadopost.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }
  getComents(idd: string)
  {
    let url = this.urlBaseApi + 'comments?postId=' + idd;
    this.listadocoments = [];
    console.log("URL",url)
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listadocoments.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }
  postAsistencia(idest: string,idmateria: string,nombre: string,idprofe: string,asis: string) {
    fetch('http://localhost:3000/Asistencia', {
      method: 'POST',
      body: JSON.stringify({
        idEstudiante: idest,
        idMateria: idmateria,
        nombremateria:nombre,
        idProfe: idprofe,
        asistencia: asis,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  getAlumnos()
  {
    let url = this.urlBaseApi1 + 'Usuarios';
    this.listaAlumnos = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listaAlumnos.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }
  getProfesores()
  {
    let url = this.urlBaseApi1 + 'Profesor';
    this.listaProfesores = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listaProfesores.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }
  getMaterias()
  {
    let url = this.urlBaseApi1 + 'Materia';
    this.listaMateria = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listaMateria.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }
  getMateria(id: string)
  {
    let url = this.urlBaseApi1 + 'Materia?id=' + id;
    this.listaMaterias = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listaMaterias.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }
  getAsistAlum(id: string)
  {
    let url = this.urlBaseApi1 + 'Asistencia?idEstudiante=' + id;
    this.listasistenciaAlumno = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listasistenciaAlumno.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }
  getAsistgen(id: string)
  {
    let url = this.urlBaseApi1 + 'Asistencia?idMateria=' + id;
    this.listasistenciageneral = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listasistenciageneral.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }
  getSucursales(id: string)
  {
    let url = this.urlBaseApi1 + 'sucursales?idProfesor=' + id;
    this.listaSucursales = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listaSucursales.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }
}