import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment, routes } from 'src/environments/environment';
import { User } from '../models/User';

const ACCESS_TOKEN_KEY = 'acctoken';
const REFRESH_TOKEN_KEY = 'reftoken';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user: User = null;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;


  constructor(private http: HttpClient,
    private router: Router,
    private storage: Storage) {
    this.loadToken();
  }

  //---------------------REGISTRO--------------------------

  async loadToken() {
    const token = await this.storage.get(ACCESS_TOKEN_KEY);
    const user = await this.storage.get(USER_KEY)
    if (token) {
      console.log('Works');
      this.currentAccessToken = token;
      this.isAuthenticated.next(true);
      this.router.navigateByUrl('/home');
    } else {
      this.isAuthenticated.next(false);
    }
    if (user) {
      this.user = user;
    }
  }

  
  registerUser(nick: string, email: string, password: string): Observable<any> {

    const body = {
      nick: nick,
      email: email,
      password: password
    }

    return this.http.post(routes.base + routes.register, body);
  }

  loginUser(email: string, password: string): Observable<any> {
    this.user = {
      email: email,
      nick: "",
      centroSupervisado: "",
      _id: "",
      role: "",
      token: ""
    }
    return this.http.post(routes.base + routes.login, { email, password }).pipe(
      switchMap((data: { accessToken, refreshToken, user }) => {
        console.log(data.user);
        this.user = data.user;
        this.currentAccessToken = data.accessToken;
        const storeAccess = this.storage.set(ACCESS_TOKEN_KEY, data.accessToken);
        const storeRefresh = this.storage.set(REFRESH_TOKEN_KEY, data.refreshToken);
        const userData = this.storage.set(USER_KEY, data.user);
        return from(Promise.all([storeAccess, storeRefresh, userData]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      }))
  }

  async logout() {
    const refreshToken = await this.storage.get(REFRESH_TOKEN_KEY);
    console.log("token")
    console.log(refreshToken);

    if (refreshToken) {
      this.http.post(routes.base + routes.logout, { refreshToken, email: this.user.email })
        .subscribe()
    }

    this.currentAccessToken = null;
    // Remove all stored tokens
    const deleteAccess = this.storage.remove(ACCESS_TOKEN_KEY);
    const deleteRefresh = this.storage.remove(REFRESH_TOKEN_KEY);
    console.log("xd")
    Promise.all([deleteAccess, deleteRefresh]);
    this.isAuthenticated.next(false);
    console.log("Navigating")
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  getNewAccessToken() {
    const refreshToken = from(this.storage.get(REFRESH_TOKEN_KEY));
    return refreshToken.pipe(
      switchMap(token => {
        if (token && token.value) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `${token}`
            })
          }
          return this.http.post(routes.base + routes.token, { email: this.user.email }, httpOptions);
        } else {
          // No stored refresh token
          return of(null);
        }
      })
    );
  }

  // Store a new access token
  storeAccessToken(accessToken) {
    this.currentAccessToken = accessToken;
    return from(this.storage.set(ACCESS_TOKEN_KEY, accessToken));
  }

  //--------------------CENTROS------------------------------
  
  getAllCentros(): Observable<any> {
    return this.http.get(routes.base + routes.getAllCentros);
  }


  //--------------------GASTOS-------------------------------

  getAllGastos(): Observable<any> {
    return this.http.get(routes.base + routes.getAllGastos);
  }

  
  getGasto(gastoId: string): Observable<any> {
    return this.http.get(routes.base + routes.getGasto + gastoId);
  }
  
  createGastoSocio(socioID: string, parcelaID: string, cultivoID: string, concepto: string, importe: number, cantidad: number, fecha: string) {
    
  }
  
  createGastoCentro(centroID: string, concepto: string, importe: number, cantidad: number, fecha: string) {
    
  }
  
  //--------------------SOCIOS-------------------------------

  getAllSocios(): Observable<any> {
    return this.http.get(routes.base + routes.getAllSocios);
  }


  
  //--------------------PARCELAS-------------------------------
  
  getParcelasOfSocio(socioID: string): Observable<any> {
    return this.http.get(routes.base + routes.getParcelasOfSocio + socioID);
  }


  
  //--------------------CULTIVOS-------------------------------
  
  getCultivosOfParcela(parcelaID: string): Observable<any> {
    return this.http.get(routes.base + routes.getCultivosOfParcela + parcelaID);
  }

}
