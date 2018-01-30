import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class DataService {
  apiEndpoint: String;
  httpOptions: Object;

  constructor(private http: HttpClient) {
    this.apiEndpoint = "http://localhost:3000/";
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  get(type: String, id: Number = null): Promise<Object[]> {
    const url = `${this.apiEndpoint}${type}/${id === null ? "" : id}`;
    return this.http.get<Object[]>(url).toPromise()
  }

  put(type: String, body: Object, id: Number,) {
    const url = `${this.apiEndpoint}${type}/${id}`;
    return this.http.put(url, body, this.httpOptions).toPromise()
  }

  delete(type: String, id: Number) {
    const url = `${this.apiEndpoint}${type}/${id}`;
    return this.http.delete(url).toPromise();
  }

  post(type: String, body: Object, id: number = null) {
    const url = `${this.apiEndpoint}${type}/${id ? id : ""}`;
    return this.http.post(url, body, this.httpOptions).toPromise();
  }

}
