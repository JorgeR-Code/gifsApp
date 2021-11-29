import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

private api: string = 'D9a5i6eBAuxf3DWLujbPWJoMEvxwMNf4';
private _historial: string[]=[];

public resultados: Gif[] = [];

get historial(){
  return [...this._historial];
}

constructor(private http: HttpClient){

this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

// if(localStorage.getItem('historial')){
//   this._historial = JSON.parse(localStorage.getItem('historial')!);
// }
}

buscarGifs(query: string){

query = query.trim().toLocaleLowerCase();

  if(query){
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=D9a5i6eBAuxf3DWLujbPWJoMEvxwMNf4&q=${query}&limit=10`).subscribe((resp) => {
      this.resultados = resp.data;
    });

  }else{
    return
  }
};

}