// Auto-detect backend URL:
//   - Local dev  → http://localhost:8000
//   - Production → your Render backend URL
// After deploying to Render, replace the string below with your actual URL,
// e.g. 'https://cardiosense-ai-backend.onrender.com'
const RENDER_BACKEND_URL = 'https://cardiosense-ai-m5nd.onrender.com';

const API_BASE = (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
) ? 'http://localhost:8000' : RENDER_BACKEND_URL;

async function apiPost(endpoint, body) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

async function apiGet(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

// Store last prediction result in sessionStorage for results page
function savePrediction(data, formData) {
  sessionStorage.setItem('heartPrediction', JSON.stringify(data));
  sessionStorage.setItem('heartFormData', JSON.stringify(formData));
}

function loadPrediction() {
  const pred = sessionStorage.getItem('heartPrediction');
  const form = sessionStorage.getItem('heartFormData');
  return {
    prediction: pred ? JSON.parse(pred) : null,
    formData: form ? JSON.parse(form) : null
  };
}
