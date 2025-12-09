// --- Chart Config ---
const ctx = document.getElementById('benchmarkChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['TimeGPT (Zero-Shot)', 'Chronos-Bolt (Zero-Shot)', 'AutoARIMA (Tuned)', 'LightGBM (Tuned)'],
        datasets: [{
            label: 'Normalized Error (Lower is Better)',
            data: [0.85, 0.78, 0.72, 0.65],
            backgroundColor: [
                'rgba(45, 212, 191, 0.6)', // Teal (Foundation)
                'rgba(45, 212, 191, 0.8)', // Teal
                'rgba(245, 158, 11, 0.6)', // Amber (Stats)
                'rgba(245, 158, 11, 0.8)'  // Amber
            ],
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            borderRadius: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#e2e8f0',
                bodyColor: '#e2e8f0',
                borderColor: '#475569',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        return context.raw + ' (CRPS/MASE Avg)';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(148, 163, 184, 0.1)' },
                ticks: { color: '#94a3b8' },
                title: { display: true, text: 'Error Rate', color: '#64748b' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8', font: { family: 'Outfit' } }
            }
        }
    }
});