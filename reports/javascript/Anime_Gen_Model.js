// --- Data Store ---
const models = [
    {
        id: 'anything_v5',
        name: 'Anything V5',
        type: 'Stable Diffusion 1.5 Finetune',
        desc: 'The gold standard for general anime illustration. Highly flexible prompt adherence.',
        stats: { quality: 9, speed: 6, flexibility: 9, license: 8, ecosystem: 10 },
        pros: ['Massive LoRA compatibility', 'Rich color palette', 'Low hardware requirement (SD1.5)'],
        cons: ['Can struggle with anatomy without negative prompts', 'Resolution limited natively to 512-768px']
    },
    {
        id: 'waifu_diff',
        name: 'Waifu Diffusion v1.4',
        type: 'Stable Diffusion 1.5 Finetune',
        desc: 'Trained on Danbooru tags heavily. Requires specific tag-based prompting syntax.',
        stats: { quality: 8, speed: 6, flexibility: 7, license: 9, ecosystem: 8 },
        pros: ['Excellent tag compliance', 'Open licensing (MIT)', 'Distinct style'],
        cons: ['Steeper learning curve for prompting', 'Older base model']
    },
    {
        id: 'counterfeit',
        name: 'Counterfeit V3.0',
        type: 'Stable Diffusion 1.5 Finetune',
        desc: 'Specialized in high-fidelity, painterly, and background-rich anime art.',
        stats: { quality: 9.5, speed: 6, flexibility: 8, license: 8, ecosystem: 9 },
        pros: ['Stunning lighting effects', 'High details', 'Great for landscapes'],
        cons: ['Slightly less versatile for character design']
    },
    {
        id: 'animagine_xl',
        name: 'Animagine XL 3.1',
        type: 'SDXL Finetune',
        desc: 'Next-gen high resolution model based on SDXL. Superior quality but heavy resource usage.',
        stats: { quality: 10, speed: 3, flexibility: 9, license: 7, ecosystem: 7 },
        pros: ['Native 1024x1024 generation', 'Better text rendering', 'Superior anatomy'],
        cons: ['Requires high VRAM (12GB+ recommended)', 'Slower inference']
    },
    {
        id: 'animegan',
        name: 'AnimeGANv2',
        type: 'GAN',
        desc: 'Image-to-Image style transfer model. Turns photos into anime style.',
        stats: { quality: 6, speed: 10, flexibility: 2, license: 9, ecosystem: 4 },
        pros: ['Real-time processing', 'Lightweight', 'Great for filters'],
        cons: ['Cannot generate from text', 'Fixed style output']
    }
];

const roadmapSteps = [
    {
        phase: 'Phase 1',
        title: 'Literature & Model Selection',
        details: 'Evaluate current SOTA models. Focus on weights that allow commercial use (Apache 2.0, OpenRAIL-M).',
        tasks: ['Audit licenses of SDXL vs SD1.5 checkpoints.', 'Benchmark inference speeds on target hardware.', 'Identify required VRAM constraints.']
    },
    {
        phase: 'Phase 2',
        title: 'Pipeline Architecture Design',
        details: 'Design the software integration layer. How will the model talk to the main app?',
        tasks: ['Select backend: Python (FastAPI) vs C++ (OnnxRuntime).', 'Design API schema for prompt ingestion.', 'Implement queue system for image generation requests.']
    },
    {
        phase: 'Phase 3',
        title: 'Optimization & Quantization',
        details: 'Reduce model size and memory footprint without significant quality loss.',
        tasks: ['Test TensorRT implementation for NVIDIA GPUs.', 'Evaluate xFormers for memory efficiency.', 'Experiment with INT8 quantization.']
    },
    {
        phase: 'Phase 4',
        title: 'Fine-tuning Strategy (Optional)',
        details: 'If base models fail specific style requirements, implement Low-Rank Adaptation (LoRA).',
        tasks: ['Curate a dataset of ~50 high-quality target style images.', 'Train LoRA adapter.', 'Integrate adapter loading into inference pipeline.']
    }
];

// --- State Management ---
let selectedModelId = models[0].id;
let radarChartInstance = null;

// --- DOM Elements ---
const modelListEl = document.getElementById('modelList');
const modelDetailsEl = document.getElementById('modelDetails');
const roadmapContainer = document.getElementById('roadmapContainer');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initResourceChart();
    renderModelList();
    updateModelView(selectedModelId);
    renderRoadmap();
});

