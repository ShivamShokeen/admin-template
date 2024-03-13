import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  constructor(private http: HttpClient) {}
  postReq(
    base_url: any,
    endpoint_url: any,
    payload: any,
    token?: any,
    pass_header?: any
  ): Observable<any> {
    // headers_custom = headers_custom.append('Access-Control-Allow-Origin', '*');
    let headers_custom: HttpHeaders = new HttpHeaders();
    headers_custom = headers_custom.append('Content-Type', 'application/json');
    headers_custom = headers_custom.append(
      'Authorization',
      `Bearer ${token ? token : 'testbear'}`
    );

    // cookiie acc dns

    if (pass_header && pass_header.length > 0) {
      pass_header.forEach((el: any) => {
        headers_custom = headers_custom.append(el.key, el.value);
      });
    }

    return this.http.post(base_url + endpoint_url, payload, {
      headers: headers_custom,
    });
  }

  putReq(
    base_url: any,
    endpoint_url: any,
    payload: any,
    token?: any,
    pass_header?: any
  ): Observable<any> {
    // headers_custom = headers_custom.append('Access-Control-Allow-Origin', '*');

    let headers_custom: HttpHeaders = new HttpHeaders();
    headers_custom = headers_custom.append('Content-Type', 'application/json');
    headers_custom = headers_custom.append(
      'Authorization',
      `Bearer ${token ? token : 'testbear'}`
    );

    // cookiie acc dns

    if (pass_header && pass_header.length > 0) {
      pass_header.forEach((el: any) => {
        headers_custom = headers_custom.append(el.key, el.value);
      });
    }

    return this.http.put(base_url + endpoint_url, payload, {
      headers: headers_custom,
    });
  }

  patchReq(
    base_url: any,
    endpoint_url: any,
    payload: any,
    token?: any,
    pass_header?: any
  ): Observable<any> {
    let headers_custom: HttpHeaders = new HttpHeaders();
    headers_custom = headers_custom.append('Content-Type', 'application/json');
    headers_custom = headers_custom.append(
      'Authorization',
      `Bearer ${token ? token : 'testbear'}`
    );

    if (pass_header && pass_header.length > 0) {
      pass_header.forEach((el: any) => {
        headers_custom = headers_custom.append(el.key, el.value);
      });
    }

    return this.http.patch(base_url + endpoint_url, payload, {
      headers: headers_custom,
    });
  }

  getReq(
    base_url: any,
    endpoint_url: any,
    token?: any,
    pass_header?: any
  ): Observable<any> {
    let headers_custom: HttpHeaders = new HttpHeaders();
    headers_custom = headers_custom.append('Content-Type', 'application/json');
    headers_custom = headers_custom.append(
      'Authorization',
      `Bearer ${token ? token : 'testbear'}`
    );

    if (pass_header && pass_header.length > 0) {
      pass_header.forEach((el: any) => {
        headers_custom = headers_custom.append(el.key, el.value);
      });
    }
    return this.http.get(base_url + endpoint_url, { headers: headers_custom });
  }

  deleteReq(
    base_url: any,
    endpoint_url: any,
    token?: any,
    pass_header?: any
  ): Observable<any> {
    let headers_custom: HttpHeaders = new HttpHeaders();
    headers_custom = headers_custom.append('Content-Type', 'application/json');
    headers_custom = headers_custom.append(
      'Authorization',
      `Bearer ${token ? token : 'testbear'}`
    );

    if (pass_header && pass_header.length > 0) {
      pass_header.forEach((el: any) => {
        headers_custom = headers_custom.append(el.key, el.value);
      });
    }

    return this.http.delete(base_url + endpoint_url, {
      headers: headers_custom,
    });
  }
}
