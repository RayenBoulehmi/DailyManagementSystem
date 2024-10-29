import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { DataService } from '../../service/data.service';

Chart.register(...registerables);

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    dataVolume: any[] = [];
    dataDelivery: any[] = [];
    dataRevenue: any[] = [];
    quantiteRetardeeProductionData: any[] = [];
    quantiteRetardeeLivraisonData: any[] = [];
    tauxDefautData: any[] = [];
    jourDeStockageData: any[] = [];
    travailEnCoursWIPData: any[] = [];
    livraisonATempData: any[] = [];
    absenteismeData: any[] = [];
    safetyData: any[] = [];

    volumeChart?: any;
    deliveryChart?: any;
    revenueChart?: any;
    quantiteRetardeeProductionChart?: any;
    quantiteRetardeeLivraisonChart?: any;
    tauxDefautChart?: any;
    jourDeStockageChart?: any;
    travailEnCoursWIPChart?: any;
    livraisonATempChart?: any;
    absenteismeChart?: any;
    safetyChart?: any;

    selectedZone: string = '';
    selectedSemaines: string = '';
    selectedDate: string = '';
    selectedArticle: string = '';

    uniqueZones: string[] = [];
    uniqueSemaines: string[] = [];
    uniqueDates: string[] = [];
    uniqueArticle: string[] = [];

    zoneOptions: any[] = [];
    semainesOptions: any[] = [];
    dateOptions: any[] = [];
    articleOptions: any[] = [];

    subscription?: Subscription;
    
    chartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef',
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef',
                    drawBorder: false
                }
            }
        }
    };

    constructor(
        private dataService: DataService
    ) {  this.createRevenueChart();
         this.fetchTravailEnCoursWIPData();

    }

    ngOnInit(): void {
        this.fetchDeliveryData();
        this.fetchProductionData();
        this.fetchRevenueData();
        this.fetchQuantiteRetardeeProductionData();
        this.fetchQuantiteRetardeeLivraisonData();
        this.fetchTauxDefautData();
        this.fetchJourDeStockageData();
        this.fetchTravailEnCoursWIPData();
        this.fetchLivraisonATempData();
        this.fetchAbsenteismeData();
        this.fetchSafetyData();
    }


    extractUniqueFilters(): void {
        this.uniqueZones = Array.from(new Set([...this.dataVolume, ...this.dataDelivery, ...this.dataRevenue, ...this.travailEnCoursWIPData].map(item => item.zone)));
        this.uniqueSemaines = Array.from(new Set([...this.dataVolume, ...this.dataDelivery, ...this.dataRevenue, ...this.travailEnCoursWIPData].map(item => item.semaine)));
        this.uniqueDates = Array.from(new Set([...this.dataVolume, ...this.dataDelivery, ...this.dataRevenue, ...this.travailEnCoursWIPData].map(item => item.date)));
        this.uniqueArticle = Array.from(new Set([...this.dataVolume, ...this.dataDelivery, ...this.dataRevenue, ...this.travailEnCoursWIPData].map(item => item.designationProduit)));
        this.initializeDropdownOptions();
    }

    initializeDropdownOptions(): void {
        this.zoneOptions = [{ label: 'All Zones', value: '' }, ...this.uniqueZones.map(zone => ({ label: zone, value: zone }))];
        this.semainesOptions = [{ label: 'All Semaines', value: '' }, ...this.uniqueSemaines.map(semaines => ({ label: semaines, value: semaines }))];
        this.dateOptions = [{ label: 'All Dates', value: '' }, ...this.uniqueDates.map(date => ({ label: date, value: date }))];
        this.articleOptions = [{ label: 'All Article', value: '' }, ...this.uniqueArticle.map(designationProduit => ({ label: designationProduit, value: designationProduit }))];
    }

 filteredVolumData(): any[] {
    return this.dataVolume.filter(item =>
        (!this.selectedZone || item.zone === this.selectedZone) &&
        (!this.selectedSemaines || item.semaine === this.selectedSemaines) &&
        (!this.selectedDate || item.date === this.selectedDate) &&
        (!this.selectedArticle || item.designationProduit === this.selectedArticle)
    );
}
    
