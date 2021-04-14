import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpParams} from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, retry, timeout } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { iMaster } from 'src/app/models/iMaster';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})

export class MasterService {
  public nTimeout:number=20000;
  public nRetry:number=5;
  
  
  headers:HttpHeaders=new HttpHeaders({'Content-Type':'application/json'});

  private handleError(error:HttpErrorResponse){
    console.log(error);
    if(error.error instanceof ErrorEvent){
      console.error("Ha ocurrido un error: ", error.error.message);
    }
    else{
      console.error('El Backend retornó código:', error.status+' '+error.error.message);
    }
    return throwError('Ocurrió un error, por favor trate nuevamente');
  }

  constructor(private http:HttpClient) { }

  //#region Master
  GetMasters(master:string, status:string){
    return this.http.get<iMaster[]>(`${API_URL}/GetMasters/${master}/${status}`);
  }

  GetMaster(master:string, id:string){
    return this.http.get<iMaster>(`${API_URL}/GetMaster/${master}/${id}`);
  }

  SetMasters(data: any){    
    return  this.http.post(`${API_URL}/SetMasters`, data, { headers: this.headers }).pipe(
      timeout(this.nTimeout),
      retry(this.nRetry), 
      catchError(this.handleError) 
    );
  }

  UpdMasters(data: any){    
    return  this.http.put(`${API_URL}/UpdMasters`, data, { headers: this.headers }).pipe(
      timeout(this.nTimeout),
      retry(this.nRetry), 
      catchError(this.handleError) 
    );
  }

  UpdStatusMasters(data: any){    
    return  this.http.put(`${API_URL}/UpdStatusMasters`, data, { headers: this.headers }).pipe(
      timeout(this.nTimeout),
      retry(this.nRetry), 
      catchError(this.handleError) 
    );
  }

  DelMasters(id:string, master:string){    
    return  this.http.delete(`${API_URL}/DelMasters/${id}/${master}`,).pipe(
      timeout(this.nTimeout),
      retry(this.nRetry), 
      catchError(this.handleError) 
    );
  }
  //#endregion
}
