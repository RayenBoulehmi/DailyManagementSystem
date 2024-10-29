import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Method to retrieve all product data
  getAllProductData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/all`);
  }

  // Method to retrieve all people data
  getAllPeopleData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/allpeople`);
  }

  // Method to get delivery data
  getDelivery(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/livraisons`);
  }

  // Method to get revenue data
  getRevenue(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/chiffre-affaire`);
  }

  // Method to get volume of production data
  getVolumeProduction(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/volume-de-production`);
  }

  // Method to get notification data
  getNotification(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/notification`);
  }

  // Method to get quantity delayed in production
  getQuantiteRetardeeProduction(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/quantite-retardee-production`);
  }

  // Method to get quantity delayed in delivery
  getQuantiteRetardeeLivraison(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/quantite-retardee-livraison`);
  }

  // Method to get defect rate
  getTauxDefaut(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/taux-defaut`);
  }

  // Method to get storage days
  getJourDeStockage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/jour-de-stockage`);
  }

  // Method to get work in progress
  getTravailEnCoursWIP(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/travailencours`);
  }

  // Method to get timely delivery
  getLivraisonATemp(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/livraison-a-temp`);
  }

  // Method to get absenteeism data
  getAbsenteisme(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/absenthisme`);
  }

  // Method to get safety data
  getSafty(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/safty`);
  }

  notification(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpi/notification`);
  }
}
