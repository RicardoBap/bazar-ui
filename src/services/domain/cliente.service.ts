import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

import { ClienteDTO } from './../../models/cliente.dto';
import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {}

    findByEmail(email: string) {
        //let token = this.storage.getLocalUser().token AuthInterceptor implenta o cabeçalho
        //let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token })

        return this.http.get(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`)  //{ headers: authHeader }
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, { responseType: 'blob' })
    }

    insert(obj: ClienteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`,
            obj, { observe: 'response', responseType: 'text' } )
    }


}