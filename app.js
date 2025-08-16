// Currency data with country codes for flags
const currencies = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

// DOM elements
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const fromFlag = document.getElementById('fromFlag');
const toFlag = document.getElementById('toFlag');
const swapBtn = document.getElementById('swapBtn');
const convertBtn = document.getElementById('convertBtn');
const convertedAmount = document.getElementById('convertedAmount');
const exchangeRate = document.getElementById('exchangeRate');
const lastUpdated = document.getElementById('lastUpdated');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');

// API configuration
const API_KEY = 'your-api-key-here'; // Replace with your API key
const API_BASE_URL = 'https://v6.exchangerate-api.com/v6';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    populateCurrencySelects();
    updateFlags();
    setupEventListeners();
    convertCurrency(); // Initial conversion
});

// Populate currency select options
function populateCurrencySelects() {
    const fromSelect = fromCurrencySelect;
    const toSelect = toCurrencySelect;
    
    // Clear existing options except the first ones
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
    
    // Add currency options
    Object.keys(currencies).forEach(code => {
        const currency = currencies[code];
        const option1 = new Option(`${code}`, code);
        const option2 = new Option(`${code}`, code);
        
        fromSelect.appendChild(option1);
        toSelect.appendChild(option2);
    });
    
    // Set default selections
    fromSelect.value = 'INR';
    toSelect.value = 'USD';
}

// Update flag images based on selected currencies
function updateFlags() {
    const fromCode = fromCurrencySelect.value;
    const toCode = toCurrencySelect.value;
    
    if (currencies[fromCode]) {
    fromFlag.src = `https://flagsapi.com/${currencies[fromCode]}/shiny/64.png`;
    fromFlag.alt = `${fromCode} flag`;
    }
    else {
    toFlag.src = "";
    toFlag.alt = "No flag available";
    }

    if (currencies[toCode]) {
    toFlag.src = `https://flagsapi.com/${currencies[toCode]}/shiny/64.png`;
    toFlag.alt = `${toCode} flag`;
    }
    else {
    toFlag.src = "";
    toFlag.alt = "No flag available";
    }

}

// Setup event listeners
function setupEventListeners() {
    amountInput.addEventListener('input', debounce(convertCurrency, 500));
    fromCurrencySelect.addEventListener('change', () => {
        updateFlags();
        convertCurrency();
    });
    toCurrencySelect.addEventListener('change', () => {
        updateFlags();
        convertCurrency();
    });
    swapBtn.addEventListener('click', swapCurrencies);
    convertBtn.addEventListener('click', convertCurrency);
    
    // Enter key support
    amountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            convertCurrency();
        }
    });
}

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Swap currencies
function swapCurrencies() {
    const tempValue = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = tempValue;
    
    updateFlags();
    convertCurrency();
}

// Main conversion function
async function convertCurrency() {
    const amount = parseFloat(amountInput.value) || 0;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    
    if (amount <= 0) {
        convertedAmount.textContent = '0.00';
        exchangeRate.textContent = `1 ${fromCurrency} = 0.00 ${toCurrency}`;
        return;
    }
    
    if (fromCurrency === toCurrency) {
        convertedAmount.textContent = formatAmount(amount);
        exchangeRate.textContent = `1 ${fromCurrency} = 1.00 ${toCurrency}`;
        lastUpdated.textContent = `Last updated: ${new Date().toLocaleString()}`;
        return;
    }
    
    showLoading(true);
    hideError();
    
    try {
        const rate = await getExchangeRate(fromCurrency, toCurrency);
        const convertedValue = amount * rate;
        
        convertedAmount.textContent = formatAmount(convertedValue);
        exchangeRate.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
        lastUpdated.textContent = `Last updated: ${new Date().toLocaleString()}`;
        
    } catch (error) {
        console.error('Conversion error:', error);
        showError();
        convertedAmount.textContent = 'Error';
        exchangeRate.textContent = 'Unable to fetch rate';
    }
    
    showLoading(false);
}

async function getExchangeRate(fromCurrency, toCurrency) {
    try {
        const response = await fetch(
            `https://api.frankfurter.app/latest?amount=1&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await response.json();

        if (data.rates[toCurrency]) {
            return data.rates[toCurrency];
        } else {
            throw new Error("Invalid response from API");
        }
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return null;
    }
}


// Mock exchange rates for demo purposes
function getMockExchangeRate(fromCurrency, toCurrency) {
    const mockRates = {
        'USD': { 'EUR': 0.85, 'GBP': 0.73, 'JPY': 110, 'CAD': 1.25, 'AUD': 1.35, 'INR': 74.50 },
        'EUR': { 'USD': 1.18, 'GBP': 0.86, 'JPY': 129, 'CAD': 1.47, 'AUD': 1.59, 'INR': 87.65 },
        'GBP': { 'USD': 1.37, 'EUR': 1.16, 'JPY': 151, 'CAD': 1.71, 'AUD': 1.85, 'INR': 102.05 },
        'JPY': { 'USD': 0.009, 'EUR': 0.0078, 'GBP': 0.0066, 'CAD': 0.011, 'AUD': 0.012, 'INR': 0.68 },
        'CAD': { 'USD': 0.80, 'EUR': 0.68, 'GBP': 0.58, 'JPY': 88, 'AUD': 1.08, 'INR': 59.60 },
        'AUD': { 'USD': 0.74, 'EUR': 0.63, 'GBP': 0.54, 'JPY': 81, 'CAD': 0.93, 'INR': 55.15 },
        'INR': { 'USD': 0.013, 'EUR': 0.011, 'GBP': 0.0098, 'JPY': 1.48, 'CAD': 0.017, 'AUD': 0.018 }
    };
    
    if (mockRates[fromCurrency] && mockRates[fromCurrency][toCurrency]) {
        return mockRates[fromCurrency][toCurrency];
    }
    
    // If no mock rate available, return a random rate for demo
    return Math.random() * 2 + 0.5;
}

// Format amount with proper decimal places
function formatAmount(amount) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    }).format(amount);
}

// Show/hide loading indicator
function showLoading(show) {
    if (show) {
        loading.classList.add('show');
        convertBtn.disabled = true;
    } else {
        loading.classList.remove('show');
        convertBtn.disabled = false;
    }
}

// Show error message
function showError() {
    errorMessage.classList.add('show');
    setTimeout(() => {
        hideError();
    }, 5000);
}

// Hide error message
function hideError() {
    errorMessage.classList.remove('show');
}

// Handle online/offline status
window.addEventListener('online', () => {
    hideError();
    convertCurrency();
});

window.addEventListener('offline', () => {
    console.warn('App is offline, using cached/mock data');
});