// data.js - Complete fuel price database for 24 countries + India states

export const fuelDatabase = {
    countries: {
        "Australia": { currency: "AUD", exchangeRateToUSD: 0.66, ev_usd: 0.18, petrol_usd: 1.32, diesel_usd: 1.28 },
        "Brazil": { currency: "BRL", exchangeRateToUSD: 0.19, ev_usd: 0.21, petrol_usd: 1.18, diesel_usd: 1.08 },
        "Canada": { currency: "CAD", exchangeRateToUSD: 0.73, ev_usd: 0.12, petrol_usd: 1.35, diesel_usd: 1.28 },
        "China": { currency: "CNY", exchangeRateToUSD: 0.14, ev_usd: 0.08, petrol_usd: 1.10, diesel_usd: 1.05 },
        "France": { currency: "EUR", exchangeRateToUSD: 1.09, ev_usd: 0.31, petrol_usd: 1.92, diesel_usd: 1.78 },
        "Germany": { currency: "EUR", exchangeRateToUSD: 1.09, ev_usd: 0.35, petrol_usd: 1.95, diesel_usd: 1.82 },
        "India": { currency: "INR", exchangeRateToUSD: 83.5, ev_usd: 0.08, petrol_usd: 1.25, diesel_usd: 1.12 },
        "Indonesia": { currency: "IDR", exchangeRateToUSD: 0.000065, ev_usd: 0.10, petrol_usd: 0.98, diesel_usd: 0.92 },
        "Italy": { currency: "EUR", exchangeRateToUSD: 1.09, ev_usd: 0.32, petrol_usd: 1.90, diesel_usd: 1.75 },
        "Japan": { currency: "JPY", exchangeRateToUSD: 0.0064, ev_usd: 0.21, petrol_usd: 1.38, diesel_usd: 1.30 },
        "Mexico": { currency: "MXN", exchangeRateToUSD: 0.054, ev_usd: 0.13, petrol_usd: 1.20, diesel_usd: 1.18 },
        "Netherlands": { currency: "EUR", exchangeRateToUSD: 1.09, ev_usd: 0.34, petrol_usd: 2.20, diesel_usd: 2.00 },
        "Norway": { currency: "NOK", exchangeRateToUSD: 0.094, ev_usd: 0.16, petrol_usd: 2.10, diesel_usd: 2.00 },
        "Pakistan": { currency: "PKR", exchangeRateToUSD: 0.0036, ev_usd: 0.10, petrol_usd: 1.18, diesel_usd: 1.15 },
        "Russia": { currency: "RUB", exchangeRateToUSD: 0.011, ev_usd: 0.07, petrol_usd: 0.68, diesel_usd: 0.66 },
        "Saudi Arabia": { currency: "SAR", exchangeRateToUSD: 0.27, ev_usd: 0.08, petrol_usd: 0.62, diesel_usd: 0.60 },
        "Singapore": { currency: "SGD", exchangeRateToUSD: 0.74, ev_usd: 0.24, petrol_usd: 2.05, diesel_usd: 1.92 },
        "South Africa": { currency: "ZAR", exchangeRateToUSD: 0.053, ev_usd: 0.11, petrol_usd: 1.22, diesel_usd: 1.15 },
        "South Korea": { currency: "KRW", exchangeRateToUSD: 0.00073, ev_usd: 0.17, petrol_usd: 1.45, diesel_usd: 1.38 },
        "Spain": { currency: "EUR", exchangeRateToUSD: 1.09, ev_usd: 0.28, petrol_usd: 1.70, diesel_usd: 1.60 },
        "Turkey": { currency: "TRY", exchangeRateToUSD: 0.031, ev_usd: 0.22, petrol_usd: 1.40, diesel_usd: 1.35 },
        "UAE": { currency: "AED", exchangeRateToUSD: 0.27, ev_usd: 0.10, petrol_usd: 0.81, diesel_usd: 0.85 },
        "United Kingdom": { currency: "GBP", exchangeRateToUSD: 1.27, ev_usd: 0.30, petrol_usd: 1.68, diesel_usd: 1.72 },
        "USA": { currency: "USD", exchangeRateToUSD: 1, ev_usd: 0.14, petrol_usd: 0.98, diesel_usd: 1.05 }
    },
    
    indiaStates: {
        "Maharashtra": { petrol_inr: 106.5, diesel_inr: 92.3, ev_kwh_inr: 7.5 },
        "Delhi": { petrol_inr: 96.7, diesel_inr: 89.6, ev_kwh_inr: 6.8 },
        "Karnataka": { petrol_inr: 102.9, diesel_inr: 88.9, ev_kwh_inr: 7.2 },
        "Tamil Nadu": { petrol_inr: 102.5, diesel_inr: 92.4, ev_kwh_inr: 6.5 },
        "Gujarat": { petrol_inr: 96.2, diesel_inr: 90.8, ev_kwh_inr: 6.9 },
        "Uttar Pradesh": { petrol_inr: 97.4, diesel_inr: 89.7, ev_kwh_inr: 7.0 },
        "West Bengal": { petrol_inr: 106.0, diesel_inr: 92.5, ev_kwh_inr: 7.4 },
        "Rajasthan": { petrol_inr: 108.3, diesel_inr: 94.1, ev_kwh_inr: 7.6 },
        "Punjab": { petrol_inr: 100.2, diesel_inr: 88.5, ev_kwh_inr: 7.1 },
        "Haryana": { petrol_inr: 98.5, diesel_inr: 90.2, ev_kwh_inr: 7.0 },
        "Telangana": { petrol_inr: 109.6, diesel_inr: 95.4, ev_kwh_inr: 7.8 },
        "Kerala": { petrol_inr: 107.2, diesel_inr: 94.7, ev_kwh_inr: 7.3 },
        "Bihar": { petrol_inr: 107.0, diesel_inr: 93.2, ev_kwh_inr: 7.2 },
        "Madhya Pradesh": { petrol_inr: 108.1, diesel_inr: 93.6, ev_kwh_inr: 7.4 },
        "Odisha": { petrol_inr: 103.4, diesel_inr: 94.0, ev_kwh_inr: 7.2 }
    }
};

export const getAllCountries = () => Object.keys(fuelDatabase.countries);
export const getIndianStates = () => Object.keys(fuelDatabase.indiaStates);