filterDeliveryData(): any[] {
    return this.dataDelivery.filter(item =>
        (!this.selectedZone || item.zone === this.selectedZone) &&
        (!this.selectedSemaines || item.semaine === this.selectedSemaines) &&
        (!this.selectedDate || item.date === this.selectedDate) &&
        (!this.selectedArticle || item.designationProduit === this.selectedArticle)
    );
}
filterRevenueData(): any[] {
    return this.dataRevenue.filter(item =>
        (!this.selectedZone || item.zone === this.selectedZone) &&
        (!this.selectedSemaines || item.semaine === this.selectedSemaines) &&
        (!this.selectedDate || item.date === this.selectedDate) &&
        (!this.selectedArticle || item.designationProduit === this.selectedArticle)
    );
}
// Filter methods for new data
filterQuantiteRetardeeProductionData(): any[] {
    return this.quantiteRetardeeProductionData.filter(item =>
        (!this.selectedZone || item.zone === this.selectedZone) &&
        (!this.selectedSemaines || item.semaine === this.selectedSemaines) &&
        (!this.selectedDate || item.date === this.selectedDate) &&
        (!this.selectedArticle || item.designationProduit === this.selectedArticle)
    );
}

filterQuantiteRetardeeLivraisonData(): any[] {
    return this.quantiteRetardeeLivraisonData.filter(item =>
        (!this.selectedZone || item.zone === this.selectedZone) &&
        (!this.selectedSemaines || item.semaine === this.selectedSemaines) &&
        (!this.selectedDate || item.date === this.selectedDate) &&
        (!this.selectedArticle || item.designationProduit === this.selectedArticle)
    );
}

filterTauxDefautData(): any[] {
    return this.tauxDefautData.filter(item =>
        (!this.selectedZone || item.zone === this.selectedZone) &&
        (!this.selectedSemaines || item.semaine === this.selectedSemaines) &&
        (!this.selectedDate || item.date === this.selectedDate) &&
        (!this.selectedArticle || item.designationProduit === this.selectedArticle)
    );
}

filterJourDeStockageData(): any[] {
    return this.jourDeStockageData.filter(item =>
        (!this.selectedZone || item.zone === this.selectedZone) &&
        (!this.selectedSemaines || item.semaine === this.selectedSemaines) &&
        (!this.selectedDate || item.date === this.selectedDate) &&
        (!this.selectedArticle || item.designationProduit === this.selectedArticle)
    );
}

filterTravailEnCoursWIPData(): any[] {
    return this.travailEnCoursWIPData.filter(item =>
        (!this.selectedZone || item.zone === this.selectedZone) &&
        (!this.selectedSemaines || item.semaine === this.selectedSemaines) &&
        (!this.selectedDate || item.date === this.selectedDate) &&
        (!this.selectedArticle || item.designationProduit === this.selectedArticle)
    );
}

filterLivraisonATempData(): any[] {
    return this.livraisonATempData.filter(item =>
        (!this.selectedZone || item.zone === this.selectedZone) &&
        (!this.selectedSemaines || item.semaine === this.selectedSemaines) &&
        (!this.selectedDate || item.date === this.selectedDate) &&
        (!this.selectedArticle || item.designationProduit === this.selectedArticle)
    );
}

filterAbsenteismeData(): any[] {
    return this.absenteismeData.filter(item =>
        (!this.selectedZone || item.zone === this.selectedZone) &&
        (!this.selectedSemaines || item.semaine === this.selectedSemaines) &&
        (!this.selectedDate || item.date === this.selectedDate) &&
        (!this.selectedArticle || item.designationProduit === this.selectedArticle)
    );
}

