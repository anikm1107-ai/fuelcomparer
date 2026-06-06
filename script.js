// script.js - Country Compare OR State Compare mode, side by side horizontally

import { fuelDatabase, getAllCountries, getIndianStates } from './data.js';
import * as THREE from 'three';

// State
let currentMode = 'country'; // 'country' or 'state'
let currentCurrency = 'INR';
let countryA = 'India';
let countryB = 'USA';
let stateA = 'Maharashtra';
let stateB = 'Delhi';
let distanceKm = 100;
let comparisonChart;

// DOM Elements
const modeCountryBtn = document.getElementById('modeCountryBtn');
const modeStateBtn = document.getElementById('modeStateBtn');
const countryModePanel = document.getElementById('countryModePanel');
const stateModePanel = document.getElementById('stateModePanel');
const countryASelect = document.getElementById('countryA');
const countryBSelect = document.getElementById('countryB');
const stateASelect = document.getElementById('stateA');
const stateBSelect = document.getElementById('stateB');
const fuelTypeSelect = document.getElementById('fuelTypeSelect');
const distanceInput = document.getElementById('distanceKm');
const currencyINRBtn = document.getElementById('currencyINR');
const currencyUSDBtn = document.getElementById('currencyUSD');
const comparisonTableBody = document.getElementById('comparisonTableBody');
const location1Details = document.getElementById('location1Details');
const location2Details = document.getElementById('location2Details');

// Efficiency (km per unit)
const EFFICIENCY = { ev: 6, petrol: 16, diesel: 18 };

// Initialize dropdowns
function initDropdowns() {
    const countries = getAllCountries();
    countryASelect.innerHTML = countries.map(c => `<option value="${c}" ${c === 'India' ? 'selected' : ''}>${c}</option>`).join('');
    countryBSelect.innerHTML = countries.map(c => `<option value="${c}" ${c === 'USA' ? 'selected' : ''}>${c}</option>`).join('');
    
    const states = getIndianStates();
    stateASelect.innerHTML = states.map(s => `<option value="${s}" ${s === 'Maharashtra' ? 'selected' : ''}>${s}</option>`).join('');
    stateBSelect.innerHTML = states.map(s => `<option value="${s}" ${s === 'Delhi' ? 'selected' : ''}>${s}</option>`).join('');
    
    countryASelect.addEventListener('change', (e) => { countryA = e.target.value; refreshAll(); });
    countryBSelect.addEventListener('change', (e) => { countryB = e.target.value; refreshAll(); });
    stateASelect.addEventListener('change', (e) => { stateA = e.target.value; refreshAll(); });
    stateBSelect.addEventListener('change', (e) => { stateB = e.target.value; refreshAll(); });
}

// Mode switching
function initModeSwitching() {
    modeCountryBtn.addEventListener('click', () => {
        currentMode = 'country';
        modeCountryBtn.classList.add('active');
        modeStateBtn.classList.remove('active');
        countryModePanel.classList.remove('hidden');
        stateModePanel.classList.add('hidden');
        refreshAll();
    });
    
    modeStateBtn.addEventListener('click', () => {
        currentMode = 'state';
        modeStateBtn.classList.add('active');
        modeCountryBtn.classList.remove('active');
        stateModePanel.classList.remove('hidden');
        countryModePanel.classList.add('hidden');
        refreshAll();
    });
}

// Get price for location based on current mode
function getLocation1Price() {
    if (currentMode === 'country') {
        return getPriceForCountry(countryA);
    } else {
        return getPriceForIndianState(stateA);
    }
}

function getLocation2Price() {
    if (currentMode === 'country') {
        return getPriceForCountry(countryB);
    } else {
        return getPriceForIndianState(stateB);
    }
}

function getPriceForCountry(country) {
    const countryData = fuelDatabase.countries[country];
    if (!countryData) return { ev: 0, petrol: 0, diesel: 0 };
    
    let evUSD = countryData.ev_usd;
    let petrolUSD = countryData.petrol_usd;
    let dieselUSD = countryData.diesel_usd;
    
    if (currentCurrency === 'INR') {
        const indiaRate = fuelDatabase.countries['India'].exchangeRateToUSD;
        return { 
            ev: evUSD * indiaRate, 
            petrol: petrolUSD * indiaRate, 
            diesel: dieselUSD * indiaRate 
        };
    } else {
        return { 
            ev: evUSD, 
            petrol: petrolUSD, 
            diesel: dieselUSD 
        };
    }
}

