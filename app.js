function calculatePPC() {
// Get input values
const dailySales = parseFloat(document.getElementById(‘dailySales’).value) || 0;
const profitMargin = parseFloat(document.getElementById(‘profitMargin’).value) || 0;
const ctr = parseFloat(document.getElementById(‘ctr’).value) || 0;
const conversionRate = parseFloat(document.getElementById(‘conversionRate’).value) || 0;


// Validate inputs
if (dailySales <= 0 || profitMargin <= 0 || ctr <= 0 || conversionRate <= 0) {
    alert('Please enter valid values for all fields');
    return;
}

// Calculate daily budget (based on 30-40% ACoS for profitability)
// We'll use 30% as aggressive, 40% as conservative
const targetACoS = 30; // 30% target
const dailyBudget = (dailySales * targetACoS) / 100;

// Calculate optimal CPC
// CPC = (Daily Budget / Impressions needed) * 1000
// Or: CPC = (Profit per sale / conversion rate)
// Simpler approach: CPC based on profit margin
const profitPerSale = (dailySales / 100) * profitMargin;
const optimalCPC = profitPerSale * 0.35; // Spend 35% of profit on ads per sale

// Calculate required impressions (reverse from clicks and CTR)
// If we need X clicks and CTR is Y%, then impressions = X / (Y/100)
// Conversions needed = dailySales / avgOrderValue (assume $50 avg)
const avgOrderValue = 50;
const conversionsNeeded = dailySales / avgOrderValue;
const clicksNeeded = (conversionsNeeded * 100) / conversionRate;
const impressionsNeeded = (clicksNeeded * 100) / ctr;

// Calculate break-even ACoS
// Break-even = 100% - profit margin
const breakEvenACoS = 100 - profitMargin;

// Display results
document.getElementById('dailyBudget').textContent = '$' + dailyBudget.toFixed(2);
document.getElementById('optimalCPC').textContent = '$' + optimalCPC.toFixed(2);
document.getElementById('impressions').textContent = Math.round(impressionsNeeded * 30).toLocaleString(); // Monthly
document.getElementById('breakEvenAcos').textContent = breakEvenACoS.toFixed(1) + '%';

// Show results
document.getElementById('ppcResults').style.display = 'block';
document.getElementById('ppcResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });


}

function setPreset(sales, margin, ctrVal, convRate) {
document.getElementById(‘dailySales’).value = sales;
document.getElementById(‘profitMargin’).value = margin;
document.getElementById(‘ctr’).value = ctrVal;
document.getElementById(‘conversionRate’).value = convRate;
calculatePPC();
}

// Enter key support
document.addEventListener(‘DOMContentLoaded’, function() {
const inputs = document.querySelectorAll(’.calc-inputs input’);
inputs.forEach(input => {
input.addEventListener(‘keypress’, function(e) {
if (e.key === ‘Enter’) {
calculatePPC();
}
});
});


// Initialize with default values
calculatePPC();


});