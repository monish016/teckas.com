// === ROI Calculator ===
const roleData = {
  'va': { label: 'Virtual Assistant', localMin: 42000, localMax: 55000, teckasMin: 1200, teckasMax: 1500 },
  'virtual-assistant': { label: 'Virtual Assistant', localMin: 42000, localMax: 55000, teckasMin: 1200, teckasMax: 1500 },
  'support': { label: 'Customer Support Rep', localMin: 38000, localMax: 48000, teckasMin: 1200, teckasMax: 1500 },
  'customer-support': { label: 'Customer Support Rep', localMin: 38000, localMax: 48000, teckasMin: 1200, teckasMax: 1500 },
  'sales': { label: 'Sales Development Rep (SDR)', localMin: 50000, localMax: 65000, teckasMin: 1400, teckasMax: 1800 },
  'sdr': { label: 'Sales Development Rep (SDR)', localMin: 50000, localMax: 65000, teckasMin: 1400, teckasMax: 1800 },
  'bookkeeping': { label: 'Bookkeeper / Accountant', localMin: 48000, localMax: 65000, teckasMin: 1400, teckasMax: 1800 },
  'bookkeeper': { label: 'Bookkeeper / Accountant', localMin: 48000, localMax: 65000, teckasMin: 1400, teckasMax: 1800 },
  'marketing': { label: 'Digital Marketing Specialist', localMin: 50000, localMax: 70000, teckasMin: 1400, teckasMax: 1800 },
  'design': { label: 'Graphic / UI Designer', localMin: 50000, localMax: 72000, teckasMin: 1400, teckasMax: 1800 },
  'designer': { label: 'Graphic / UI Designer', localMin: 50000, localMax: 72000, teckasMin: 1400, teckasMax: 1800 },
  'dev': { label: 'Software Developer', localMin: 75000, localMax: 110000, teckasMin: 2000, teckasMax: 2500 },
  'developer': { label: 'Software Developer', localMin: 75000, localMax: 110000, teckasMin: 2000, teckasMax: 2500 },
  'qa': { label: 'QA Engineer', localMin: 65000, localMax: 90000, teckasMin: 2000, teckasMax: 2500 },
  'ops': { label: 'Operations / Project Coordinator', localMin: 45000, localMax: 60000, teckasMin: 1200, teckasMax: 1500 },
  'operations': { label: 'Operations / Project Coordinator', localMin: 45000, localMax: 60000, teckasMin: 1200, teckasMax: 1500 }
};

// Global function for onclick button
window.calculateSavings = function() {
  const roleSelect = document.getElementById('calcRole');
  const salaryInput = document.getElementById('calcSalary');
  const hiresInput = document.getElementById('calcHires');
  const resultsDiv = document.getElementById('calcResults');

  if (!roleSelect || !salaryInput || !resultsDiv) return;

  const role = roleData[roleSelect.value];
  if (!role) {
    alert('Please select a role category first.');
    return;
  }

  const localSalary = parseInt(salaryInput.value, 10) || role.localMin;
  const hires = parseInt(hiresInput?.value, 10) || 1;
  const teckasAnnual = role.teckasMin * 12;
  const annualSavingsPerHire = localSalary - teckasAnnual;
  const totalSavings = annualSavingsPerHire * hires;

  // Support both ID naming conventions
  const localCostEl = document.getElementById('calcLocalCost') || document.getElementById('localCost');
  const teckasCostEl = document.getElementById('calcTeckasCost') || document.getElementById('teckasCost');
  const savingsAmountEl = document.getElementById('calcSavingsAmount') || document.getElementById('savingsAmount');
  const savingsLabelEl = document.getElementById('calcSavingsLabel') || document.querySelector('.savings-label');

  if (localCostEl) localCostEl.textContent = '$' + (localSalary * hires).toLocaleString();
  if (teckasCostEl) teckasCostEl.textContent = '$' + (teckasAnnual * hires).toLocaleString();
  if (savingsAmountEl) savingsAmountEl.textContent = '$' + Math.max(0, totalSavings).toLocaleString();
  if (savingsLabelEl) savingsLabelEl.textContent =
    hires > 1 ? `Annual savings with ${hires} hires` : 'Your Annual Savings';

  resultsDiv.style.display = 'block';
}

function initCalculator() {
  const roleSelect = document.getElementById('calcRole');
  const salaryInput = document.getElementById('calcSalary');

  if (!roleSelect || !salaryInput) return;

  // Prefill salary when role changes
  roleSelect.addEventListener('change', () => {
    const role = roleData[roleSelect.value];
    if (role) {
      salaryInput.value = role.localMin;
      salaryInput.placeholder = `$${role.localMin.toLocaleString()} - $${role.localMax.toLocaleString()}`;
    }
  });
}

document.addEventListener('DOMContentLoaded', initCalculator);
