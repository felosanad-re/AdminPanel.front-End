import { Component } from '@angular/core';
import { Tooltip } from 'chart.js';
import { callback } from 'chart.js/dist/helpers/helpers.core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { max, min } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ChartModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  items!: any[]; // Items
  data: any; // Chart
  options: any; // Chart
  charts!: any[]; // Cards

  ngOnInit(): void {
    this.items = [
      {
        label: 'Page Views',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Monthly users',
        icon: 'pi pi-refresh',
      },
      {
        label: 'New sign ups',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Subscriptions',
        icon: 'pi pi-refresh',
      },
    ];
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary',
    );
    const TIME_LABELS_FULL = [
      '12AM',
      '3AM',
      '6AM',
      '8AM',
      '12PM',
      '3PM',
      '4PM',
      '7PM',
      '11PM',
    ];
    const VISIBLE_LABEL_POSITIONS = [0, 3, 6, 8];
    const VISIBLE_LABELS = [
      TIME_LABELS_FULL[0], // 12AM
      TIME_LABELS_FULL[3], // 8AM
      TIME_LABELS_FULL[6], // 4PM
      TIME_LABELS_FULL[8], // 11PM
    ];
    this.charts = [
      // Total revenue main chart
      {
        title: 'Total revenue',
        type: 'line',
        data: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              label: 'Revenue',
              data: [65, 59, 80, 81, 56, 55, 40, 52, 68, 75, 88, 95],
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
                if (!chartArea) return null;
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
              label: 'Expenses',
              data: [28, 48, 40, 19, 86, 27, 90, 65, 45, 70, 55, 82],
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
      },
      // ==================== Total profit ====================
      {
        title: 'Total profit',
        type: 'bar', // Chart As one line
        data: {
          labels: TIME_LABELS_FULL,
          datasets: [
            {
              label: 'Revenue',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              data: [25, 32, 28, 39, 45, 38, 30, 42, 35],

              // barThickness: 8, // control line width
              borderRadius: 3,
              borderSkipped: false,
              // To Control Space Between Lines
              barPercentage: 0.78,
              categoryPercentage: 0.95,
            },
            {
              label: 'Expenses',
              backgroundColor: documentStyle.getPropertyValue('--pink-500'),
              borderColor: documentStyle.getPropertyValue('--pink-500'),
              data: [30, 25, 35, 30, 22, 28, 15, 20, 19],

              borderRadius: 3,
              borderSkipped: false,
              barPercentage: 0.78,
              categoryPercentage: 0.92,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          aspectRatio: 1.75,
          plugins: {
            legend: {
              display: false,
            },
            Tooltip: {
              // function To Show 4 Numbers only
              title: function (tooltipItems: any) {
                const index = tooltipItems[0].dataIndex;
                const fullLabel = [
                  '12AM',
                  '2AM',
                  '4AM',
                  '6AM',
                  '8AM',
                  '10AM',
                  '12PM',
                  '2PM',
                  '4PM',
                  '6PM',
                  '8PM',
                  '11PM',
                ];
                return fullLabel[index];
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: textColorSecondary,
                padding: 10,
                autoSkip: false,
                font: { size: 11 },
                callback: function (value: any, index: any) {
                  const positions = [0, 3, 6, 8];

                  if (positions.includes(index)) {
                    return TIME_LABELS_FULL[index] || '—';
                  }
                  return '';
                },
                maxRotation: 0,
                minRotation: 0,
              },
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
            },
            y: {
              min: 0, // minimum value will be 0
              suggestedMax: 50, // maximum value will be 40
              ticks: {
                display: false, // hide numbers in Y axis
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
      },
      //Total sessions
      {
        title: 'Total sessions',
        type: 'line',
        data: {
          labels: TIME_LABELS_FULL,
          datasets: [
            {
              label: 'Revenue',
              data: [5, 8, 12, 18, 20, 22, 24, 26, 25, 28, 31, 35],
              fill: false,
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              tension: 0.35,
              pointRadius: 0,
              pointHoverRadius: 5,
            },
          ],
        },
        options: {
          maintainAspectRatio: false, // to make responsive
          aspectRatio: 1.5, // height for line chart
          plugins: {
            legend: {
              display: false,
            },
            title: function (tooltipItems: any) {
              const index = tooltipItems[0].dataIndex;
              const fullLabel = [
                '12AM',
                '2AM',
                '4AM',
                '6AM',
                '8AM',
                '10AM',
                '12PM',
                '2PM',
                '4PM',
                '6PM',
                '8PM',
                '11PM',
              ];
              return fullLabel[index];
            },
            Tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
            },
          },
          scales: {
            x: {
              ticks: {
                color: textColorSecondary,
                padding: 8,
                callback: function (value: any, index: any) {
                  const showIndices = [0, 4, 8, 11];
                  return showIndices.includes(index) ? value : '';
                },
              },
              grid: {
                display: false,
              },
              border: {
                display: false,
              },
            },
            y: {
              min: 0,
              max: 40,
              ticks: {
                color: textColorSecondary,
                stepSize: 10,
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
      },
    ];
  }
}
