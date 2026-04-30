import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type Item = {
  checked: boolean;
  name: string;
};

@Injectable({ providedIn: 'root' })
export default class ApiService {
  http: HttpClient;

  endpoint = 'http://localhost:8090';

  constructor(http: HttpClient) {
    this.http = http;
  }

  get() {
    return this.http.get<{ name: string; checked: false }[]>(this.endpoint);
  }

  save(data: Item[]) {
    return this.http.post(this.endpoint, data);
  }
}