filterSafetyData(): any[] {
    return this.safetyData.filter(item =>
        (!this.selectedZone || item.zone === this.selectedZone) &&
        (!this.selectedSemaines || item.semaine === this.selectedSemaines) &&
        (!this.selectedDate || item.date === this.selectedDate) &&
        (!this.selectedArticle || item.designationProduit === this.selectedArticle)
    );
}
    fetchDeliveryData(): void {
        this.dataService.getDelivery().subscribe(
            responseData => {
                this.dataDelivery = responseData;
                console.log('delevery', this.dataDelivery)
                if (this.dataDelivery && this.dataDelivery.length > 0) {
                    this.extractUniqueFilters();
                    this.createDeliveryChart();
                } else {
                    console.error('Delivery data is empty after retrieval.');
                }
            },
            error => {
                console.error('Error fetching delivery data:', error);
            }
        );
    }

    fetchRevenueData(): void {
        this.dataService.getRevenue().subscribe(
            responseData => {
                this.dataRevenue = responseData;
                console.log('Revenue', this.dataRevenue)
                if (this.dataRevenue && this.dataRevenue.length > 0) {
                    this.extractUniqueFilters();
                    this.createRevenueChart();
                } else {
                    console.error('Revenue data is empty after retrieval.');
                }
            },
            error => {
                console.error('Error fetching Revenue data:', error);
            }
        );
    }

    fetchProductionData(): void {
        this.dataService.getVolumeProduction().subscribe(
            responseData => {
                this.dataVolume = responseData;
                if (this.dataVolume && this.dataVolume.length > 0) {
                    this.extractUniqueFilters();
                    this.createVolumeChart();
                } else {
                    console.error('Production data is empty after retrieval.');
                }
            },
            error => {
                console.error('Error fetching production data:', error);
            }
        );
    }
// Fetch methods for new data
fetchQuantiteRetardeeProductionData(): void {
    this.dataService.getQuantiteRetardeeProduction().subscribe(
        responseData => {
            this.quantiteRetardeeProductionData = responseData;
            if (this.quantiteRetardeeProductionData && this.quantiteRetardeeProductionData.length > 0) {
                this.createQuantiteRetardeeProductionChart();
            } else {
                console.error('Quantite Retardee Production data is empty after retrieval.');
            }
        },
        error => {
            console.error('Error fetching quantite retardee production data:', error);
        }
    );
}

fetchQuantiteRetardeeLivraisonData(): void {
    this.dataService.getQuantiteRetardeeLivraison().subscribe(
        responseData => {
            this.quantiteRetardeeLivraisonData = responseData;
            if (this.quantiteRetardeeLivraisonData && this.quantiteRetardeeLivraisonData.length > 0) {
                this.createQuantiteRetardeeLivraisonChart();
            } else {
                console.error('Quantite Retardee Livraison data is empty after retrieval.');
            }
        },
        error => {
            console.error('Error fetching quantite retardee livraison data:', error);
        }
    );
}

fetchTauxDefautData(): void {
    this.dataService.getTauxDefaut().subscribe(
        responseData => {
            this.tauxDefautData = responseData;
            if (this.tauxDefautData && this.tauxDefautData.length > 0) {
                this.createTauxDefautChart();
            } else {
                console.error('Taux Defaut data is empty after retrieval.');
            }
        },
        error => {
            console.error('Error fetching taux defaut data:', error);
        }
    );
}

fetchJourDeStockageData(): void {
    this.dataService.getJourDeStockage().subscribe(
        responseData => {
            this.jourDeStockageData = responseData;
            if (this.jourDeStockageData && this.jourDeStockageData.length > 0) {
                this.createJourDeStockageChart();
            } else {
                console.error('Jour De Stockage data is empty after retrieval.');
            }
        },
        error => {
            console.error('Error fetching jour de stockage data:', error);
        }
    );
}

fetchTravailEnCoursWIPData(): void {
    this.dataService.getTravailEnCoursWIP().subscribe(
        responseData => {
            this.travailEnCoursWIPData = responseData;
            if (this.travailEnCoursWIPData && this.travailEnCoursWIPData.length > 0) {
                this.createTravailEnCoursWIPChart();
            } else {
                console.error('Travail En Cours WIP data is empty after retrieval.');
            }
        },
        error => {
            console.error('Error fetching travail en cours WIP data:', error);
        }
    );
}

