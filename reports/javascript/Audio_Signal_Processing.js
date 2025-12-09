// --- Control Chart Logic (Line) ---
const ctxControl = document.getElementById('controlChart').getContext('2d');
new Chart(ctxControl, {
    type: 'line',
    data: {
        labels: ['0ms', '100ms', '200ms', '300ms', '400ms', '500ms'],
        datasets: [
            {
                label: 'DRL-ANC (PPO)',
                data: [0, -15, -25, -28, -30, -30],
                borderColor: '#ec4899', // Pink
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            },
            {
                label: 'Traditional FxLMS',
                data: [0, -5, -8, -5, -12, -10], // Unstable behavior
                borderColor: '#9ca3af', // Gray
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.1,
                fill: false
            },
            {
                label: 'Deep ANC (Supervised)',
                data: [0, -10, -18, -20, -22, -22],
                borderColor: '#8b5cf6', // Purple
                borderWidth: 2,
                tension: 0.3,
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: '#e5e5e5', font: { family: 'Inter' } } },
            tooltip: { mode: 'index', intersect: false }
        },
        scales: {
            y: {
                title: { display: true, text: 'Noise Reduction (dB)', color: '#6b7280' },
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#9ca3af' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#9ca3af' }
            }
        }
    }
});

// --- Future Radar Chart ---
const ctxRadar = document.getElementById('radarChart').getContext('2d');
new Chart(ctxRadar, {
    type: 'radar',
    data: {
        labels: ['Real-Time RLHF', '6G Semantic Comms', 'Neural HRTF Fields', 'Deep PLC', 'Grey Box DSP'],
        datasets: [{
            label: 'Impact Magnitude',
            data: [80, 95, 85, 75, 90],
            backgroundColor: 'rgba(139, 92, 246, 0.2)', // Purple transparent
            borderColor: '#8b5cf6',
            pointBackgroundColor: '#ec4899',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ec4899'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            r: {
                angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                pointLabels: { color: '#e5e5e5', font: { size: 10, family: 'Inter' } },
                ticks: { display: false }
            }
        }
    }
});