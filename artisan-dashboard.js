// artisan-dashboard.js

const tabs = document.querySelectorAll(".dash-link");
const tabPanels = {
  overview: document.getElementById("tab-overview"),
  leads: document.getElementById("tab-leads"),
  projects: document.getElementById("tab-projects"),
  messages: document.getElementById("tab-messages"),
  payouts: document.getElementById("tab-payouts"),
  profile: document.getElementById("tab-profile"),
};

function showTab(name) {
  tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
  Object.keys(tabPanels).forEach((k) => tabPanels[k]?.classList.toggle("active", k === name));
}

tabs.forEach((btn) => {
  btn.addEventListener("click", () => showTab(btn.dataset.tab));
});

document.querySelectorAll("[data-jump]").forEach((b) => {
  b.addEventListener("click", () => showTab(b.dataset.jump));
});

// Placeholder data
const leads = [
  { id: "L1", city: "Lagos", trade: "Painter", title: "3 bedroom painting and finishing", budget: "₦ 350,000", urgency: "High", client: "Diaspora client (UK)", date: "Dec 24, 2025" },
  { id: "L2", city: "Benin City", trade: "Painter", title: "Interior repaint for duplex", budget: "₦ 240,000", urgency: "Medium", client: "Local owner", date: "Dec 23, 2025" },
  { id: "L3", city: "Port Harcourt", trade: "Painter", title: "Office wall finishing and coating", budget: "₦ 420,000", urgency: "Low", client: "Business", date: "Dec 20, 2025" },
  { id: "L4", city: "Kano", trade: "Painter", title: "Exterior paint for bungalow", budget: "₦ 180,000", urgency: "Medium", client: "Local owner", date: "Dec 19, 2025" },
  { id: "L5", city: "Lagos", trade: "Painter", title: "POP ceiling paint and finishing", budget: "₦ 300,000", urgency: "High", client: "Diaspora client (US)", date: "Dec 18, 2025" },
  { id: "L6", city: "Benin City", trade: "Painter", title: "Staircase painting and varnish", budget: "₦ 150,000", urgency: "Low", client: "Local owner", date: "Dec 16, 2025" },
];

const projects = [
  { id: "P1", name: "Lekki Duplex Finishing", city: "Lagos", milestone: "Painting phase 2", progress: 62, nextDue: "Dec 28, 2025" },
  { id: "P2", name: "Kano Bungalow Exterior", city: "Kano", milestone: "Surface prep", progress: 35, nextDue: "Dec 27, 2025" },
];

const inbox = [
  { from: "Client: Ukachi N.", snippet: "Can you start the painting on Monday?", time: "2h ago" },
  { from: "47Builders Support", snippet: "Your documents are being reviewed.", time: "1d ago" },
  { from: "Client: Emeka O.", snippet: "Please share progress photos today.", time: "2d ago" },
];

// Render functions
const leadList = document.getElementById("leadList");
const leadCity = document.getElementById("leadCity");
const leadType = document.getElementById("leadType");

function leadCard(l) {
  return `
    <div class="dash-lead">
      <div class="dash-lead-top">
        <div>
          <p class="dash-item-title">${l.title}</p>
          <p class="dash-item-sub">${l.city} • ${l.trade} • ${l.client}</p>
        </div>
        <span class="badge ${l.urgency === "High" ? "badge-warn" : "badge-city"}">${l.urgency} urgency</span>
      </div>
      <div class="dash-lead-meta">
        <span class="pill">Budget: ${l.budget}</span>
        <span class="pill">Posted: ${l.date}</span>
      </div>
      <div class="dash-lead-actions">
        <button class="primaryButton dash-small" data-accept="${l.id}">Accept</button>
        <button class="secondaryButton dash-small" data-decline="${l.id}">Decline</button>
      </div>
    </div>
  `;
}

function renderLeads() {
  if (!leadList) return;

  const c = (leadCity?.value || "").trim();
  const t = (leadType?.value || "").trim();

  const filtered = leads.filter((x) => {
    const okCity = !c || x.city === c;
    const okType = !t || x.trade === t;
    return okCity && okType;
  });

  leadList.innerHTML = filtered.length
    ? filtered.map(leadCard).join("")
    : `<div class="dash-empty">No leads match your filters.</div>`;

  leadList.querySelectorAll("[data-accept]").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Accepted lead (placeholder). Later this will create a chat and proposal flow.");
    });
  });

  leadList.querySelectorAll("[data-decline]").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Declined lead (placeholder). Later this will update lead status.");
    });
  });
}

leadCity?.addEventListener("change", renderLeads);
leadType?.addEventListener("change", renderLeads);

const projectList = document.getElementById("projectList");
function renderProjects() {
  if (!projectList) return;

  projectList.innerHTML = projects.map((p) => {
    return `
      <div class="dash-project">
        <div class="dash-project-head">
          <div>
            <p class="dash-item-title">${p.name}</p>
            <p class="dash-item-sub">${p.city} • Current milestone: ${p.milestone}</p>
          </div>
          <span class="pill">Next due: ${p.nextDue}</span>
        </div>

        <div class="progress-row">
          <div class="progress-bar">
            <div class="progress-fill" style="width:${p.progress}%"></div>
          </div>
          <div class="progress-num">${p.progress}%</div>
        </div>

        <div class="dash-project-actions">
          <button class="secondaryButton dash-small">Upload photos</button>
          <button class="secondaryButton dash-small">Update milestone</button>
          <button class="primaryButton dash-small">Message client</button>
        </div>
      </div>
    `;
  }).join("");
}

const inboxList = document.getElementById("inboxList");
function renderInbox() {
  if (!inboxList) return;
  inboxList.innerHTML = inbox.map((m) => {
    return `
      <div class="dash-list-item">
        <div>
          <p class="dash-item-title">${m.from}</p>
          <p class="dash-item-sub">${m.snippet}</p>
        </div>
        <span class="pill">${m.time}</span>
      </div>
    `;
  }).join("");
}

// Chat placeholder
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatBox = document.getElementById("chatBox");

chatForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = (chatInput?.value || "").trim();
  if (!text) return;
  const div = document.createElement("div");
  div.className = "chat-bubble outgoing";
  div.textContent = text;
  chatBox?.appendChild(div);
  chatInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
});

document.getElementById("btnRefresh")?.addEventListener("click", () => {
  renderLeads();
  renderProjects();
  renderInbox();
  alert("Refreshed dashboard data (placeholder).");
});

document.getElementById("btnAddPortfolio")?.addEventListener("click", () => {
  showTab("profile");
});

document.getElementById("btnWithdraw")?.addEventListener("click", () => {
  alert("Withdraw (placeholder). Later connect to payout provider.");
});

const profileMessage = document.getElementById("profileMessage");
document.getElementById("btnSaveProfile")?.addEventListener("click", () => {
  if (profileMessage) {
    profileMessage.textContent = "Profile saved (placeholder).";
    profileMessage.style.color = "#fbbf24";
  }
});

document.getElementById("btnUploadId")?.addEventListener("click", () => {
  alert("Upload ID (placeholder). Later connect to S3 upload + verification flow.");
});

// Initial renders
renderLeads();
renderProjects();
renderInbox();
