import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ChartsService } from '../../../Core/Services/AdminServices/charts.service';
import { Chart } from '../../../Core/Interfaces/Charts/chart';
import { ChartResponse } from '../../../Core/Interfaces/Charts/chart-response';
import { ProductService } from '../../../Core/Services/AdminServices/product.service';
import { ProductParams } from '../../../Core/Interfaces/Products/product-params';
import { ApplicationResultService } from '../../../Core/Interfaces/application-result-service';
import { Pagination } from '../../../Core/Interfaces/pagination';
import { ProductResponse } from '../../../Core/Interfaces/Products/product-response';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    ChartModule,
    CalendarModule,
    CommonModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  items!: any[]; // Items
  data: any; // Chart
  options: any; // Chart
  charts!: any; // Chart
  totalSales!: number[];
  totalBuyer!: number[];
  totalSale!: number;
  totalBuyerValue!: number;
  labels: string[] = [];
  productsCount!: number;
  rangeDates: Date[] = [];
  params: Chart = new Chart();
  private langChangeSub!: Subscription;
  private readonly isBrowser: boolean;
  constructor(
    private readonly _chartService: ChartsService,
    private readonly _productService: ProductService,
    private readonly _translate: TranslateService,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.getChartsValues();
    this.langChangeSub = this._translate.onLangChange.subscribe(() => {
      if (this.charts) {
        this.initializeChart();
      }
      if (this.items) {
        this.initializeItems();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  getChartsValues() {
    this._chartService.getCharts(this.params).subscribe({
      next: (res: ChartResponse) => {
        this.totalSales = res.salesTotal;
        this.totalBuyer = res.purchaseTotal;
        this.labels = res.labels;
        this.totalSale = this.totalSales.reduce((a, b) => a + b, 0);
        this.totalBuyerValue = this.totalBuyer.reduce((a, b) => a + b, 0);
        this.initializeChart();
        this.getProductCount();
      },
    });
  }

  onDateSelect() {
    if (!this.rangeDates || this.rangeDates.length !== 2) return;
    if (!this.rangeDates[0] || !this.rangeDates[1]) return;
    this.params = {
      fromDate: this.rangeDates[0],
      toDate: this.rangeDates[1],
    };
    this.getChartsValues();
  }
  initializeChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary',
    );
    this.charts =
      // Total revenue main chart
      {
        title: 'Total revenue',
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Total Purchase',
              data: this.totalBuyer,
              fill: true,
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              tension: 0.4,
              pointRadius: 0, // to hide points
              pointHoverRadius: 5,
              // borderWidth: 2, // width line charts

              // make BackgroundColor gradient
              backgroundColor: (context: any) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) return 'rgba(59,130,246,0.2)';
                const gradient = ctx.createLinearGradient(
                  0,
                  chartArea.top,
                  0,
                  chartArea.bottom,
                );
                gradient.addColorStop(0, 'rgba(59,130,246,0.35)');
                gradient.addColorStop(1, 'rgba(59,130,246,0)');
                return gradient;
              },
            },
            {
              label: 'Total Sales',
              data: this.totalSales,
              fill: true,
              borderColor: documentStyle.getPropertyValue('--pink-500'),
              tension: 0.6,
              pointRadius: 0,
              pointHoverRadius: 6,
              backgroundColor: (context: any) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) return null;
                const gradient = ctx.createLinearGradient(
                  0,
                  chartArea.top,
                  0,
                  chartArea.bottom,
                );
                gradient.addColorStop(0, 'rgba(236,72,153,0.35)');
                gradient.addColorStop(1, 'rgba(236,72,153,0)');
                return gradient;
              },
            },
          ],
        },
        options: {
          maintainAspectRatio: false, // to access style
          aspectRatio: 0.7, // control height
          interaction: {
            mode: 'index', // to make hover in any where point at charts
            intersect: false,
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'start',
              labels: { color: textColor, usePointStyle: true, padding: 20 },
            },
            // To Make hover in any point at charts
            Tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              titleColor: '#fff',
              bodyColor: '#fff',
              titleFont: { size: 13 },
              bodyFont: { size: 15, weight: 'bold' },
              padding: 12,
              displayColors: true,
            },
          },
          scales: {
            x: {
              ticks: {
                color: textColorSecondary,
                // stepSize: 5,
              },
              // show horizontal line and vertical line in data sheet
              grid: {
                display: false,
              },
              // show vertical line
              border: {
                display: false,
              },
            },
            y: {
              ticks: {
                // stepSize: 20,
                color: textColorSecondary,
              },
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
            },
          },
        },
      };
  }

  initializeItems() {
    this.items = [
      {
        label: 'Products',
        icon: 'pi pi-th-large',
        title: this.productsCount,
      },
      {
        label: 'Total Sales',
        icon: 'pi pi-arrow-up-right',
        title: this.totalSale,
      },
      {
        label: 'Total Purchases',
        icon: 'pi pi-arrow-down-left',
        title: this.totalBuyerValue,
      },
    ];
  }

  getProductCount() {
    this._productService.getProducts(new ProductParams()).subscribe({
      next: (res: ApplicationResultService<Pagination<ProductResponse>>) => {
        this.productsCount = res.data.count;
        this.initializeItems();
      },
    });
  }
}
