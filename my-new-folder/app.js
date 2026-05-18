const state = {
  credits: 3,
  selectedCategory: "All",
  selectedFormat: "Any",
  bookings: [
    { id: 1, name: "Mira", skill: "Spoken English", when: "Today, 6:30 PM", status: "confirmed" },
    { id: 2, name: "Dev", skill: "Portfolio Review", when: "Sat, 11:00 AM", status: "pending" }
  ],
  reviews: [
    { from: "Aarav", text: "Clear explanations, started exactly on time.", score: "4.9" },
    { from: "Nisha", text: "Made the workout plan feel realistic for my hostel schedule.", score: "5.0" }
  ]
};

const categories = ["All", "Tech", "Career", "Fitness", "Languages", "Music", "Content", "Design"];
const formats = ["Any", "In person", "Online", "Group"];

const matches = [
  {
    id: 1,
    name: "Rahul",
    campus: "North Campus",
    teaches: "Beginner photography",
    wants: "Spoken English practice",
    category: "Content",
    format: "In person",
    level: "Beginner friendly",
    availability: "Weekends",
    personality: "Calm, structured",
    score: 94,
    credits: 1,
    verified: ["Phone", "College", "Portfolio"],
    proof: "18 completed exchanges",
    color: "coral",
    avatar: "RK"
  },
  {
    id: 2,
    name: "Mira",
    campus: "Design Block",
    teaches: "Spoken English",
    wants: "Resume and LinkedIn help",
    category: "Languages",
    format: "Online",
    level: "Intermediate",
    availability: "Weekday evenings",
    personality: "Encouraging, chatty",
    score: 91,
    credits: 1,
    verified: ["Phone", "Repeat learners"],
    proof: "7 repeat partners",
    color: "mint",
    avatar: "MS"
  },
  {
    id: 3,
    name: "Dev",
    campus: "Tech Society",
    teaches: "React mentorship",
    wants: "Fitness coaching",
    category: "Tech",
    format: "Group",
    level: "Project based",
    availability: "Tue and Thu",
    personality: "Direct, hands-on",
    score: 88,
    credits: 2,
    verified: ["Phone", "GitHub", "College"],
    proof: "Built 4 student apps",
    color: "blue",
    avatar: "DP"
  },
  {
    id: 4,
    name: "Anika",
    campus: "Music Room",
    teaches: "Guitar basics",
    wants: "Video editing",
    category: "Music",
    format: "In person",
    level: "Zero to chords",
    availability: "Sunday afternoons",
    personality: "Patient, playful",
    score: 86,
    credits: 1,
    verified: ["Phone", "Clips"],
    proof: "12 song demos uploaded",
    color: "gold",
    avatar: "AR"
  },
  {
    id: 5,
    name: "Kabir",
    campus: "Sports Complex",
    teaches: "Strength basics",
    wants: "Excel dashboards",
    category: "Fitness",
    format: "In person",
    level: "Beginner friendly",
    availability: "Mornings",
    personality: "Practical, motivating",
    score: 84,
    credits: 1,
    verified: ["Phone", "Testimonials"],
    proof: "9 weekly streaks helped",
    color: "violet",
    avatar: "KM"
  }
];

const activity = [
  { title: "You taught Python loops", meta: "+1 credit", tone: "earn" },
  { title: "Booked English practice with Mira", meta: "-1 credit", tone: "spend" },
  { title: "Rahul left a punctuality badge", meta: "Trust +", tone: "trust" }
];

const app = document.querySelector("#app");

function filteredMatches() {
  return matches.filter((match) => {
    const categoryOk = state.selectedCategory === "All" || match.category === state.selectedCategory;
    const formatOk = state.selectedFormat === "Any" || match.format === state.selectedFormat;
    return categoryOk && formatOk;
  });
}

