import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import type { EChartsCoreOption } from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components'; // Import missing components
import { PerfilService } from 'src/app/services/perfil.service';
import { LineChart } from 'echarts/charts';

// Register the components with ECharts
import * as echarts from 'echarts/core';
echarts.use([TooltipComponent, LegendComponent, LineChart]); // Register Tooltip and Legend components

@Component({
  selector: 'app-estadisticas',
  standalone: false,
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
  options: EChartsCoreOption = {};
  medidas: any[] = [];
  fechas: string[] = [];
  valores: number[] = [];
  colores = ['#36802d', '#33FF57', '#3357FF', '#FF33A1', '#FF8C33'];

  constructor(private modalController: ModalController, private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.perfilService.getMedidas().subscribe({
      next: (data) => {
        this.medidas = data;
        this.medidas.forEach(medida => {
          this.fechas.push(medida.fecha);
          this.valores.push(medida.valor);
        });

        console.log(this.medidas); // BORRAR
        console.log(this.fechas); // BORRAR
        console.log(this.valores); // BORRAR

        const xAxisData = this.fechas;
        const data1 = this.valores;

        this.options = {
          legend: {
            data: ['Peso (Kg)'],
            align: 'left',
          },
          tooltip: {},
          xAxis: {
            data: xAxisData,
            axisTick  : {
              alignWithLabel: true
            },
            axisLabel: {
              rotate: -45,
              interval: 0
            }
          },
          yAxis: [{
            type: 'value',
          }],
          series: [
            {
              name: 'Peso (Kg)',
              type: 'line',
              barWidth: '60%',
              data: data1
            },
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: idx => idx * 5,
          color: this.colores[0]
        };
      },
      error: (err) => {
        console.error('Error al obtener medidas del usuario', err);
      }
    });
  }

  cancelar() {
    this.modalController.dismiss(null);
  }
}
