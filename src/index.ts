import './styles.scss';

// type ROIResult = {
//   totalInvestment: number;
//   totalSavingsOverTimeFrame: number;
//   totalMaintenanceCostsOverTimeFrame: number;
//   netSavingsOverTimeFrame: number;
//   roi: number;
// };

// function calculateROI(
//   costSolar: number,
//   costBatteries: number,
//   costVPP: number,
//   savingsSolar: number,
//   savingsBatteries: number,
//   savingsVPP: number,
//   maintenanceSolar: number,
//   maintenanceBatteries: number,
//   maintenanceVPP: number,
//   years: number,
//   optInVPP: boolean
// ): ROIResult {
//   // Calculate total investment
//   let totalInvestment = costSolar + costBatteries;
//   if (optInVPP) {
//       totalInvestment += costVPP;
//   }

//   // Calculate total savings
//   let totalSavings = (savingsSolar + savingsBatteries) * years;
//   if (optInVPP) {
//       totalSavings += savingsVPP * years;
//   }

//   // Calculate total maintenance costs
//   let totalMaintenance = (maintenanceSolar + maintenanceBatteries) * years;
//   if (optInVPP) {
//       totalMaintenance += maintenanceVPP * years;
//   }

//   // Calculate net savings
//   let netSavings = totalSavings - totalMaintenance;

//   // Calculate ROI
//   let roi = ((netSavings - totalInvestment) / totalInvestment) * 100;

//   return {
//       totalInvestment,
//       totalSavingsOverTimeFrame: totalSavings,
//       totalMaintenanceCostsOverTimeFrame: totalMaintenance,
//       netSavingsOverTimeFrame: netSavings,
//       roi
//   };
// }

// class Carousel {
//   private slides: NodeListOf<HTMLElement>;
//   private navItems: NodeListOf<HTMLElement>;

//   constructor() {
//       this.slides = document.querySelectorAll('.carousel-slide')!;
//       this.navItems = document.querySelectorAll('.carousel-nav-item')!;

//       this.navItems.forEach(item => item.addEventListener('click', (e) => this.handleNavClick(e)));
//   }

//   private handleNavClick(event: Event): void {
//       const targetItem = event.currentTarget as HTMLElement;
//       const targetIndex = parseInt(targetItem.dataset.slide!);

//       this.navItems.forEach(item => item.classList.remove('active'));
//       targetItem.classList.add('active');

//       this.slides.forEach(slide => slide.classList.remove('current-slide'));
//       this.slides[targetIndex].classList.add('current-slide');
//   }
// }

// document.addEventListener('DOMContentLoaded', () => new Carousel());

// // Example Usage
// const costSolar = 10000;
// const costBatteries = 5000;
// const costVPP = 2000;
// const savingsSolar = 1000;
// const savingsBatteries = 500;
// const savingsVPP = 200;
// const maintenanceSolar = 100;
// const maintenanceBatteries = 50;
// const maintenanceVPP = 20;
// const years = 10;
// const optInVPP = true;

// const roiResults = calculateROI(
//   costSolar,
//   costBatteries,
//   costVPP,
//   savingsSolar,
//   savingsBatteries,
//   savingsVPP,
//   maintenanceSolar,
//   maintenanceBatteries,
//   maintenanceVPP,
//   years,
//   optInVPP
// );

// console.log(`Total Investment: $${roiResults.totalInvestment.toFixed(2)}`);
// console.log(`Total Savings Over Time Frame: $${roiResults.totalSavingsOverTimeFrame.toFixed(2)}`);
// console.log(`Total Maintenance Costs Over Time Frame: $${roiResults.totalMaintenanceCostsOverTimeFrame.toFixed(2)}`);
// console.log(`Net Savings Over Time Frame: $${roiResults.netSavingsOverTimeFrame.toFixed(2)}`);
// console.log(`Return on Investment (ROI): ${roiResults.roi.toFixed(2)}%`);

let lastScrollY = window.scrollY;

// Define the options for the Intersection Observer
const observerOptions: IntersectionObserverInit = {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin around the root
  threshold: 0.05 // Trigger when 10% of the target is visible
};

// Function to handle the intersection events
const handleIntersection: IntersectionObserverCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        entry.target.classList.add('initial-down');
        entry.target.classList.remove('initial-up');
      } else {
        // Scrolling up
        entry.target.classList.add('initial-up');
        entry.target.classList.remove('initial-down');
      }
      // Add the 'animate' class to revert to translateY(0) after a short delay
      setTimeout(() => {
        entry.target.classList.add('animate');
      }, 100); // Adjust the delay as needed
    } else {
      entry.target.classList.remove('initial-up', 'initial-down', 'animate');
    }
  });
};

// Create the Intersection Observer instance
const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Target all the sections you want to animate
const sections = document.querySelectorAll('.section-to-animate');

// Observe each section
sections.forEach(section => {
  observer.observe(section);
});

// Update lastScrollY on scroll
window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
});

/* Scroll to */
document.addEventListener('DOMContentLoaded', () => {
  // Get all buttons with the data-target attribute
  const scrollButtons = document.querySelectorAll('[data-target]');

  // Function to smoothly scroll to the target section
  const scrollToSection = (event: Event) => {
    const button = event.currentTarget as HTMLElement;
    const targetId = button.getAttribute('data-target');
    if (targetId) {
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        console.error(`No element found with ID ${targetId}`);
      }
    } else {
      console.error('No target ID specified');
    }
  };

  // Add event listeners to all buttons
  scrollButtons.forEach(button => {
    button.addEventListener('click', scrollToSection);
  });
});

/* Calculator */
document.addEventListener('DOMContentLoaded', () => {
  const solarCheckbox = document.getElementById('solar') as HTMLInputElement;
  const batteryCheckbox = document.getElementById('battery') as HTMLInputElement;
  const vppCheckbox = document.getElementById('vpp') as HTMLInputElement;
  const yearlySavingsElement = document.getElementById('yearly-savings') as HTMLElement;
  const checkoutButton = document.getElementById('checkout-button') as HTMLAnchorElement;

  let vppPreviouslyChecked = vppCheckbox.checked;

  const calculateSavings = () => {
      let totalSavings = 0;

      const checkboxes = [solarCheckbox, batteryCheckbox, vppCheckbox];
      let anyChecked = false;

      checkboxes.forEach(checkbox => {
          if (checkbox.checked) {
              const savings = parseInt(checkbox.getAttribute('data-savings') || '0', 10);
              totalSavings += savings;
              anyChecked = true;
          }
      });

      yearlySavingsElement.textContent = `$${totalSavings}`;

      if (anyChecked) {
          checkoutButton.classList.remove('disabled');
      } else {
          checkoutButton.classList.add('disabled');
      }
  };

  const handleBatteryChange = () => {
      if (!batteryCheckbox.checked) {
          vppPreviouslyChecked = vppCheckbox.checked; // Store the state
          vppCheckbox.checked = false;
          vppCheckbox.disabled = true;
      } else {
          vppCheckbox.disabled = false;
          vppCheckbox.checked = vppPreviouslyChecked; // Restore the state
      }
      calculateSavings();
  };

  // Add event listeners to the checkboxes
  solarCheckbox.addEventListener('change', calculateSavings);
  batteryCheckbox.addEventListener('change', handleBatteryChange);
  vppCheckbox.addEventListener('change', calculateSavings);

  // Initial calculation
  handleBatteryChange(); // Ensure the VPP checkbox is properly enabled/disabled
  calculateSavings();
});