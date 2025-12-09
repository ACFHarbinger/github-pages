const ctx = document.getElementById('scalingChart').getContext('2d');
        
// Data derived from Table 2 in report
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['100 Nodes', '1,000 Nodes', '10,000 Nodes (XL)'],
        datasets: [
            {
                label: 'HGS (PyVRP)',
                data: [0.20, 0.50, 2.5],
                borderColor: '#10b981', // Emerald
                backgroundColor: '#10b981',
                borderWidth: 3,
                tension: 0.3
            },
            {
                label: 'Hexaly (Commercial)',
                data: [0.80, 1.6, 2.6],
                borderColor: '#38bdf8', // Sky
                backgroundColor: '#38bdf8',
                borderWidth: 3,
                tension: 0.3
            },
            {
                label: 'Google OR-Tools',
                data: [1.91, 4.18, 6.5],
                borderColor: '#a855f7', // Purple
                backgroundColor: '#a855f7',
                borderWidth: 3,
                tension: 0.3
            },
            {
                label: 'NCO (Neural)',
                data: [1.0, 5.5, 12], // Approximate failure at scale
                borderColor: '#f43f5e', // Rose
                backgroundColor: '#f43f5e',
                borderWidth: 3,
                borderDash: [5, 5],
                tension: 0.3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#94a3b8', font: { family: 'Inter' } }
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#e2e8f0',
                bodyColor: '#e2e8f0',
                borderColor: '#475569',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + context.raw + '% Gap';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(148, 163, 184, 0.1)' },
                ticks: { color: '#94a3b8' },
                title: { display: true, text: 'Optimality Gap (%)', color: '#64748b' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8', font: { family: 'Rajdhani', size: 14 } }
            }
        }
    }
});