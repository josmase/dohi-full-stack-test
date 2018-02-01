import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class DataService {
  apiEndpoint = "http://localhost:3000/";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
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