function render() {
  const visibleMatches = filteredMatches();
  app.innerHTML = `
    <div class="shell">
      <aside class="sidebar" aria-label="Primary navigation">
        <div class="brand">
          <div class="brand-mark">SC</div>
          <div>
            <strong>SkillCircle</strong>
            <span>Teach one thing. Learn anything.</span>
          </div>
        </div>
        <nav class="nav">
          ${["Matches", "Credits", "Sessions", "Trust", "Campus"].map((item, index) => `
            <button class="${index === 0 ? "active" : ""}" type="button">${iconFor(item)}<span>${item}</span></button>
          `).join("")}
        </nav>
        <div class="credit-panel">
          <span>Time credits</span>
          <strong>${state.credits}</strong>
          <p>Earn by teaching. Spend on any skill in the network.</p>
        </div>
      </aside>

      <main class="main">
        <header class="topbar">
          <div>
            <p class="eyebrow">Campus beta</p>
            <h1>Find skill matches by goal, time, and trust.</h1>
          </div>
          <button class="primary-action" type="button" data-action="open-profile">${iconFor("Profile")}Complete profile</button>
        </header>

        <section class="profile-strip" aria-label="Your skill profile">
          <div class="mini-profile">
            <div class="avatar self">AJ</div>
            <div>
              <span>You offer</span>
              <strong>Resume help, beginner coding</strong>
            </div>
          </div>
          <div class="mini-profile">
            <div class="icon-tile">${iconFor("Learn")}</div>
            <div>
              <span>You want</span>
              <strong>Fitness coaching, spoken English</strong>
            </div>
          </div>
          <div class="mini-profile">
            <div class="icon-tile">${iconFor("Clock")}</div>
            <div>
              <span>Available</span>
              <strong>Evenings and weekends</strong>
            </div>
          </div>
        </section>

        <section class="content-grid">
          <div class="match-workspace">
            <div class="section-head">
              <div>
                <p class="eyebrow">Smart matches</p>
                <h2>${visibleMatches.length} strong matches this week</h2>
              </div>
              <div class="filters" aria-label="Match filters">
                ${categories.map((category) => `
                  <button type="button" class="${state.selectedCategory === category ? "selected" : ""}" data-category="${category}">${category}</button>
                `).join("")}
              </div>
            </div>
            <div class="format-tabs">
              ${formats.map((format) => `
                <button type="button" class="${state.selectedFormat === format ? "selected" : ""}" data-format="${format}">${format}</button>
              `).join("")}
            </div>
            <div class="match-list">
              ${visibleMatches.map(matchCard).join("") || emptyState()}
            </div>
          </div>

          <aside class="right-rail">
            <section class="panel">
              <div class="panel-title">
                <h2>Next sessions</h2>
                <button class="icon-button" type="button" title="Add session">${iconFor("Plus")}</button>
              </div>
              <div class="session-list">
                ${state.bookings.map((booking) => `
                  <div class="session">
                    <span class="status ${booking.status}"></span>
                    <div>
                      <strong>${booking.skill}</strong>
                      <p>${booking.name} - ${booking.when}</p>
                    </div>
                  </div>
                `).join("")}
              </div>
            </section>

            <section class="panel trust">
              <div class="panel-title">
                <h2>Trust profile</h2>
                <span class="trust-score">92</span>
              </div>
              <div class="trust-bars">
                ${trustRow("Punctuality", 95)}
                ${trustRow("Teaching clarity", 89)}
                ${trustRow("Reliability", 91)}
                ${trustRow("Friendliness", 96)}
              </div>
            </section>

            <section class="panel">
              <div class="panel-title">
                <h2>Credit ledger</h2>
              </div>
              <div class="activity-list">
                ${activity.map((item) => `
                  <div class="activity ${item.tone}">
                    <span></span>
                    <div>
                      <strong>${item.title}</strong>
                      <p>${item.meta}</p>
                    </div>
                  </div>
                `).join("")}
              </div>
            </section>
          </aside>
        </section>
      </main>
    </div>

    <dialog id="bookingDialog" class="modal">
      <form method="dialog">
        <button class="icon-button close" value="cancel" type="submit" title="Close">${iconFor("Close")}</button>
        <div id="modalContent"></div>
      </form>
    </dialog>
  `;

  bindEvents();
}

function matchCard(match) {
  return `
    <article class="match-card">
      <div class="match-visual ${match.color}">
        <div class="avatar">${match.avatar}</div>
        <div class="score">${match.score}% match</div>
      </div>
      <div class="match-body">
        <div class="match-header">
          <div>
            <h3>${match.name}</h3>
            <p>${match.campus}</p>
          </div>
          <span class="credit-cost">${match.credits} credit${match.credits > 1 ? "s" : ""}</span>
        </div>
        <div class="exchange">
          <div>
            <span>Teaches</span>
            <strong>${match.teaches}</strong>
          </div>
          <div>
            <span>Wants</span>
            <strong>${match.wants}</strong>
          </div>
        </div>
        <div class="match-tags">
          <span>${match.level}</span>
          <span>${match.availability}</span>
          <span>${match.personality}</span>
        </div>
        <div class="proof-row">
          <div>${match.verified.map((badge) => `<span>${badge}</span>`).join("")}</div>
          <strong>${match.proof}</strong>
        </div>
        <div class="card-actions">
          <button type="button" class="secondary-action" data-action="view" data-id="${match.id}">${iconFor("Eye")}View proof</button>
          <button type="button" class="primary-action" data-action="book" data-id="${match.id}">${iconFor("Calendar")}Book session</button>
        </div>
      </div>
    </article>
  `;
}

function trustRow(label, value) {
  return `
    <div class="trust-row">
      <div><span>${label}</span><strong>${value}%</strong></div>
      <div class="bar"><span style="width:${value}%"></span></div>
    </div>
  `;
}

