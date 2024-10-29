import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../demo/components/auth/_services/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent {
    displayCalendar: boolean = false;
    currentDate: Date = new Date();
  
    items!: MenuItem[];

    showMenu = false;

   
    
  
    toggleCalendar() {
      this.displayCalendar = !this.displayCalendar; // Toggle calendar visibility
    }
   
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, public authService : AuthService) { }
    
    toggleMenu() {
        this.showMenu = !this.showMenu;
      }
    
      logout() {
        this.authService.logout()
        console.log('Logged out');
      }


      showCalendar() {
        this.displayCalendar = !this.displayCalendar;
  }
    

}
