// --- Data & Logic ---

// Chart 1: The Trilemma (Radar)
const initTrilemmaChart = () => {
    const ctx = document.getElementById('trilemmaChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Inference Speed', 'T2I Fidelity', 'Prompt Adherence', 'Training Stability', 'Latent Control'],
            datasets: [
                {
                    label: 'Modern GAN (R3GAN)',
                    data: [10, 7, 4, 8, 9],
                    borderColor: '#f59e0b', // Amber
                    backgroundColor: 'rgba(245, 158, 11, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#f59e0b'
                },
                {
                    label: 'Unified Flux (FLUX.1)',
                    data: [5, 10, 10, 9, 9],
                    borderColor: '#6366f1', // Indigo
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#6366f1'
                },
                {
                    label: 'Latent Diffusion (SD 3.5)',
                    data: [6, 8, 8, 10, 7],
                    borderColor: '#94a3b8', // Slate
                    backgroundColor: 'rgba(148, 163, 184, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#94a3b8'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: '#e2e8f0' },
                    grid: { color: '#e2e8f0' },
                    pointLabels: {
                        font: { size: 11, family: 'Inter' },
                        color: '#64748b'
                    },
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            },
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, font: { family: 'Inter' } } },
                tooltip: { backgroundColor: '#1e293b' }
            }
        }
    });
};

// Chart 2: Capability Coverage (Bar - Horizontal)
const initCapabilityChart = () => {
    const ctx = document.getElementById('capabilityChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Multi-Image Control', 'Text Adherence', 'Text Rendering', 'Editability'],
            datasets: [
                {
                    label: 'Bifurcated (Combines Best of Both)',
                    data: [9, 9, 8, 7],
                    backgroundColor: '#f59e0b', // Amber
                    barPercentage: 0.6
                },
                {
                    label: 'Unified (FLUX.1 Kontext)',
                    data: [9.5, 10, 10, 9],
                    backgroundColor: '#10b981', // Emerald
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true, max: 10, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8' } },
                y: { grid: { display: false }, ticks: { color: '#e2e8f0', font: { family: 'Inter' } } }
            },
            plugins: {
                legend: { position: 'bottom', labels: { color: '#cbd5e1' } }
            }
        }
    });
};

// Interaction Logic: Strategy Selector
const strategies = {
    unified: {
        title: "Implementation Strategy: The Unified Stack",
        color: "emerald",
        content: `
            <div class="space-y-4">
                <p class="text-slate-700"><strong>Core Model:</strong> FLUX.1 Kontext Pro (or Qwen-Image-Edit).</p>
                <ul class="list-disc pl-5 space-y-2 text-sm text-slate-600">
                    <li><strong>Workflow:</strong> Single-model inference. Pass text prompt AND reference images into the multi-modal context window.</li>
                    <li><strong>Benefit:</strong> Eliminates "Semantic Bridge" errors. Reduces MLOps complexity (one model to host). SOTA text rendering included.</li>
                    <li><strong>Trade-off:</strong> Higher VRAM requirements per instance compared to a standalone GAN, but lower than hosting two separate large models.</li>
                </ul>
            </div>
        `
    },
    bifurcated: {
        title: "Implementation Strategy: The Hybrid Bridge",
        color: "amber",
        content: `
            <div class="space-y-4">
                <p class="text-slate-700"><strong>Core Stack:</strong> R3GAN (for composition) + CLIP (Bridge) + FLUX.1 (Detailing).</p>
                <ul class="list-disc pl-5 space-y-2 text-sm text-slate-600">
                    <li><strong>Workflow:</strong> Generate coarse composition in GAN -> Encode via CLIP -> Guide Diffusion generation.</li>
                    <li><strong>Benefit:</strong> R3GAN allows real-time (30fps+) preview of compositions before committing to the slower diffusion step.</li>
                    <li><strong>Trade-off:</strong> Engineering the "Bridge" is non-trivial. Risk of semantic loss during CLIP encoding.</li>
                </ul>
            </div>
        `
    }
};

function updateStrategy(type) {
    const container = document.getElementById('strategyContent');
    const data = strategies[type];
    
    container.classList.remove('hidden');
    container.className = `mt-8 bg-${data.color}-50 border border-${data.color}-200 rounded-xl p-8 animate-fade-in block`;
    
    container.innerHTML = `
        <h4 class="text-xl font-bold text-${data.color}-800 font-heading mb-4">${data.title}</h4>
        ${data.content}
    `;
    
    // Scroll to view
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize Charts on Load
document.addEventListener('DOMContentLoaded', () => {
    initTrilemmaChart();
    initCapabilityChart();
});