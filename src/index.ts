import './styles.scss';

type ROIResult = {
  totalInvestment: number;
  totalSavingsOverTimeFrame: number;
  totalMaintenanceCostsOverTimeFrame: number;
  netSavingsOverTimeFrame: number;
  roi: number;
};

function calculateROI(
  costSolar: number,
  costBatteries: number,
  costVPP: number,
  savingsSolar: number,
  savingsBatteries: number,
  savingsVPP: number,
  maintenanceSolar: number,
  maintenanceBatteries: number,
  maintenanceVPP: number,
  years: number,
  optInVPP: boolean
): ROIResult {
  // Calculate total investment
  let totalInvestment = costSolar + costBatteries;
  if (optInVPP) {
      totalInvestment += costVPP;
  }

  // Calculate total savings
  let totalSavings = (savingsSolar + savingsBatteries) * years;
  if (optInVPP) {
      totalSavings += savingsVPP * years;
  }

  // Calculate total maintenance costs
  let totalMaintenance = (maintenanceSolar + maintenanceBatteries) * years;
  if (optInVPP) {
      totalMaintenance += maintenanceVPP * years;
  }

  // Calculate net savings
  let netSavings = totalSavings - totalMaintenance;

  // Calculate ROI
  let roi = ((netSavings - totalInvestment) / totalInvestment) * 100;

  return {
      totalInvestment,
      totalSavingsOverTimeFrame: totalSavings,
      totalMaintenanceCostsOverTimeFrame: totalMaintenance,
      netSavingsOverTimeFrame: netSavings,
      roi
  };
}

class Carousel {
  private slides: NodeListOf<HTMLElement>;
  private navItems: NodeListOf<HTMLElement>;

  constructor() {
      this.slides = document.querySelectorAll('.carousel-slide')!;
      this.navItems = document.querySelectorAll('.carousel-nav-item')!;

      this.navItems.forEach(item => item.addEventListener('click', (e) => this.handleNavClick(e)));
  }

  private handleNavClick(event: Event): void {
      const targetItem = event.currentTarget as HTMLElement;
      const targetIndex = parseInt(targetItem.dataset.slide!);

      this.navItems.forEach(item => item.classList.remove('active'));
      targetItem.classList.add('active');

      this.slides.forEach(slide => slide.classList.remove('current-slide'));
      this.slides[targetIndex].classList.add('current-slide');
  }
}

document.addEventListener('DOMContentLoaded', () => new Carousel());

// Example Usage
const costSolar = 10000;
const costBatteries = 5000;
const costVPP = 2000;
const savingsSolar = 1000;
const savingsBatteries = 500;
const savingsVPP = 200;
const maintenanceSolar = 100;
const maintenanceBatteries = 50;
const maintenanceVPP = 20;
const years = 10;
const optInVPP = true;

const roiResults = calculateROI(
  costSolar,
  costBatteries,
  costVPP,
  savingsSolar,
  savingsBatteries,
  savingsVPP,
  maintenanceSolar,
  maintenanceBatteries,
  maintenanceVPP,
  years,
  optInVPP
);

console.log(`Total Investment: $${roiResults.totalInvestment.toFixed(2)}`);
console.log(`Total Savings Over Time Frame: $${roiResults.totalSavingsOverTimeFrame.toFixed(2)}`);
console.log(`Total Maintenance Costs Over Time Frame: $${roiResults.totalMaintenanceCostsOverTimeFrame.toFixed(2)}`);
console.log(`Net Savings Over Time Frame: $${roiResults.netSavingsOverTimeFrame.toFixed(2)}`);
console.log(`Return on Investment (ROI): ${roiResults.roi.toFixed(2)}%`);