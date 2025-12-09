const ctx = document.getElementById('efficiencyChart').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Static Routing', 'Neuro-Evolutionary'],
        datasets: [{
                label: 'Air-Hauling (Wasted Trips)',
                data: [40, 5],
                backgroundColor: 'rgba(239, 68, 68, 0.7)', // Red
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 1
            },
            {
                label: 'Overflow Incidents',
                data: [15, 2],
                backgroundColor: 'rgba(245, 158, 11, 0.7)', // Amber
                borderColor: 'rgba(245, 158, 11, 1)',
                borderWidth: 1
            },
            {
                label: 'Operational Cost',
                data: [100, 65],
                backgroundColor: 'rgba(16, 185, 129, 0.7)', // Emerald
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#94a3b8',
                    font: {
                        family: 'Roboto'
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)'
                },
                ticks: {
                    color: '#94a3b8'
                },
                title: {
                    display: true,
                    text: 'Relative Metric (%)',
                    color: '#64748b'
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        family: 'Orbitron'
                    }
                }
            }
        }
    }
});