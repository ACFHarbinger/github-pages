// --- Stack Visual Data ---
const stackDetails = {
    flux: {
        icon: "⚡",
        title: "FLUX.1 Kontext Pro",
        desc: "The 'Engine' of the pipeline. Selected for its ability to accept both text and reference images natively, enabling the 'Context-Aware' generation required for VLM training.",
        inputs: "Text + Image",
        role: "Synthesis"
    },
    control: {
        icon: "📐",
        title: "ControlNet Union Pro 2.0",
        desc: "The 'Structure' enforcer. Attaches to FLUX.1 to lock in depth, canny edges, and poses. Essential for generating variations where the concept changes but the shape remains.",
        inputs: "Depth/Edge Maps",
        role: "Invariance"
    },
    instruct: {
        icon: "📝",
        title: "InstructAny2Pix",
        desc: "The 'Semantic' editor. A model trained to follow editing instructions. Used to create compositional challenges (e.g., 'swap the cat for a dog').",
        inputs: "Edit Instructions",
        role: "Composition"
    }
};

// MODIFIED: Accepts event object explicitly for robustness
function showStackDetail(key, event) {
    // Update Active State
    document.querySelectorAll('.interactive-card').forEach(el => el.classList.remove('active', 'border-indigo-500', 'shadow-sm'));
    document.querySelectorAll('.interactive-card').forEach(el => el.classList.add('border-slate-200'));
    
    // Use the passed event object to get the target
    const currentTarget = event ? event.currentTarget : document.querySelector(`[onclick*="'${key}'"]`);
    if (currentTarget) {
        currentTarget.classList.add('active', 'border-indigo-500', 'shadow-sm');
        currentTarget.classList.remove('border-slate-200');
    }

    // Update Visual
    const data = stackDetails[key];
    const visual = document.getElementById('stackVisual');
    
    // Simple fade effect
    visual.style.opacity = 0;
    setTimeout(() => {
        visual.innerHTML = `
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">${data.icon}</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">${data.title}</h3>
            <p class="text-slate-600 mb-6">${data.desc}</p>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-slate-50 p-2 rounded border border-slate-200">
                    <span class="block text-xs font-bold text-slate-500">Inputs</span>
                    <span class="font-mono text-sm">${data.inputs}</span>
                </div>
                <div class="bg-slate-50 p-2 rounded border border-slate-200">
                    <span class="block text-xs font-bold text-slate-500">Role</span>
                    <span class="font-mono text-sm">${data.role}</span>
                </div>
            </div>
        `;
        visual.style.opacity = 1;
    }, 200);
}

// --- Pipeline Infographic Logic ---
function activateStep(step) {
    // Reset all
    for(let i=1; i<=4; i++) {
        document.getElementById(`node-${i}`).classList.remove('active');
        document.getElementById(`card-${i}`).classList.remove('active');
    }
    // Activate target
    document.getElementById(`node-${step}`).classList.add('active');
    document.getElementById(`card-${step}`).classList.add('active');
}

// --- Charts ---
document.addEventListener('DOMContentLoaded', () => {
    // Use a scoped block for safety if we must use const/let
    {
        const ctx = document.getElementById('roiChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Baseline Data', 'Synthetic Data'],
                datasets: [{
                    label: 'Data Needed for SOTA',
                    data: [100, 18],
                    backgroundColor: ['rgba(255,255,255,0.2)', '#34d399'], // White-ish vs Emerald
                    borderRadius: 4,
                    barThickness: 20
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    x: { display: false, max: 100 }, 
                    y: { 
                        ticks: { color: '#94a3b8', font: { family: 'Inter' } },
                        grid: { display: false }
                    } 
                }
            }
        });
    }
});