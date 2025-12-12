// Common Chart Options
Chart.defaults.font.family = 'Inter';
Chart.defaults.color = '#94a3b8';

// --- CONVERGENCE CHART (Line) ---
const ctxConv = document.getElementById('convergenceChart').getContext('2d');
new Chart(ctxConv, {
    type: 'line',
    data: {
        labels: ['0s', '10s', '30s', '60s', '120s', '300s'], // Time in seconds
        datasets: [
            {
                label: 'HGS (Genetic)',
                data: [15, 5, 1.5, 0.5, 0.1, 0.0], // Starts high, converges deep
                borderColor: '#10b981', // Emerald
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            },
            {
                label: 'Neural (Constructive)',
                data: [3.5, 3.5, 3.5, 3.5, 3.5, 3.5], // Instant solution, but stagnates
                borderColor: '#3b82f6', // Blue
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.1,
                fill: false
            },
            {
                label: 'ALNS',
                data: [10, 6, 4, 3, 2, 1.2], // Good, but slower than HGS
                borderColor: '#a855f7', // Purple
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
            legend: { labels: { color: '#e5e5e5' } },
            tooltip: { mode: 'index', intersect: false }
        },
        scales: {
            y: {
                title: { display: true, text: 'Gap to Optimal (%)', color: '#6b7280' },
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
            },
            x: {
                grid: { display: false },
                title: { display: true, text: 'Compute Time (Log Scale approximation)', color: '#6b7280' }
            }
        }
    }
});

// --- RADAR CHART ---
const ctxRadar = document.getElementById('radarChart').getContext('2d');
new Chart(ctxRadar, {
    type: 'radar',
    data: {
        labels: ['Solution Quality', 'Inference Speed', 'Scalability (N>1000)', 'Flexibility (Constraints)', 'Ease of Impl.'],
        datasets: [
            {
                label: 'HGS',
                data: [95, 60, 90, 70, 40], // High quality, hard to code
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                pointBackgroundColor: '#10b981',
                borderWidth: 2
            },
            {
                label: 'Deep RL',
                data: [75, 99, 60, 30, 20], // Fast, rigid, very hard to train
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                pointBackgroundColor: '#3b82f6',
                borderWidth: 2
            },
            {
                label: 'ALNS',
                data: [85, 50, 70, 95, 80], // Flexible, easier to code
                borderColor: '#a855f7', // Purple
                backgroundColor: 'rgba(168, 85, 247, 0.0)', // Transparent fill
                borderDash: [5, 5],
                pointBackgroundColor: '#a855f7',
                borderWidth: 2
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#cbd5e1' } } },
        scales: {
            r: {
                angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                pointLabels: { color: '#e5e5e5', font: { size: 11, family: 'Inter' } },
                ticks: { display: false, max: 100 }
            }
        }
    }
});