function getPriceForIndianState(state) {
    const stateData = fuelDatabase.indiaStates[state];
    if (!stateData) return { ev: 0, petrol: 0, diesel: 0 };
    
    let evINR = stateData.ev_kwh_inr;
    let petrolINR = stateData.petrol_inr;
    let dieselINR = stateData.diesel_inr;
    
    if (currentCurrency === 'USD') {
        const indiaRate = fuelDatabase.countries['India'].exchangeRateToUSD;
        return { 
            ev: evINR / indiaRate, 
            petrol: petrolINR / indiaRate, 
            diesel: dieselINR / indiaRate 
        };
    } else {
        return { 
            ev: evINR, 
            petrol: petrolINR, 
            diesel: dieselINR 
        };
    }
}

function getLocation1Name() {
    if (currentMode === 'country') return countryA;
    return `${stateA} (India)`;
}

function getLocation2Name() {
    if (currentMode === 'country') return countryB;
    return `${stateB} (India)`;
}

function getTripCost(pricePerUnit, efficiency, distance) {
    const unitsNeeded = distance / efficiency;
    return pricePerUnit * unitsNeeded;
}

function formatPrice(value) {
    if (isNaN(value) || value === undefined || value === null) return 'N/A';
    const symbol = currentCurrency === 'INR' ? '₹' : '$';
    return `${symbol} ${value.toFixed(2)}`;
}

