import { Injectable } from "@angular/core";

import { LocalUser } from './../models/local_users';
import { STORAGE_KEYS } from './../config/storage_keys.config';
import { Cart } from "../models/cart";

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

    getCart(): Cart {
        let str = localStorage.getItem(STORAGE_KEYS.cart)
        if(str != null) {
            return JSON.parse(str)
        } else {
            return null
        }
    }

    setCart(obj: Cart) {
        if (obj != null) {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj))
        } else {
            localStorage.removeItem(STORAGE_KEYS.cart)            
        }
    }

}