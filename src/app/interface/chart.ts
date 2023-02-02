import { ChartOptions, ChartType, ChartDataset  } from "chart.js";

export class ChartTemplate {
    chartType:ChartType='pie';
    chartOptions:ChartOptions={};
    chartLabels:string[]=[];
    chartDatasets:ChartDataset[] = [];
    chartLegend:boolean=true;
}