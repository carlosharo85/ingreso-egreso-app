import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateWithIngresoEgreso } from '../ingreso-egreso.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
    selector: 'app-estadistica',
    templateUrl: './estadistica.component.html',
    styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {

    contIngresos: number = 0;
    contEgresos: number = 0;
    totalIngresos: number = 0;
    totalEgresos: number = 0;


    constructor(
        private store: Store<AppStateWithIngresoEgreso>
    ) { }


    ngOnInit(): void {
        this.store.select('ingresosEgresos')
        .subscribe(({ items }) => {
            this.generarEstadistica(items);
        });
    }


    generarEstadistica(items: IngresoEgreso[]): void {
        this.contIngresos = 0;
        this.contEgresos = 0;
        this.totalIngresos = 0;
        this.totalEgresos = 0;
        

        items.forEach(item => {
            if (item.tipo === 'ingreso') {
                this.contIngresos++;
                this.totalIngresos += item.monto;
            } else {
                this.contEgresos++;
                this.totalEgresos += item.monto;
            }
        });

        this.doughnutChartData.datasets[0].data = [this.totalIngresos, this.totalEgresos];
    }


    // Doughnut
    public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
    public doughnutChartData: ChartData<'doughnut'> = {
        labels: this.doughnutChartLabels,
        datasets: [
            { data: [ ] }
        ]
    };
    public doughnutChartType: ChartType = 'doughnut';
    
    // events
    public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
        console.log(event, active);
    }
    
    public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
        console.log(event, active);
    }

}