function refreshAll() {
    const distance = parseFloat(distanceInput.value) || 100;
    const fuelFilter = fuelTypeSelect.value;
    const symbol = currentCurrency === 'INR' ? '₹' : '$';
    
    const compareText = document.querySelector('#compareText');
    if (compareText) {
        compareText.innerHTML = `Comparing: <span class="font-bold text-emerald-400">${getLocation1Name()}</span> vs <span class="font-bold text-emerald-400">${getLocation2Name()}</span>`;
    }
    
    const loc1PriceHeader = document.getElementById('location1PriceHeader');
    const loc1TripHeader = document.getElementById('location1TripHeader');
    const loc2PriceHeader = document.getElementById('location2PriceHeader');
    const loc2TripHeader = document.getElementById('location2TripHeader');

    if (loc1PriceHeader) loc1PriceHeader.innerHTML = `${getLocation1Name()}<br><small>Price/Unit</small>`;
    if (loc1TripHeader) loc1TripHeader.innerHTML = `${getLocation1Name()}<br><small>Trip Cost</small>`;
    if (loc2PriceHeader) loc2PriceHeader.innerHTML = `${getLocation2Name()}<br><small>Price/Unit</small>`;
    if (loc2TripHeader) loc2TripHeader.innerHTML = `${getLocation2Name()}<br><small>Trip Cost</small>`;
    
    const header1 = document.getElementById('location1Header');
    const header2 = document.getElementById('location2Header');
    if (header1) header1.innerHTML = `📍 ${getLocation1Name()} Details`;
    if (header2) header2.innerHTML = `📍 ${getLocation2Name()} Details`;
    
    let prices1, prices2;
    
    if (currentMode === 'country') {
        prices1 = getPriceForCountry(countryA);
        prices2 = getPriceForCountry(countryB);
    } else {
        prices1 = getPriceForIndianState(stateA);
        prices2 = getPriceForIndianState(stateB);
    }
    
    const safePrices1 = {
        ev: Number(prices1?.ev) || 0,
        petrol: Number(prices1?.petrol) || 0,
        diesel: Number(prices1?.diesel) || 0
    };
    const safePrices2 = {
        ev: Number(prices2?.ev) || 0,
        petrol: Number(prices2?.petrol) || 0,
        diesel: Number(prices2?.diesel) || 0
    };
    
    const fuelTypes = [];
    const data1 = [];
    const data2 = [];
    
    if (fuelFilter === 'all' || fuelFilter === 'ev') {
        fuelTypes.push('EV (per kWh)');
        data1.push(safePrices1.ev);
        data2.push(safePrices2.ev);
    }
    if (fuelFilter === 'all' || fuelFilter === 'petrol') {
        fuelTypes.push('Petrol (per L)');
        data1.push(safePrices1.petrol);
        data2.push(safePrices2.petrol);
    }
    if (fuelFilter === 'all' || fuelFilter === 'diesel') {
        fuelTypes.push('Diesel (per L)');
        data1.push(safePrices1.diesel);
        data2.push(safePrices2.diesel);
    }
    
    if (comparisonChart) comparisonChart.destroy();
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: fuelTypes,
            datasets: [
                { label: getLocation1Name(), data: data1, backgroundColor: '#3b82f6', borderRadius: 8 },
                { label: getLocation2Name(), data: data2, backgroundColor: '#10b981', borderRadius: 8 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return symbol + ' ' + value.toFixed(2);
                        },
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: 'white'
                    }
                }
            },
            plugins: {
                tooltip: { 
                    callbacks: { 
                        label: (ctx) => `${ctx.dataset.label}: ${symbol} ${ctx.raw.toFixed(2)}` 
                    } 
                },
                legend: { 
                    position: 'top', 
                    labels: { color: 'white' } 
                }
            }
        }
    });
    
    const tripCost1 = {
        ev: (distance / EFFICIENCY.ev) * safePrices1.ev,
        petrol: (distance / EFFICIENCY.petrol) * safePrices1.petrol,
        diesel: (distance / EFFICIENCY.diesel) * safePrices1.diesel
    };
    const tripCost2 = {
        ev: (distance / EFFICIENCY.ev) * safePrices2.ev,
        petrol: (distance / EFFICIENCY.petrol) * safePrices2.petrol,
        diesel: (distance / EFFICIENCY.diesel) * safePrices2.diesel
    };
    
    const evDiffRaw = tripCost1.ev - tripCost2.ev;
    const petrolDiffRaw = tripCost1.petrol - tripCost2.petrol;
    const dieselDiffRaw = tripCost1.diesel - tripCost2.diesel;
    
    function showSavings(diffRaw) {
        const diff = diffRaw;
        const absDiff = Math.abs(diff);
        
        if (absDiff < 0.01) {
            return `<span class="savings-gray">${symbol} 0.00</span>`;
        }
        
        if (diff < 0) {
            return `<span class="savings-green">▼ ${symbol} ${absDiff.toFixed(2)}</span>`;
        } else {
            return `<span class="savings-red">▲ ${symbol} ${absDiff.toFixed(2)}</span>`;
        }
    }
    
    comparisonTableBody.innerHTML = `
        <tr style="border-bottom: 1px solid rgba(0,184,148,0.2);">
            <td style="padding: 12px; font-weight: bold; color: white;">⚡ Electric (EV)</td>
            <td style="padding: 12px; color: white;">${symbol} ${safePrices1.ev.toFixed(2)}<span style="font-size: 11px; color: #9ca3af;">/kWh</span></td>
            <td style="padding: 12px; color: white;">${symbol} ${tripCost1.ev.toFixed(2)}</td>
            <td style="padding: 12px; color: white;">${symbol} ${safePrices2.ev.toFixed(2)}<span style="font-size: 11px; color: #9ca3af;">/kWh</span></td>
            <td style="padding: 12px; color: white;">${symbol} ${tripCost2.ev.toFixed(2)}</td>
            <td style="padding: 12px;">${showSavings(evDiffRaw)}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(0,184,148,0.2);">
            <td style="padding: 12px; font-weight: bold; color: white;">⛽ Petrol</td>
            <td style="padding: 12px; color: white;">${symbol} ${safePrices1.petrol.toFixed(2)}<span style="font-size: 11px; color: #9ca3af;">/L</span></td>
            <td style="padding: 12px; color: white;">${symbol} ${tripCost1.petrol.toFixed(2)}</td>
            <td style="padding: 12px; color: white;">${symbol} ${safePrices2.petrol.toFixed(2)}<span style="font-size: 11px; color: #9ca3af;">/L</span></td>
            <td style="padding: 12px; color: white;">${symbol} ${tripCost2.petrol.toFixed(2)}</td>
            <td style="padding: 12px;">${showSavings(petrolDiffRaw)}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(0,184,148,0.2);">
            <td style="padding: 12px; font-weight: bold; color: white;">🛢️ Diesel</td>
            <td style="padding: 12px; color: white;">${symbol} ${safePrices1.diesel.toFixed(2)}<span style="font-size: 11px; color: #9ca3af;">/L</span></td>
            <td style="padding: 12px; color: white;">${symbol} ${tripCost1.diesel.toFixed(2)}</td>
            <td style="padding: 12px; color: white;">${symbol} ${safePrices2.diesel.toFixed(2)}<span style="font-size: 11px; color: #9ca3af;">/L</span></td>
            <td style="padding: 12px; color: white;">${symbol} ${tripCost2.diesel.toFixed(2)}</td>
            <td style="padding: 12px;">${showSavings(dieselDiffRaw)}</td>
        </tr>
    `;
    
    location1Details.innerHTML = `
        <p><strong>📍 Location:</strong> ${getLocation1Name()}</p>
        <p><strong>⚡ EV:</strong> ${symbol} ${safePrices1.ev.toFixed(2)}/kWh → ${symbol} ${tripCost1.ev.toFixed(2)} / 100km</p>
        <p><strong>⛽ Petrol:</strong> ${symbol} ${safePrices1.petrol.toFixed(2)}/L → ${symbol} ${tripCost1.petrol.toFixed(2)} / 100km</p>
        <p><strong>🛢️ Diesel:</strong> ${symbol} ${safePrices1.diesel.toFixed(2)}/L → ${symbol} ${tripCost1.diesel.toFixed(2)} / 100km</p>
    `;
    
    location2Details.innerHTML = `
        <p><strong>📍 Location:</strong> ${getLocation2Name()}</p>
        <p><strong>⚡ EV:</strong> ${symbol} ${safePrices2.ev.toFixed(2)}/kWh → ${symbol} ${tripCost2.ev.toFixed(2)} / 100km</p>
        <p><strong>⛽ Petrol:</strong> ${symbol} ${safePrices2.petrol.toFixed(2)}/L → ${symbol} ${tripCost2.petrol.toFixed(2)} / 100km</p>
        <p><strong>🛢️ Diesel:</strong> ${symbol} ${safePrices2.diesel.toFixed(2)}/L → ${symbol} ${tripCost2.diesel.toFixed(2)} / 100km</p>
    `;
}

