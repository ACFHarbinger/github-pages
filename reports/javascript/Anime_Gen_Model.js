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
let modelListEl = null; 
let modelDetailsEl = null;
let roadmapContainer = null;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Look up DOM elements strictly inside the delayed execution block
    modelListEl = document.getElementById('modelList');
    modelDetailsEl = document.getElementById('modelDetails');
    roadmapContainer = document.getElementById('roadmapContainer');

    initResourceChart();
    renderModelList();
    updateModelView(selectedModelId);
    renderRoadmap();
});

// --- Chart.js: Resource Chart ---
function initResourceChart() {
    const ctx = document.getElementById('resourceChart');
    if (!ctx) return; 

    // This chart is static, so we can just create it once.
    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Anything V5', 'Waifu Diff', 'Animagine XL', 'AnimeGANv2'],
            datasets: [
                {
                    label: 'VRAM Usage (GB)',
                    data: [6, 6, 14, 2],
                    backgroundColor: '#fb923c', 
                    borderRadius: 4
                },
                {
                    label: 'Quality Score (1-10)',
                    data: [9, 8, 10, 5],
                    backgroundColor: '#a8a29e', 
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

// --- Chart.js: Radar Chart Update (FIXED ANIMATION) ---
function updateRadarChart(model) {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return; 

    // If the chart already exists, update its data instead of destroying it.
    // This allows Chart.js to animate the transition between values.
    if (radarChartInstance) {
        radarChartInstance.data.datasets[0].label = model.name;
        radarChartInstance.data.datasets[0].data = [
            model.stats.quality,
            model.stats.speed,
            model.stats.flexibility,
            model.stats.license,
            model.stats.ecosystem
        ];
        radarChartInstance.update(); // Triggers the animation
    } else {
        // First time initialization
        radarChartInstance = new Chart(ctx.getContext('2d'), {
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
                    backgroundColor: 'rgba(234, 88, 12, 0.2)', 
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
}

// --- Render Model List ---
function renderModelList() {
    if (!modelListEl) return; 

    // Clear the existing content
    modelListEl.innerHTML = '';
    
    // 1. Create the select element
    const selectEl = document.createElement('select');
    selectEl.id = 'modelSelect';
    // Tailwind classes for styling the dropdown
    selectEl.className = 'w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors border border-stone-300 bg-white shadow-sm appearance-none focus:ring-blue-500 focus:border-blue-500';

    // 2. Populate options
    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model.id;
        option.innerText = model.name;
        
        // Set the default selection based on selectedModelId
        if (model.id === selectedModelId) {
            option.selected = true;
        }
        
        selectEl.appendChild(option);
    });

    // 3. Add change listener
    selectEl.addEventListener('change', (event) => {
        selectedModelId = event.target.value;
        // The default value of a <select> element is automatically updated, 
        // so we just need to update the view.
        updateModelView(selectedModelId);
    });

    // 4. Append to the DOM
    modelListEl.appendChild(selectEl);
}

// --- Update Model Details View ---
function updateModelView(id) {
    // CRITICAL: Look up elements locally.
    const modelDetailsEl = document.getElementById('modelDetails');
    if (!modelDetailsEl) return; 

    const model = models.find(m => m.id === id);
    if (!model) return;

    // FIX 1: Ensure pros/cons text starts flush by using the parent <ul>'s default style and relying on flex for alignment.
    let prosHtml = model.pros.map(p => 
        // Note: The parent <ul> will handle spacing, the flex ensures icon and text align vertically.
        `<li class="flex items-start text-sm text-stone-600 mb-1">
            <span class="text-green-500 font-bold mr-2.5 mt-0.5">✓</span>
            <span class="flex-1">${p}</span>
         </li>`
    ).join('');

    let consHtml = model.cons.map(c => 
        `<li class="flex items-start text-sm text-stone-600 mb-1">
            <!-- REMOVED font-bold to make the cross icon less bulky -->
            <span class="text-red-500 mr-2.5 mt-0.5">✖</span>
            <span class="flex-1">${c}</span>
         </li>`
    ).join('');

    modelDetailsEl.innerHTML = `
        <div class="animate-fade-in text-left"> <h2 class="text-3xl font-bold text-stone-800 mb-2 leading-tight">${model.name}</h2>
            
            <span class="inline-block bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded mb-4 font-mono">${model.type}</span>
            <p class="text-stone-600 mb-6">${model.desc}</p>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <h5 class="font-bold text-stone-800 text-sm mb-3 border-b border-stone-100 pb-1">Strengths</h5>
                    <ul class="space-y-1 list-none pl-0">${prosHtml}</ul>
                </div>
                <div>
                    <h5 class="font-bold text-stone-800 text-sm mb-3 border-b border-stone-100 pb-1">Weaknesses</h5>
                    <ul class="space-y-1 list-none pl-0">${consHtml}</ul>
                </div>
            </div>
        </div>
    `;

    // Update Chart
    updateRadarChart(model);
}
// --- Render Interactive Roadmap (FIXED CLICK INTERACTION) ---
function renderRoadmap() {
    if (!roadmapContainer) return; 

    roadmapContainer.innerHTML = '';
    roadmapSteps.forEach((step, index) => {
        const node = document.createElement('div');
        // Initial state: default styles
        node.className = 'timeline-node relative pl-8 cursor-pointer group transition-all duration-300';
        
        // We inject the HTML structure. Note the 'hidden' class on the tasks list.
        node.innerHTML = `
            <div class="circle absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-stone-300 transition-colors group-hover:border-blue-500"></div>
            <div class="content p-4 rounded-lg border-l-4 border-stone-200 bg-white shadow-sm transition-all duration-300 group-hover:border-blue-400">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-xs font-bold text-blue-600 uppercase tracking-wide">${step.phase}</span>
                </div>
                <h4 class="text-lg font-bold text-stone-800 mb-1">${step.title}</h4>
                <p class="text-stone-600 text-sm mb-3">${step.details}</p>
                <div class="tasks-container hidden transition-all ease-in-out">
                    <ul class="space-y-1 mt-2 border-t border-stone-100 pt-2">
                        ${step.tasks.map(t => `<li class="text-xs text-stone-500 flex items-center"><span class="w-1 h-1 bg-stone-400 rounded-full mr-2"></span>${t}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        // Add Click Handler for Interactivity
        node.onclick = () => {
            const tasks = node.querySelector('.tasks-container');
            const circle = node.querySelector('.circle');
            const content = node.querySelector('.content');

            // Toggle Visibility
            const isHidden = tasks.classList.contains('hidden');
            
            if (isHidden) {
                // OPEN STATE
                tasks.classList.remove('hidden');
                
                // Manually apply 'active' styles (Blue Highlight)
                circle.classList.remove('border-stone-300');
                circle.classList.add('border-blue-600', 'bg-blue-50');
                
                content.classList.remove('border-stone-200');
                content.classList.add('border-blue-500', 'shadow-md');
            } else {
                // CLOSED STATE
                tasks.classList.add('hidden');
                
                // Revert styles
                circle.classList.add('border-stone-300');
                circle.classList.remove('border-blue-600', 'bg-blue-50');
                
                content.classList.add('border-stone-200');
                content.classList.remove('border-blue-500', 'shadow-md');
            }
        };

        roadmapContainer.appendChild(node);
    });
}