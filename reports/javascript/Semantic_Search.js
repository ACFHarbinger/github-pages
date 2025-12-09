// --- Data for Loss Explorer ---
const lossData = {
    contrastive: {
        title: "Contrastive Loss (Pair-Based)",
        desc: "The simplest approach: Pull positive pairs together, push negative pairs apart.",
        pros: "Simple and intuitive to implement.",
        cons: "Greedy algorithm. Collapses intra-class variance (e.g., forces all 'red dresses' to the same point), losing nuance.",
        formula: "Target: 0 distance for positives, >m distance for negatives."
    },
    triplet: {
        title: "Triplet Loss",
        desc: "Uses an Anchor, Positive, and Negative. Ensures Positive is closer to Anchor than Negative by a margin.",
        pros: "Tolerates intra-class variance. Creates rich clusters rather than single points.",
        cons: "Computationally expensive. Requires complex 'hard negative mining' to be effective.",
        formula: "L = max(d(a,p) - d(a,n) + m, 0)"
    },
    arcface: {
        title: "ArcFace (Additive Angular Margin)",
        desc: "State-of-the-Art. Optimizes Geodesic distance on a hypersphere by adding an angular margin penalty.",
        pros: "Mathematically robust geometric optimization. SOTA for discriminative tasks.",
        cons: "Optimized for classification (separability) potentially at the cost of granular semantic overlap.",
        formula: "Target: cos(θ + m)"
    }
};

// --- Functions ---

// 1. Loss Explorer Logic
function updateLoss(type) {
    // Update buttons
    document.querySelectorAll('.loss-btn').forEach(btn => {
        btn.classList.remove('border-amber-500', 'ring-2', 'ring-amber-500');
        btn.classList.add('border-stone-200');
    });
    event.currentTarget.classList.remove('border-stone-200');
    event.currentTarget.classList.add('border-amber-500', 'ring-2', 'ring-amber-500');

    // Update Content
    const data = lossData[type];
    const contentDiv = document.getElementById('lossContent');
    contentDiv.innerHTML = `
        <div class="animate-fade-in">
            <h4 class="text-xl font-bold text-stone-800 mb-2">${data.title}</h4>
            <p class="text-stone-600 mb-6 text-lg border-b border-stone-100 pb-4">${data.desc}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <span class="text-xs font-bold text-stone-400 uppercase tracking-wider">Geometric Intuition</span>
                        <p class="font-mono text-sm bg-stone-50 p-3 rounded mt-1 text-stone-700 border border-stone-200">${data.formula}</p>
                </div>
                <div class="space-y-2">
                        <div class="flex gap-2">
                        <span class="text-green-500 font-bold">✓</span>
                        <p class="text-sm text-stone-600"><strong>Pro:</strong> ${data.pros}</p>
                    </div>
                        <div class="flex gap-2">
                        <span class="text-red-500 font-bold">✕</span>
                        <p class="text-sm text-stone-600"><strong>Con:</strong> ${data.cons}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 2. Deployment Stack Generator
function generateArchitecture() {
    const modality = document.getElementById('inputModality').value;
    const domain = document.getElementById('inputDomain').value;
    const scale = document.getElementById('inputScale').value;
    
    let model = "";
    let tuning = "";
    let db = "";
    let logic = "";

    // Model Logic
    if (modality === 'visual') {
        model = "DINOv2 (ViT-L)";
        logic = "Using SSL (DINOv2) because visual similarity is the priority. 768-dim embeddings.";
    } else {
        model = "MetaCLIP / OpenCLIP";
        logic = "Using Multimodal (CLIP) to enable text-to-image semantic queries. 512-dim embeddings.";
    }

    // Tuning Logic
    if (domain === 'specific') {
        tuning = "Top-Tuning (SOTA Strategy)";
        logic += " Adding lightweight linear layers on top of frozen backbone for domain adaptation.";
    } else {
        tuning = "Pre-trained (Zero-Shot)";
        logic += " Using generalist weights out-of-the-box.";
    }

    // DB Logic
    if (scale === 'massive') {
        db = "Milvus (Self-Hosted)";
    } else {
        db = "Pinecone / Weaviate (Managed)";
    }

    const resultHTML = `
        <div class="w-full text-left animate-fade-in">
            <div class="mb-4">
                <span class="text-xs font-bold text-amber-500 uppercase tracking-wide">Recommended Stack</span>
                <h4 class="text-2xl font-bold text-white mt-1">Your Blueprint</h4>
            </div>
            
            <div class="space-y-4">
                <div class="bg-stone-900/50 p-4 rounded-lg border border-stone-600">
                    <span class="text-stone-400 text-xs uppercase">Model Backbone</span>
                    <div class="text-white font-bold text-lg">Running ${model}</div>
                </div>
                    <div class="bg-stone-900/50 p-4 rounded-lg border border-stone-600">
                    <span class="text-stone-400 text-xs uppercase">Training Strategy</span>
                    <div class="text-white font-bold text-lg">${tuning}</div>
                </div>
                    <div class="bg-stone-900/50 p-4 rounded-lg border border-stone-600">
                    <span class="text-stone-400 text-xs uppercase">Vector Infrastructure</span>
                    <div class="text-white font-bold text-lg">${db} (HNSW Index)</div>
                </div>
            </div>
            
            <div class="mt-6 pt-4 border-t border-stone-700">
                <p class="text-stone-400 text-sm italic"><strong>Architect's Note:</strong> ${logic}</p>
            </div>
        </div>
    `;
    
    document.getElementById('resultContainer').innerHTML = resultHTML;
}

// --- Chart Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Loss Content
    updateLoss('contrastive');

    // 1. Radar Chart (Architecture)
    const ctxArch = document.getElementById('archChart').getContext('2d');
    new Chart(ctxArch, {
        type: 'radar',
        data: {
            labels: ['Inductive Bias', 'Small Data Perf', 'Inference Efficiency', 'Global Context', 'Scalability'],
            datasets: [{
                label: 'CNN (ResNet/EfficientNet)',
                data: [9, 9, 8, 3, 6],
                backgroundColor: 'rgba(168, 162, 158, 0.2)', // Stone-400
                borderColor: '#a8a29e',
                pointBackgroundColor: '#a8a29e',
                borderWidth: 2
            }, {
                label: 'ViT (DINOv2)',
                data: [2, 4, 6, 10, 10],
                backgroundColor: 'rgba(217, 119, 6, 0.2)', // Amber-600
                borderColor: '#d97706',
                pointBackgroundColor: '#d97706',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: '#e5e5e5' },
                    grid: { color: '#e5e5e5' },
                    pointLabels: { font: { family: 'Plus Jakarta Sans', size: 11 }, color: '#57534e' },
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            },
            plugins: { legend: { display: false } }
        }
    });

    // 2. Bar Chart (SOTA Comparison)
    const ctxSota = document.getElementById('sotaChart').getContext('2d');
    new Chart(ctxSota, {
        type: 'bar',
        data: {
            labels: ['Visual Similarity', 'Segmentation', 'Zero-Shot Classification', 'Text-to-Image Search'],
            datasets: [{
                label: 'DINOv2 (Visual)',
                data: [95, 90, 40, 0],
                backgroundColor: '#d97706', // Amber
                borderRadius: 4
            }, {
                label: 'CLIP (Multimodal)',
                data: [65, 50, 90, 95],
                backgroundColor: '#57534e', // Stone
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, max: 100, grid: { color: '#f5f5f4' } },
                x: { grid: { display: false } }
            },
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, fontFamily: 'Plus Jakarta Sans' } },
                tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}% (Relative Perf)` } }
            }
        }
    });
});