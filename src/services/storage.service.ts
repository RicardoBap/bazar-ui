import { Injectable } from "@angular/core";

import { LocalUser } from './../models/local_users';
import { STORAGE_KEYS } from './../config/storage_keys.config';

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let usuario = localStorage.getItem(STORAGE_KEYS.localUser)
        if(usuario === null) {
            return null
        } else {
            return JSON.parse(usuario)
        }
    }

    setLocalUser(obj: LocalUser) {
        if (obj === null) {
            localStorage.removeItem(STORAGE_KEYS.localUser)
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj))
        }
    }

}