// --- Chart.js: Resource Chart ---
function initResourceChart() {
    const ctx = document.getElementById('resourceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Anything V5', 'Waifu Diff', 'Animagine XL', 'AnimeGANv2'],
            datasets: [
                {
                    label: 'VRAM Usage (GB)',
                    data: [6, 6, 14, 2],
                    backgroundColor: '#fb923c', // blue-400
                    borderRadius: 4
                },
                {
                    label: 'Quality Score (1-10)',
                    data: [9, 8, 10, 5],
                    backgroundColor: '#a8a29e', // Stone-400
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                y: { beginAtZero: true, max: 16 }
            }
        }
    });
}

// --- Chart.js: Radar Chart Update ---
function updateRadarChart(model) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    if (radarChartInstance) {
        radarChartInstance.destroy();
    }

    radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Quality', 'Speed', 'Flexibility', 'License', 'Ecosystem'],
            datasets: [{
                label: model.name,
                data: [
                    model.stats.quality,
                    model.stats.speed,
                    model.stats.flexibility,
                    model.stats.license,
                    model.stats.ecosystem
                ],
                backgroundColor: 'rgba(234, 88, 12, 0.2)', // blue with opacity
                borderColor: '#ea580c',
                pointBackgroundColor: '#ea580c',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ea580c'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: '#e5e7eb' },
                    grid: { color: '#e5e7eb' },
                    pointLabels: { font: { size: 12, family: 'Inter' }, color: '#4b5563' },
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// --- Render Model List ---
function renderModelList() {
    modelListEl.innerHTML = '';
    models.forEach(model => {
        const btn = document.createElement('button');
        btn.className = `w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors border ${
            model.id === selectedModelId 
            ? 'bg-blue-50 border-blue-200 text-blue-700' 
            : 'bg-white border-transparent text-stone-600 hover:bg-stone-100'
        }`;
        btn.innerText = model.name;
        btn.onclick = () => {
            selectedModelId = model.id;
            renderModelList(); // Re-render to update active state
            updateModelView(model.id);
        };
        modelListEl.appendChild(btn);
    });
}

// --- Update Model Details View ---
function updateModelView(id) {
    const model = models.find(m => m.id === id);
    
    // Update Text Details
    let prosHtml = model.pros.map(p => `<li class="flex items-start text-sm text-stone-600"><span class="text-green-500 mr-2">✓</span>${p}</li>`).join('');
    let consHtml = model.cons.map(c => `<li class="flex items-start text-sm text-stone-600"><span class="text-red-400 mr-2">✕</span>${c}</li>`).join('');

    modelDetailsEl.innerHTML = `
        <div class="animate-fade-in">
            <h2 class="text-3xl font-bold text-stone-800 mb-2">${model.name}</h2>
            <span class="inline-block bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded mb-4 font-mono">${model.type}</span>
            <p class="text-stone-600 mb-6">${model.desc}</p>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <h5 class="font-bold text-stone-800 text-sm mb-2">Strengths</h5>
                    <ul class="space-y-1">${prosHtml}</ul>
                </div>
                <div>
                    <h5 class="font-bold text-stone-800 text-sm mb-2">Weaknesses</h5>
                    <ul class="space-y-1">${consHtml}</ul>
                </div>
            </div>
        </div>
    `;

    // Update Chart
    updateRadarChart(model);
}

// --- Render Interactive Roadmap ---
function renderRoadmap() {
    roadmapContainer.innerHTML = '';
    roadmapSteps.forEach((step, index) => {
        const node = document.createElement('div');
        node.className = 'timeline-node relative pl-8 cursor-pointer group';
        node.innerHTML = `
            <div class="circle absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-stone-300 transition-colors group-hover:border-blue-500"></div>
            <div class="content p-4 rounded-lg border-l-4 border-stone-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-400">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-xs font-bold text-blue-600 uppercase tracking-wide">${step.phase}</span>
                </div>
                <h4 class="text-lg font-bold text-stone-800 mb-1">${step.title}</h4>
                <p class="text-stone-600 text-sm mb-3">${step.details}</p>
                <div class="hidden group-hover:block transition-all ease-in-out">
                    <ul class="space-y-1 mt-2 border-t border-stone-100 pt-2">
                        ${step.tasks.map(t => `<li class="text-xs text-stone-500 flex items-center"><span class="w-1 h-1 bg-stone-400 rounded-full mr-2"></span>${t}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        roadmapContainer.appendChild(node);
    });
}