function bindEvents() {
    fuelTypeSelect.addEventListener('change', refreshAll);
    distanceInput.addEventListener('input', () => { distanceKm = parseFloat(distanceInput.value) || 100; refreshAll(); });
    currencyINRBtn.addEventListener('click', () => {
        currentCurrency = 'INR';
        currencyINRBtn.classList.add('active');
        currencyUSDBtn.classList.remove('active');
        refreshAll();
    });
    currencyUSDBtn.addEventListener('click', () => {
        currentCurrency = 'USD';
        currencyUSDBtn.classList.add('active');
        currencyINRBtn.classList.remove('active');
        refreshAll();
    });
}

// Three.js Background Animation
function initThreeBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, powerPreference: "low-power" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Main geometric core
    const geometry = new THREE.IcosahedronGeometry(0.8, 0);
    const material = new THREE.MeshStandardMaterial({ color: 0x00b894, roughness: 0.3, metalness: 0.7, emissive: 0x009432, emissiveIntensity: 0.3 });
    const coreMesh = new THREE.Mesh(geometry, material);
    
    // Wireframe overlay
    const wireframeMat = new THREE.MeshBasicMaterial({ color: 0x55efc4, wireframe: true, transparent: true, opacity: 0.3 });
    const wireMesh = new THREE.Mesh(geometry, wireframeMat);
    wireMesh.scale.set(1.1, 1.1, 1.1);
    coreMesh.add(wireMesh);
    
    const group = new THREE.Group();
    group.add(coreMesh);
    scene.add(group);
    
    // Floating particles
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i*3] = (Math.random() - 0.5) * 35;
        positions[i*3+1] = (Math.random() - 0.5) * 25;
        positions[i*3+2] = (Math.random() - 0.5) * 25 - 10;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x55efc4, size: 0.05, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(particlesGeo, particleMat);
    scene.add(particles);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x1a1a2e);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(2, 5, 3);
    const backLight = new THREE.PointLight(0x00b894, 0.5);
    backLight.position.set(-2, 1, -5);
    scene.add(ambientLight);
    scene.add(dirLight);
    scene.add(backLight);
    
    camera.position.z = 5;
    camera.position.y = 1;
    
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.008;
        group.rotation.y = time * 0.4;
        group.rotation.x = Math.sin(time * 0.3) * 0.15;
        particles.rotation.y = time * 0.03;
        particles.rotation.x = time * 0.02;
        renderer.render(scene, camera);
    }
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function init() {
    initDropdowns();
    initModeSwitching();
    bindEvents();
    refreshAll();
    initThreeBackground();
}

init();