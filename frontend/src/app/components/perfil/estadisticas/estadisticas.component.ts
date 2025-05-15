import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import type { EChartsCoreOption } from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-estadisticas',
  standalone: false,
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent  implements OnInit {
  options: EChartsCoreOption = {};
  medidas: any[] = [];
  fechas: string[] = [];
  valores: number[] = [];

  constructor(private modalController: ModalController,
    private perfilService: PerfilService
  ) { }

  ngOnInit(): void {
    this.perfilService.getMedidas().subscribe({
      next: (data) => {
        this.medidas = data;

        this.medidas.forEach(medida => {
          this.fechas.push(medida.fecha);
          this.valores.push(medida.valor);
        });

        
        // this.medidas = this.agruparMedidasPorNombre(data);
        console.log(this.medidas); // BORRAR
        console.log(this.fechas); // BORRAR
        console.log(this.valores); // BORRAR

        const xAxisData = this.fechas;
        const data1 = this.valores;

        this.options = {
          legend: {
            data: ['bar'],
            align: 'left',
          },
          tooltip: {},
          xAxis: {
            data: xAxisData,
            silent: false,
            splitLine: {
              show: false,
            },
          },
          yAxis: [{
            type: 'value',
          }],
          series: [
            {
              name: 'bar',
              type: 'bar',
              barWidth: '60%',
              data: data1
            },
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: idx => idx * 5,
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