function emptyState() {
  return `
    <div class="empty-state">
      <h3>No matches for that filter yet</h3>
      <p>Try another format or category while campus density grows.</p>
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedCategory = button.dataset.category;
      render();
    });
  });

  document.querySelectorAll("[data-format]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedFormat = button.dataset.format;
      render();
    });
  });

  document.querySelectorAll("[data-action='book']").forEach((button) => {
    button.addEventListener("click", () => openBooking(Number(button.dataset.id)));
  });

  document.querySelectorAll("[data-action='view']").forEach((button) => {
    button.addEventListener("click", () => openProof(Number(button.dataset.id)));
  });

  document.querySelector("[data-action='open-profile']").addEventListener("click", openProfile);
}

function openBooking(id) {
  const match = matches.find((item) => item.id === id);
  const dialog = document.querySelector("#bookingDialog");
  const content = document.querySelector("#modalContent");
  content.innerHTML = `
    <p class="eyebrow">Book a time-credit session</p>
    <h2>${match.teaches} with ${match.name}</h2>
    <p class="modal-copy">You will spend ${match.credits} credit${match.credits > 1 ? "s" : ""}. After the session, both people review punctuality, clarity, friendliness, and reliability.</p>
    <div class="slot-grid">
      ${["Today 6:30 PM", "Thu 7:00 PM", "Sat 11:00 AM"].map((slot) => `<button type="button" data-slot="${slot}">${slot}</button>`).join("")}
    </div>
    <label class="note-label">
      Session goal
      <textarea placeholder="Example: I want to learn camera basics for Instagram reels."></textarea>
    </label>
    <button class="primary-action wide" type="button" data-confirm-booking="${match.id}">${iconFor("Calendar")}Confirm booking</button>
  `;
  dialog.showModal();
  content.querySelector("[data-confirm-booking]").addEventListener("click", () => {
    if (state.credits >= match.credits) {
      state.credits -= match.credits;
      state.bookings.unshift({ id: Date.now(), name: match.name, skill: match.teaches, when: "Sat, 11:00 AM", status: "pending" });
    }
    dialog.close();
    render();
  });
}

function openProof(id) {
  const match = matches.find((item) => item.id === id);
  const dialog = document.querySelector("#bookingDialog");
  const content = document.querySelector("#modalContent");
  content.innerHTML = `
    <p class="eyebrow">Public proof</p>
    <h2>${match.name}'s trust snapshot</h2>
    <div class="proof-card ${match.color}">
      <div class="avatar">${match.avatar}</div>
      <div>
        <strong>${match.proof}</strong>
        <p>${match.verified.join(" - ")}</p>
      </div>
    </div>
    <div class="review-list">
      ${state.reviews.map((review) => `
        <blockquote>
          <strong>${review.score}</strong>
          <p>${review.text}</p>
          <cite>${review.from}</cite>
        </blockquote>
      `).join("")}
    </div>
  `;
  dialog.showModal();
}

function openProfile() {
  const dialog = document.querySelector("#bookingDialog");
  const content = document.querySelector("#modalContent");
  content.innerHTML = `
    <p class="eyebrow">Complete profile</p>
    <h2>Make your matches better</h2>
    <div class="profile-form">
      <label>Skill you can teach<input value="Resume help, beginner coding" /></label>
      <label>Skill you want<input value="Fitness coaching, spoken English" /></label>
      <label>Availability<input value="Evenings and weekends" /></label>
      <label>Teaching style<input value="Structured, friendly, practical" /></label>
    </div>
    <button class="primary-action wide" type="button" data-save-profile>${iconFor("Check")}Save profile</button>
  `;
  dialog.showModal();
  content.querySelector("[data-save-profile]").addEventListener("click", () => dialog.close());
}

function iconFor(name) {
  const icons = {
    Matches: `<svg viewBox="0 0 24 24"><path d="M8 7a4 4 0 1 1 8 0c0 3-4 5-4 5s-4-2-4-5Z"/><path d="M4 20c1.2-3 4-5 8-5s6.8 2 8 5"/></svg>`,
    Credits: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M9 11h6"/></svg>`,
    Sessions: `<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>`,
    Trust: `<svg viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.5 2.8 8.4 7 10 4.2-1.6 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5"/></svg>`,
    Campus: `<svg viewBox="0 0 24 24"><path d="M3 10 12 5l9 5-9 5-9-5Z"/><path d="M7 12v5c3 2 7 2 10 0v-5"/></svg>`,
    Profile: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.2-6 8-6s6.5 2 8 6"/></svg>`,
    Learn: `<svg viewBox="0 0 24 24"><path d="M4 5h10a4 4 0 0 1 4 4v10H8a4 4 0 0 1-4-4V5Z"/><path d="M8 9h6M8 13h8"/></svg>`,
    Clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 2"/></svg>`,
    Plus: `<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`,
    Eye: `<svg viewBox="0 0 24 24"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    Calendar: `<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16M8 14h3"/></svg>`,
    Close: `<svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>`,
    Check: `<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>`
  };
  return icons[name] || icons.Matches;
}

render();