fetchLivraisonATempData(): void {
    this.dataService.getLivraisonATemp().subscribe(
        responseData => {
            this.livraisonATempData = responseData;
            if (this.livraisonATempData && this.livraisonATempData.length > 0) {
                this.createLivraisonATempChart();
            } else {
                console.error('Livraison A Temp data is empty after retrieval.');
            }
        },
        error => {
            console.error('Error fetching livraison a temp data:', error);
        }
    );
}

fetchAbsenteismeData(): void {
    this.dataService.getAbsenteisme().subscribe(
        responseData => {
            this.absenteismeData = responseData;
            if (this.absenteismeData && this.absenteismeData.length > 0) {
                this.createAbsenteismeChart();
            } else {
                console.error('Absenteisme data is empty after retrieval.');
            }
        },
        error => {
            console.error('Error fetching absenteisme data:', error);
        }
    );
}

fetchSafetyData(): void {
    this.dataService.getSafty().subscribe(
        responseData => {
            this.safetyData = responseData;
            if (this.safetyData && this.safetyData.length > 0) {
                this.createSafetyChart();
            } else {
                console.error('Safety data is empty after retrieval.');
            }
        },
        error => {
            console.error('Error fetching safety data:', error);
        }
    );
}




createRevenueChart(): void {
        if (!this.dataRevenue || this.dataRevenue.length === 0) {
            console.error('Revenue data is undefined or empty.');
            return;
        }
    
        const filteredRevenueData = this.filterRevenueData();
        const aggregatedData = this.aggregateRevenueData(filteredRevenueData);
    
        const labels = aggregatedData.map(item => item.label);
        const sum = aggregatedData.map(item => item.sum);
    
        if (this.revenueChart) {
            this.revenueChart.destroy();
        }
    
        this.revenueChart = new Chart("lineChartRevenue", {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Revenue by Zone',
                    data: sum,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,  // Allow custom sizing
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#495057'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context: any) => `Volume: ${context.raw}`
                        }
                    }
                },
             
                
            }
        
        });
    }
    
    createDeliveryChart(): void {
        if (!this.dataDelivery || this.dataDelivery.length === 0) {
            console.error('Delivery data is undefined or empty.');
            return;
        }
    
        const filteredData = this.filterDeliveryData();
        const aggregatedData = this.aggregateDeliveryData(filteredData);
    
        const labels = aggregatedData.map(item => item.label);
        const averages = aggregatedData.map(item => item.average);
    
        if (this.deliveryChart) {
            this.deliveryChart.destroy();
        }
    
        this.deliveryChart = new Chart("BarChartDelivery", {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Deliveries by Product',
                    data: averages,
                    backgroundColor: this.getBackgroundColors(averages.length),
                    borderColor: this.getBackgroundColors(averages.length).map(color => this.darkenColor(color, 0.2)),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: (context: any) => `Deliveries: ${context.raw}`
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef',
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: '#495057',
                          //  beginAtZero: true
                        },
                        grid: {
                            color: '#ebedef',
                            drawBorder: false
                        }
                    }
                }
            }
        });
    }

 // Chart methods for new data
 createQuantiteRetardeeProductionChart(): void {
    const filteredData = this.filterQuantiteRetardeeProductionData();
    const labels = filteredData.map(item => item.date);
    const data = filteredData.map(item => item.productionPercentage);
    
    this.quantiteRetardeeProductionChart = new Chart('quantiteRetardeeProductionChart', {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantité Retardée Production',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: this.chartOptions
    });
}

createQuantiteRetardeeLivraisonChart(): void {
    const filteredData = this.filterQuantiteRetardeeLivraisonData();
    const labels = filteredData.map(item => item.date);
    const data = filteredData.map(item => item.livraisonPercentage);
    
    this.quantiteRetardeeLivraisonChart = new Chart('quantiteRetardeeLivraisonChart', {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantité Retardée Livraison',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: this.chartOptions
    });
}

