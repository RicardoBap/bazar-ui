import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";

import { Observable } from 'rxjs/Rx';

import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        public storage: StorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getLocalUser()

        let NCaracteres = API_CONFIG.baseUrl.length 
        let requestToApi = req.url.substr(0, NCaracteres) === API_CONFIG.baseUrl

        if(localUser && requestToApi) {
            console.log(requestToApi)
            const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) })
            return next.handle(authReq)
        } else {
        return next.handle(req)
        }
    } 

}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}