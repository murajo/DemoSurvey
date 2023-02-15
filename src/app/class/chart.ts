import { ChartOptions, ChartType, ChartDataset } from "chart.js";

export class ChartTemplate {
    chartType: ChartType;
    chartOptions: ChartOptions;
    chartLabels: string[];
    chartDatasets: ChartDataset[];
    chartLegend: boolean;

    constructor() {
        this.chartType = "pie";
        this.chartOptions = {};
        this.chartLabels = [];
        this.chartDatasets = [];
        this.chartLegend = true;
    }
}