import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { DataService } from 'src/app/demo/service/data.service';

interface expandedRows {
    [key: string]: boolean;
}
interface DailyNotificationData {
    date: string;
    isObjNQInt: number;
    IsAbs: number;
    isObjDPU: number;
    iSObjOTD: number;
    isObjPPMClient: number;
    isObjNQExt: number;
  }
  
  interface TotalNotificationData {
    TotalisObjNQInt: number;
    TotalIsPolyvalence: number;
    TotalisObjDPU: number;
    TotalisObjPPMClient: number;
    TotalisObjNQExt: number;
  }
@Component({
    templateUrl: './notification.component.html',
    providers: [MessageService, ConfirmationService],
    styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }
    `]
})



export class NotificationComponent implements OnInit {


    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;

    notificationData: DailyNotificationData[] = [];
    totalData: TotalNotificationData | null = null;
  
    // notificationData: Record<string, { [key: string]: any }> = { };

    @ViewChild('filter') filter!: ElementRef;

    constructor(private customerService: CustomerService, private productService: ProductService,private notificationService : DataService) { }

    ngOnInit() {

        this.getNotification();

      

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    getStatusColor(totalObjectives: number): string {
        if (totalObjectives < 5) {
            return '#28a745';  // Green - Normal
        } else if (totalObjectives >= 5 && totalObjectives <= 10) {
            return '#fd7e14';  // Orange - Warning
        } else if (totalObjectives > 10 && totalObjectives <= 20) {
            return '#dc3545';  // Red - Danger
        } else {
            return '#8b0000';  // Dark Red - Very Dangerous
        }
    }

    getStatusLabel(totalObjectives: number): string {
        if (totalObjectives < 5) {
            return 'Normal';
        } else if (totalObjectives >= 5 && totalObjectives <= 10) {
            return 'Warning';
        } else if (totalObjectives > 10 && totalObjectives <= 20) {
            return 'Danger';
        } else {
            return 'Very Dangerous';
        }
    }

    getNotification(): void {
        this.notificationService.notification().subscribe((data: any) => {
          // Assuming data structure has individual dates and totals in separate fields
          const { TOTALS, ...dailyData } = data;
    
          // Convert daily data to an array and store it
          this.notificationData = Object.keys(dailyData).map(date => ({
            date,
            ...dailyData[date]
          }));
    
          // Store the totals separately
          this.totalData = TOTALS;
          this.loading = false;
          // Optional: Log the processed data
          console.log('Daily Data:', this.notificationData);
          console.log('Total Data:', this.totalData);
        });
      }

   

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
