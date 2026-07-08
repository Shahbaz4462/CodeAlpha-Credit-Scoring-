// ============================================================
//  CREDISENSE AI — FRONTEND HANDLER & INTERACTIVE CONTROLS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSlider();
    initForm();
    triggerBarAnimations();
});

// ======= THEME TOGGLER (PERSISTENT LIGHT/DARK) =======
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    // Load theme from localStorage or fallback to default 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
    });
}

// ======= DURATION SLIDER VALUE INTERACTIVE UPDATER =======
function initSlider() {
    const slider = document.getElementById('duration');
    const badge = document.getElementById('duration-value');
    if (!slider || !badge) return;

    slider.addEventListener('input', () => {
        badge.textContent = `${slider.value} months`;
    });
}

// ======= FORM SUBMISSION WITH HEAVY FIDELITY ANALYZER LOADER =======
function initForm() {
    const form = document.getElementById('credit-form');
    const resultContainer = document.getElementById('result-container');
    if (!form || !resultContainer) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const originalText = submitBtn.innerHTML;

        // Enter loading state for button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Running Risk Engine...';

        // Render dynamic multi-phase pipeline logging on the result console
        renderPipelineLoading(resultContainer);

        const payload = {
            full_name: document.getElementById('full_name').value,
            age: parseInt(document.getElementById('age').value),
            amount: parseInt(document.getElementById('amount').value),
            duration: parseInt(document.getElementById('duration').value),
            housing: document.getElementById('housing').value,
            purpose: document.getElementById('purpose').value
        };

        try {
            // Wait slightly to show pipeline logs to look premium
            await sleep(1800);

            const response = await fetch('/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('API communication error');
            const data = await response.json();
            
            renderAnalysisResult(data, resultContainer);
        } catch (err) {
            renderErrorState(resultContainer);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// Helper: premium multi-step analysis progress logs
function renderPipelineLoading(container) {
    container.innerHTML = `
        <div class="pipeline-loader-box">
            <span class="spinner loader-large"></span>
            <div class="logs-feed">
                <p class="log-line active" id="log-1">📡 Ingestion: Retrieving applicant vectors...</p>
                <p class="log-line" id="log-2">⚖️ Preprocessing: Applying SMOTE class balances...</p>
                <p class="log-line" id="log-3">🔮 Prediction: Fetching Gradient Boosting decision tree path...</p>
            </div>
        </div>
    `;

    // Chain log displays
    setTimeout(() => {
        const l1 = document.getElementById('log-1');
        const l2 = document.getElementById('log-2');
        if (l1 && l2) { l1.classList.remove('active'); l2.classList.add('active'); }
    }, 600);

    setTimeout(() => {
        const l2 = document.getElementById('log-2');
        const l3 = document.getElementById('log-3');
        if (l2 && l3) { l2.classList.remove('active'); l3.classList.add('active'); }
    }, 1200);
}

// CSS style additions for logs directly injected
const style = document.createElement('style');
style.textContent = `
    .pipeline-loader-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        text-align: left;
        max-width: 320px;
    }
    .loader-large {
        width: 36px;
        height: 36px;
        border-width: 4px;
        border-top-color: var(--accent-color);
    }
    .logs-feed {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .log-line {
        font-size: 0.82rem;
        color: var(--text-muted);
        opacity: 0.4;
        transition: opacity 0.3s ease, color 0.3s ease;
    }
    .log-line.active {
        color: var(--text-primary);
        opacity: 1;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// ======= RENDER DECISION OUTCOMES =======
function renderAnalysisResult(result, container) {
    const isApproved = result.decision === 'APPROVED';
    const decisionThemeClass = isApproved ? 'approved-theme' : 'rejected-theme';
    const decisionBadge = isApproved ? 'Approved' : 'Rejected';
    
    // Set matching footer description
    const decisionDesc = isApproved
        ? 'Applicant demonstrates low relative default risk. Proposal approved.'
        : 'Applicant profile falls under safe risk baseline limits. Proposal rejected.';

    // Circumference of 283 matches 2 * PI * R (radius 45)
    // Percentage maps to strokeOffset = circumference - (percent / 100 * circumference)
    const targetOffset = 283 - (result.confidence / 100 * 283);

    container.innerHTML = `
        <div class="decision-wrapper-card ${decisionThemeClass}">
            <div class="circle-progress-meter">
                <svg class="circle-svg" viewBox="0 0 100 100">
                    <circle class="circle-track" cx="50" cy="50" r="45"></circle>
                    <circle class="circle-fill-path" cx="50" cy="50" r="45" id="animated-fill"></circle>
                </svg>
                <div class="circle-score-txt">
                    <span class="score-percent">${result.confidence}%</span>
                    <span class="score-lbl">Confidence</span>
                </div>
            </div>

            <div class="decision-badge-tag">${decisionBadge}</div>

            <div class="applicant-info-list">
                <div class="info-item-row">
                    <span class="info-key">Applicant</span>
                    <span class="info-value">${result.applicant_name}</span>
                </div>
                <div class="info-item-row">
                    <span class="info-key">Age Bracket</span>
                    <span class="info-value">${result.age} yrs</span>
                </div>
                <div class="info-item-row">
                    <span class="info-key">Requested Fund</span>
                    <span class="info-value">$${result.amount.toLocaleString()}</span>
                </div>
                <div class="info-item-row">
                    <span class="info-key">Term Limit</span>
                    <span class="info-value">${result.duration} months</span>
                </div>
                <div class="info-item-row">
                    <span class="info-key">Housing</span>
                    <span class="info-value">${result.housing}</span>
                </div>
                <div class="info-item-row">
                    <span class="info-key">Purpose</span>
                    <span class="info-value">${result.purpose}</span>
                </div>
            </div>

            <p class="decision-footer-note">${decisionDesc}</p>
        </div>
    `;

    // Perform circular track drawing animation after insertion
    setTimeout(() => {
        const fillPath = document.getElementById('animated-fill');
        if (fillPath) {
            fillPath.style.strokeDashoffset = targetOffset;
        }
    }, 100);

    // Scroll smoothly to results
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Render error states if Flask fails
function renderErrorState(container) {
    container.innerHTML = `
        <div class="decision-wrapper-card rejected-theme">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">⚠️</div>
            <div class="decision-badge-tag">Offline Error</div>
            <div class="applicant-info-list" style="text-align: center;">
                <p style="font-size: 0.9rem; color: var(--text-secondary);">
                    Unable to reach the backend decision engine. Please make sure the Flask application is running correctly on your host.
                </p>
            </div>
        </div>
    `;
}

// ======= ANIMATE FEATURES & ANALYTICS BAR ON REVEAL/LOAD =======
function triggerBarAnimations() {
    // We run bar fills after a quick delay to support reveal transitions
    setTimeout(() => {
        // Analytics panel bars
        document.querySelectorAll('.bar-fill').forEach(bar => {
            const width = bar.parentElement.previousElementSibling.querySelector('.bar-percentage').textContent;
            bar.style.width = width;
        });

        // Feature importance bars
        document.querySelectorAll('.feat-fill').forEach(bar => {
            const width = bar.parentElement.parentElement.querySelector('.feat-track .feat-fill').style.width;
            // Width has already been set inline in HTML, but we trigger standard layout flow
        });
    }, 400);
}

// Helper sleep resolver
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