createTauxDefautChart(): void {
    const filteredData = this.filterTauxDefautData();
    const labels = filteredData.map(item => item.date);
    const data = filteredData.map(item => item.tauxDefaut);
    
    this.tauxDefautChart = new Chart('tauxDefautChart', {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Taux de Défaut',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: this.chartOptions
    });
}

createJourDeStockageChart(): void {
    const filteredData = this.filterJourDeStockageData();
    const labels = filteredData.map(item => item.date);
    const data = filteredData.map(item => item.jourDeStockage);
    
    this.jourDeStockageChart = new Chart('jourDeStockageChart', {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Jour de Stockage',
                data: data,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }]
        },
        options: this.chartOptions
    });
}



createVolumeChart(): void {
    if (!this.dataVolume || this.dataVolume.length === 0) {
        console.error('Volume data is undefined or empty.');
        return;
    }

    const filteredVolumData = this.filteredVolumData();
    const aggregatedData = this.aggregateData(filteredVolumData);

    const labels = aggregatedData.map(item => item.label);
    const averages = aggregatedData.map(item => item.average);

    if (this.volumeChart) {
        this.volumeChart.destroy();
    }

    const canvas: HTMLCanvasElement | null = document.getElementById("pieChartVolumProduct") as HTMLCanvasElement;

    this.volumeChart = new Chart(canvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Volume Percentage by Product',
                data: averages,
                backgroundColor: this.getBackgroundColors(averages.length),
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,  // Allow custom sizing
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#495057'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context: any) => `Volume: ${context.raw}`
                    }
                }
            },
            layout: {
                padding: {
                    left: 40,
                    right: 40,
                    top: 40,
                    bottom: 40
                }
            },
            elements: {
                arc: {
                    borderWidth: 1,
                    hoverBorderColor: 'rgba(0, 0, 0, 0.7)',
                    hoverBorderWidth: 1,
                   
                }
            }
        }
    });
}
createTravailEnCoursWIPChart(): void {
    if (this.travailEnCoursWIPChart) {
        this.travailEnCoursWIPChart.destroy();
    }

    // Define the possible statuses
    type TravailEnCoursWIPStatus = 'In progress' | 'Cloturé' | 'Late ' | 'Not Available';

    // Aggregating the data based on TravailEnCoursWIP status
    const filteredData = this.filterTravailEnCoursWIPData();
    const statusCounts: Record<TravailEnCoursWIPStatus, number> = {
        'In progress': 0,
        'Cloturé': 0,
        'Late ': 0,
        'Not Available': 0
    };

    filteredData.forEach(item => {
        const status = item.TravailEnCoursWIP as TravailEnCoursWIPStatus;
        if (status in statusCounts) {
            statusCounts[status]++;
        }
    });

    const labels = Object.keys(statusCounts) as TravailEnCoursWIPStatus[];
    const data = Object.values(statusCounts);
    
    this.travailEnCoursWIPChart = new Chart('travailEnCoursWIPChart', {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor:this.getBackgroundColors(labels.length),
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: ${value}`;
                        }
                    }
                }
            }
        }
    });
}



createLivraisonATempChart(): void {
    const filteredData = this.filterLivraisonATempData();
    const labels = filteredData.map(item => item.date);
    const data = filteredData.map(item => item.livraisonATemp);
    
    this.livraisonATempChart = new Chart('livraisonATempChart', {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Livraison à Temps',
                data: data,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: this.chartOptions
    });
}

createAbsenteismeChart(): void {
    const filteredData = this.filterAbsenteismeData();
    const labels = filteredData.map(item => item.date);
    const data = filteredData.map(item => item.tauxAbsenteisme);
    
    this.absenteismeChart = new Chart('absenteismeChart', {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Absenteisme',
                data: data,
                backgroundColor: 'rgba(255, 99, 71, 0.2)',
                borderColor: 'rgba(255, 99, 71, 1)',
                borderWidth: 1
            }]
        },
        options: this.chartOptions
    });
}

createSafetyChart(): void {
    const filteredData = this.filterSafetyData();
    const labels = filteredData.map(item => item.NameZone);
    const data = filteredData.map(item => item.AccidentNumber);
    
    this.safetyChart = new Chart('safetyChart', {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Safety',
                data: data,
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: this.chartOptions
    });
}

    aggregateDeliveryData(data: any[]): any[] {
        const aggregation: { [key: string]: { sum: number, count: number } } = {};
    
        data.forEach(item => {
            if (!aggregation[item.zone]) {
                aggregation[item.zone] = { sum: 0, count: 0 };
            }
            aggregation[item.zone].sum += item.livraisonPercentage;
            aggregation[item.zone].count += 1;
        });
    
        return Object.keys(aggregation).map(zone => ({
            label: zone,
            average: aggregation[zone].sum / aggregation[zone].count
        }));
    }
    
    aggregateData(data: any[]): any[] {
        const aggregation: { [key: string]: { sum: number, count: number } } = {};

        data.forEach(item => {
            if (!aggregation[item.zone]) {
                aggregation[item.zone] = { sum: 0, count: 0 };
            }
            aggregation[item.zone].sum += item.volumePercentage;
            aggregation[item.zone].count += 1;
        });

        return Object.keys(aggregation).map(zone => ({
            label: zone,
            average: aggregation[zone].sum / aggregation[zone].count
        }));
    }
    // TODO
    // aggregatetravailEnCourData(data: any[]): any[] {
    //     const aggregation: { [key: string]: { sum: number, count: number } } = {};
    
    //     data.forEach(item => {
    //         if (!aggregation[item.zone]) {
    //             aggregation[item.zone] = { sum: 0, count: 0 };
    //         }
    //         aggregation[item.zone].sum += item.chiffreDAffaire;
    //         aggregation[item.zone].count += 1;
    //     });
    
    //     return Object.keys(aggregation).map(zone => ({
    //         label: zone,
    //         sum: aggregation[zone].sum 
    //     }));
    // }

aggregateRevenueData(data: any[]): any[] {
        const aggregation: { [key: string]: { sum: number, count: number } } = {};
    
        data.forEach(item => {
            if (!aggregation[item.zone]) {
                aggregation[item.zone] = { sum: 0, count: 0 };
            }
            aggregation[item.zone].sum += item.chiffreDAffaire;
            aggregation[item.zone].count += 1;
        });
    
        return Object.keys(aggregation).map(zone => ({
            label: zone,
            sum: aggregation[zone].sum 
        }));
    }
    
getBackgroundColors(length: number): string[] {
        const colors = ['Red', 'Pink', 'Green', 'Yellow', 'Orange', 'Blue', 'Purple', 'Teal', 'Magenta', 'Cyan', 'Lime', 'Indigo'];
        return colors.slice(0, length);
    }

darkenColor(color: string, amount: number): string {
        const rgb = this.hexToRgb(color);
        if (rgb) {
            const [r, g, b] = rgb;
            return `rgb(${Math.max(0, r - amount * 255)}, ${Math.max(0, g - amount * 255)}, ${Math.max(0, b - amount * 255)})`;
        }
        return color;
    }

hexToRgb(hex: string): number[] | null {
        // Expand shorthand form (e.g., "03F") to full form (e.g., "0033FF")
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : null;
    }

onFilterChange(): void {
       this.createVolumeChart();
       this.createDeliveryChart();
       this.createRevenueChart();
       this.createQuantiteRetardeeLivraisonChart();
       this.createQuantiteRetardeeProductionChart();
       this.createTauxDefautChart();
       this.createJourDeStockageChart();
       this.createTravailEnCoursWIPChart(); 
    }

ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        this.volumeChart?.destroy();
        this.deliveryChart?.destroy();
    }

}
