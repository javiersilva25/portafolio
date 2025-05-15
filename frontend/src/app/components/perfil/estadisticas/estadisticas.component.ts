import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import type { EChartsCoreOption } from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';

@Component({
  selector: 'app-estadisticas',
  standalone: false,
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent  implements OnInit {
  options: EChartsCoreOption = {};

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['bar', 'bar2'],
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
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    };
  }

  cancelar() {
    this.modalController.dismiss(null);
  }
}
