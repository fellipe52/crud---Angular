import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product: Product = {
    id: '',
    name: '',
    price: 0.00
  }

  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product):Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  searchName(name: string): Observable<Product> {
    name = name.trim();
  
    const nameURL = `${this.baseUrl}?${name}`;
    return this.http.jsonp<Product>(nameURL, 'callback').pipe(
      catchError(e => this.errorHandler(e)) // then handle the error
      );
  }

  search(name: string, price?: Number): Observable<Product[]> {
    name = name.trim();
    

    const params = new HttpParams()
      .set('name', name)


    const options = name ?
     { params: params,
       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    } : {};

     const url = `${this.baseUrl}/${name}/${price}`;
    return this.http.get<Product>(url, options).pipe(
      retry(2),
      catchError(e => this.errorHandler(e)))
  }
  


  read():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)))
  }

  readById(id: String | null): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)))
  }

  update(product: Product): Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)))
  }

  
  delete(id: string): Observable<Product>
  {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)));
  }

  errorHandler(e: any) : Observable<any>{
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY
  }

}
