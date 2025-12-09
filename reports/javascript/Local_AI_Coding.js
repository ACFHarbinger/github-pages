// --- Chart Config ---
const ctx = document.getElementById('benchmarkChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Qwen2.5-Coder 32B', 'DeepSeek-V2 (MoE)', 'Llama 3.1 405B', 'Llama 3.1 70B'],
        datasets: [{
            label: 'Aider Polyglot Benchmark (% Pass)',
            data: [73.7, 73.0, 66.0, 59.0],
            backgroundColor: [
                'rgba(56, 189, 248, 0.8)',
                'rgba(99, 102, 241, 0.8)',
                'rgba(148, 163, 184, 0.5)',
                'rgba(148, 163, 184, 0.3)'
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
                borderWidth: 1
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(148, 163, 184, 0.1)' },
                ticks: { color: '#94a3b8' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8', font: { family: 'Inter' } }
            }
        }
    }
});

// --- VRAM Calculator Logic ---
function calculateVRAM() {
    const size = parseFloat(document.getElementById('modelSize').value);
    const quant = parseFloat(document.getElementById('quantLevel').value);
    
    // Heuristic multipliers:
    const MULTIPLIERS = {
        7: { 0.55: 5.5, 0.65: 6.5, 0.95: 8.5 },
        14: { 0.55: 9.5, 0.65: 11.5, 0.95: 16.5 },
        22: { 0.55: 15, 0.65: 18, 0.95: 26 },
        32: { 0.55: 20, 0.65: 24, 0.95: 35 },
        70: { 0.55: 40, 0.65: 46.5, 0.95: 73.5 }
    };

    let total = "N/A";
    
    // Check for explicit value from the report's synthesized data
    if (MULTIPLIERS[size] && MULTIPLIERS[size][quant]) {
            total = MULTIPLIERS[size][quant].toFixed(1);
    } else {
            // Fallback calculation (if new sizes/quants were added)
            let baseVram = size * quant; 
            let contextOverhead = 2.5;
            total = (baseVram + contextOverhead).toFixed(1);
    }

    // Determine Hardware Rec
    let rec = "";
    let desc = "";
    
    let numTotal = parseFloat(total);

    if (numTotal <= 6) {
        rec = "Mid-Range Laptop / GPU";
        desc = "8GB VRAM (RTX 3060/4060) or M1/M2/M3 Base.";
    } else if (numTotal <= 12) {
        rec = "High-End Consumer GPU";
        desc = "12GB VRAM (RTX 3080/4070) required.";
    } else if (numTotal <= 24) {
        rec = "NVIDIA Sweet Spot";
        desc = "24GB VRAM (RTX 3090/4090). Target for Qwen 32B.";
    } else if (numTotal <= 48) {
        rec = "Dual GPU or Mac Studio";
        desc = "Requires 2x 3090s or Apple Silicon with 64GB+ RAM.";
    } else {
        rec = "Server / High-End Mac";
        desc = "Requires 2x 4090 / A6000 or Mac with 96GB+ Unified Memory.";
    }

    // Update UI
    document.getElementById('vramResult').innerText = `${total} GB`;
    document.getElementById('hardwareRec').innerText = rec;
    document.getElementById('hardwareDesc').innerText = desc;
}

// Init Calculator
calculateVRAM();