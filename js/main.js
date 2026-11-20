import { profile, skills, foundations, projects } from "./data.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const safeUrl = value => { try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : ""; } catch { return ""; } };

function applyProfileData() {
  const nameParts = profile.name.trim().split(/\s+/);
  $("#hero-title").innerHTML = `<span data-first-name>${escapeHtml(nameParts.shift() || "")}</span> <span class="name-accent" data-last-name>${escapeHtml(nameParts.join(" "))}</span>`;
  $(".brand-name").textContent = profile.name.toUpperCase();
  $("[data-footer-name]").textContent = profile.name.toUpperCase();
  $(".portrait-frame img").src = safeAssetPath(profile.photoPath) || "assets/arpit-profile.jpg";
  $("[data-profile-title]").textContent = profile.heroTitle;
  $("[data-hero-summary]").textContent = profile.heroSummary;
  $$('[data-degree]').forEach(node => node.textContent = profile.degree);
  $("[data-current-learning]").textContent = profile.currentlyLearning;
  $$('[data-degree-heading]').forEach(node => node.textContent = profile.degree);
  $$('[data-college]').forEach(node => node.textContent = profile.college);
  $$('[data-college-start]').forEach(node => node.textContent = profile.collegeStartYear);
  $$('[data-graduation]').forEach(node => node.textContent = profile.graduationYear);
  $("[data-about-summary]").textContent = profile.aboutSummary;
  $("[data-class-xii-year]").textContent = profile.classXIIYear;
  $("[data-class-x-year]").textContent = profile.classXYear;
  $("[data-class-xii]").textContent = profile.classXII;
  $("[data-class-x]").textContent = profile.classX;
  $$('[data-school]').forEach(node => node.textContent = profile.schoolName);
  $("[data-experience-title]").textContent = profile.experienceTitle;
  $("[data-experience-summary]").textContent = profile.experienceSummary;
  $("[data-achievements-title]").textContent = profile.achievementsTitle;
  $("[data-achievements-summary]").textContent = profile.achievementsSummary;
  const certificationLink = safeUrl(profile.social.linkedin.url);
  $("[data-certifications]").innerHTML = (profile.certifications || []).map(cert => `<li class="certificate-card"><div><strong>${escapeHtml(cert.name)}</strong><span>${escapeHtml(cert.issuer)}${cert.issued ? ` · Issued ${escapeHtml(cert.issued)}` : ""}</span>${cert.credentialId ? `<small>Credential ID: ${escapeHtml(cert.credentialId)}</small>` : ""}</div>${certificationLink ? `<a href="${escapeHtml(`${certificationLink}details/certifications/`)}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>` : ""}</li>`).join("");
  $("[data-interests]").innerHTML = profile.interests.map(item => `<span>${escapeHtml(item)}</span>`).join("");
  const liveDemos = projects.filter(project => Boolean(safeUrl(project.demoUrl))).length;
  $("#quick-project-count").textContent = String(projects.length);
  $("#quick-grad-year").textContent = String(profile.graduationYear);
  $("#quick-live-count").textContent = String(liveDemos);
  $("#snapshot-projects").textContent = String(projects.length);
  $("#snapshot-grad").textContent = String(profile.graduationYear);
  $("#snapshot-skill-groups").textContent = String(skills.length);
  document.title = `${profile.name} · Portfolio`;
}

function renderSocials() {
  const order = ["github", "linkedin", "leetcode"];
  const links = order.map(key => profile.social[key]).filter(item => safeUrl(item.url));
  const container = $(`[data-social-links]`);
  container.innerHTML = links.length ? links.map(item => `<a href="${escapeHtml(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.label.toUpperCase())} ↗</a>`).join("") : `<span>ADD YOUR SOCIAL LINKS</span>`;
  const contact = $(`[data-contact-links]`);
  const contactItems = ["linkedin", "github", "leetcode", "codeforces", "hackerrank"].map(key => profile.social[key]).filter(item => safeUrl(item.url)).map(item => `<a href="${escapeHtml(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer"><b>${escapeHtml(item.label.toUpperCase())}</b><span>${escapeHtml(item.username || item.url.replace(/^https?:\/\//, ""))}</span> ↗</a>`);
  if (profile.contactEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.contactEmail)) contactItems.push(`<a href="mailto:${encodeURIComponent(profile.contactEmail)}"><b>EMAIL</b><span>${profile.contactEmail}</span> ↗</a>`);
  if (profile.phone) contactItems.push(`<a href="tel:${profile.phone.replace(/[^+\d]/g, "")}"><b>PHONE</b><span>${profile.phone}</span> ↗</a>`);
  contact.innerHTML = contactItems.length ? contactItems.join("") : `<span><b>LINKS</b><span>Add your email and social links in js/data.js.</span></span>`;
}

function renderSkills() {
  $("#skills-grid").innerHTML = skills.map(group => `<article class="skill-card reveal"><div class="skill-icon" aria-hidden="true">${escapeHtml(group.icon)}</div><h3>${escapeHtml(group.title)}</h3><div class="skill-tags">${group.items.map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div></article>`).join("");
  $("#foundation-tags").innerHTML = foundations.map(item => `<span>${escapeHtml(item)}</span>`).join("");
}

function projectVisual(project) {
  const screenshot = safeAssetPath(project.screenshotUrl);
  if (screenshot) return `<div class="project-visual project-visual-image"><img class="project-screenshot" src="${screenshot}" alt="${escapeHtml(project.name)} project screenshot" loading="lazy"></div>`;
  return `<div class="project-visual kind-${escapeHtml(project.visual || "other")}" aria-label="Illustrative project interface preview"><span class="visual-label">${escapeHtml(project.name.toUpperCase())} · CONCEPT PREVIEW</span><div class="visual-window"><div class="window-dots"><i></i><i></i><i></i></div><div class="visual-main"><div class="visual-sidebar"></div><div class="visual-content"><div class="visual-line"></div><div class="visual-line short"></div><div class="visual-blocks"><i></i><i></i><i></i></div></div></div></div><div class="visual-glow"></div></div>`;
}
function safeAssetPath(value) {
  const path = String(value || "").trim();
  if (/^(assets\/|\.\/assets\/)[\w./-]+\.(?:png|jpe?g|webp|avif)$/i.test(path) && !path.includes("..")) return path;
  return safeUrl(path);
}

function renderProjects(filter = "All") {
  const filters = [{ label: "All", value: "All" }, { label: "Live", value: "live" }, { label: "Completed", value: "completed" }, { label: "In development", value: "development" }];
  $("#project-filters").innerHTML = filters.map(item => `<button class="filter-button ${item.value === filter ? "active" : ""}" data-filter="${item.value}" aria-pressed="${item.value === filter}">${item.label}</button>`).join("");
  const visible = projects.filter(project => filter === "All" || project.status === filter);
  $("#projects-grid").innerHTML = visible.map(project => {
    const status = project.status === "live" ? "Live" : project.status === "completed" ? "Completed" : "In development";
    const statusClass = project.status === "live" ? "status-live" : project.status === "development" ? "status-development" : "";
    const demo = safeUrl(project.demoUrl), repo = safeUrl(project.repoUrl), id = encodeURIComponent(project.id);
    return `<article class="project-card reveal" tabindex="0" role="button" aria-label="View details for ${escapeHtml(project.name)}" data-project="${escapeHtml(project.id)}">${projectVisual(project)}<div class="project-body"><div class="project-meta"><span class="project-status ${statusClass}">${status}</span><span class="project-category">${escapeHtml(project.category.toUpperCase())}</span></div><h3>${escapeHtml(project.name)} <span>↗</span></h3><p>${escapeHtml(project.description)}</p><div class="project-tech">${project.technologies.map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div><div class="project-links">${demo ? `<a href="${escapeHtml(demo)}" target="_blank" rel="noopener" aria-label="Live demo for ${escapeHtml(project.name)}">Live demo ↗</a>` : `<a href="project.html?id=${id}" aria-label="Open ${escapeHtml(project.name)} project details">View details ↗</a>`}${repo ? `<a href="${escapeHtml(repo)}" target="_blank" rel="noopener" aria-label="Source code for ${escapeHtml(project.name)}">GitHub ↗</a>` : ""}</div></div></article>`;
  }).join("");
  observeReveals();
}

function openProject(id) {
  const project = projects.find(item => item.id === id); if (!project) return;
  const status = project.status === "live" ? "LIVE" : project.status === "completed" ? "COMPLETED" : "IN DEVELOPMENT";
  $("#dialog-content").innerHTML = `<span class="dialog-project-kicker">${escapeHtml(project.category.toUpperCase())} · ${status}</span><h2 id="dialog-title">${escapeHtml(project.name)}</h2><p>${escapeHtml(project.subtitle)}</p><p>${escapeHtml(project.description)}</p><h3>Project focus</h3><ul class="dialog-features">${project.features.map(feature => `<li>${escapeHtml(feature)}</li>`).join("")}</ul><h3>Technology stack</h3><div class="project-tech">${project.technologies.map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div><div class="dialog-links">${safeUrl(project.demoUrl) ? `<a class="button button-primary" href="${escapeHtml(safeUrl(project.demoUrl))}" target="_blank" rel="noopener">Live demo ↗</a>` : ""}${safeUrl(project.repoUrl) ? `<a class="button button-outline" href="${escapeHtml(safeUrl(project.repoUrl))}" target="_blank" rel="noopener">GitHub ↗</a>` : ""}</div>`;
  $("#project-dialog").showModal();
}

const providers = [
  { key: "leetcode", name: "LeetCode", mark: "LC", metric: "Problems solved", load: loadLeetCode },
  { key: "codeforces", name: "Codeforces", mark: "CF", metric: "Contest rating", load: loadCodeforces }
];

function renderCodingCards() {
  const cfProfile = profile.social.codeforces;
  const cfSnapshot = cfProfile.snapshot;
  const hasCfSnapshot = cfSnapshot?.username?.toLowerCase() === cfProfile.username.toLowerCase();
  const cfValue = (key, initial = "—") => hasCfSnapshot && cfSnapshot[key] != null ? cfSnapshot[key] : initial;
  $("#coding-grid").innerHTML = `
    <article class="leetcode-card" data-coding-card="leetcode">
      <header class="platform-card-head">
        <div class="platform-brand"><span class="coding-logo">LC</span><div><span class="coding-provider">LEETCODE</span><small>PROBLEM SOLVING PROFILE</small></div></div>
        <a class="coding-link" data-profile-link="leetcode" href="#" aria-label="Open LeetCode profile">↗</a>
      </header>
      <div class="leetcode-overview"><strong class="leetcode-total empty" data-metric="leetcode">Loading public stats…</strong><span>PROBLEMS SOLVED</span></div>
      <h3 class="platform-group-title">Problems by difficulty</h3>
      <div class="leetcode-breakdown" aria-live="polite">
        <div class="leetcode-row" data-level="easy"><div><span>Easy</span><b data-level-count="easy">—</b></div><div class="leetcode-track"><i data-level-bar="easy"></i></div><small data-level-ratio="easy">Loading profile data</small></div>
        <div class="leetcode-row" data-level="medium"><div><span>Medium</span><b data-level-count="medium">—</b></div><div class="leetcode-track"><i data-level-bar="medium"></i></div><small data-level-ratio="medium">Loading profile data</small></div>
        <div class="leetcode-row" data-level="hard"><div><span>Hard</span><b data-level-count="hard">—</b></div><div class="leetcode-track"><i data-level-bar="hard"></i></div><small data-level-ratio="hard">Loading profile data</small></div>
      </div>
      <h3 class="platform-group-title">Contest and profile stats</h3>
      <div class="platform-metrics leetcode-metrics">
        <div><span>Contest rating</span><strong data-lc-rating>—</strong></div><div><span>Contest top %</span><strong data-lc-top>—</strong></div><div><span>Contests attended</span><strong data-lc-contests>—</strong></div><div><span>Acceptance rate</span><strong data-lc-acceptance>—</strong></div><div><span>Global rank</span><strong data-lc-rank>—</strong></div>
      </div>
      <footer class="platform-card-foot"><p class="leetcode-note" data-lc-note>Live public stats load from the profile API.</p><button class="coding-refresh" data-refresh="leetcode" aria-label="Refresh LeetCode statistics">↻ Refresh</button></footer>
    </article>
    <article class="codeforces-card" data-coding-card="codeforces">
      <header class="platform-card-head">
        <div class="platform-brand"><span class="coding-logo">CF</span><div><span class="coding-provider">CODEFORCES</span><small>CONTEST PERFORMANCE</small></div></div>
        <a class="coding-link" data-profile-link="codeforces" href="#" aria-label="Open Codeforces profile">↗</a>
      </header>
      <h3 class="platform-group-title">Rating</h3>
      <div class="platform-metrics cf-rating-metrics"><div><span>Current rating</span><strong data-cf-rating>${cfValue("rating", "Loading…")}</strong></div><div><span>Best rating</span><strong data-cf-max>${cfValue("maxRating")}</strong></div><div><span>Rank</span><strong data-cf-rank>${cfValue("rank")}</strong></div></div>
      <h3 class="platform-group-title">Profile</h3>
      <div class="platform-metrics cf-profile-metrics"><div><span>Handle</span><strong data-cf-handle>${escapeHtml(cfProfile.username || "Not connected")}</strong></div><div><span>Contribution</span><strong data-cf-contribution>${cfValue("contribution")}</strong></div><div><span>Friends</span><strong data-cf-friends>${cfValue("friends")}</strong></div><div><span>Joined</span><strong data-cf-registered>${cfValue("registeredYear")}</strong></div></div>
      <h3 class="platform-group-title">Recent activity <small>Up to 1,000 latest submissions</small></h3>
      <div class="platform-metrics cf-activity-metrics"><div><span>Distinct problems solved</span><strong data-cf-solved>${cfValue("solvedRecent")}</strong></div><div><span>Accepted submissions</span><strong data-cf-accepted>${cfValue("acceptedRecent")}</strong></div><div><span>Submissions checked</span><strong data-cf-submissions>${cfValue("submissionsChecked")}</strong></div><div><span>Contests represented</span><strong data-cf-contests>${cfValue("contestsRecent")}</strong></div></div>
      <footer class="platform-card-foot"><p class="leetcode-note" data-cf-note>${hasCfSnapshot ? `Verified API snapshot · ${cfSnapshot.checkedAt} · refreshing live…` : "Fetching current public data…"}</p><button class="coding-refresh" data-refresh="codeforces" aria-label="Refresh Codeforces statistics">↻ Refresh</button></footer>
    </article>`;
}

function configureProfileLinks() {
  providers.forEach(provider => {
    const item = profile.social[provider.key]; const url = safeUrl(item?.url) || (item?.username ? defaultProfileUrl(provider.key, item.username) : "");
    const anchor = $(`[data-profile-link="${provider.key}"]`);
    if (url) { anchor.href = url; anchor.target = "_blank"; anchor.rel = "noopener noreferrer"; }
    else { anchor.hidden = true; }
    if (!item?.username?.trim()) $(`[data-refresh="${provider.key}"]`).hidden = true;
  });
}

function defaultProfileUrl(key, username) {
  const bases = { github: "https://github.com/", leetcode: "https://leetcode.com/u/", codeforces: "https://codeforces.com/profile/" };
  return bases[key] + encodeURIComponent(username.trim());
}
function setMetric(key, value, label) {
  const metric = $(`[data-metric="${key}"]`), caption = $(`[data-metric-label="${key}"]`);
  metric.classList.remove("empty"); metric.textContent = value; caption.textContent = label.toUpperCase();
}
function setLoading(key) { const metric = $(`[data-metric="${key}"]`); metric.classList.add("empty"); metric.innerHTML = `<span class="data-loading"><i class="spinner"></i> Loading public data…</span>`; }
function setError(key) { const metric = $(`[data-metric="${key}"]`); metric.classList.add("empty"); metric.textContent = "Stats unavailable · refresh or open profile"; }
async function fetchJson(url, ms = 8000) {
  const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), ms);
  try { const response = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } }); if (!response.ok) throw new Error(`HTTP ${response.status}`); return await response.json(); }
  finally { clearTimeout(timeout); }
}
async function loadLeetCode() {
  const user = profile.social.leetcode.username.trim(), metric = $("[data-metric='leetcode']"), note = $("[data-lc-note]");
  if (!user) { metric.textContent = "Profile not connected"; metric.classList.add("empty"); note.textContent = "Add a LeetCode username in js/data.js to load public stats."; return; }
  metric.textContent = "Loading public stats…"; metric.classList.add("empty"); note.textContent = "Fetching current profile data…";
  try {
    const raw = await fetchJson(`https://alfa-leetcode-api.onrender.com/${encodeURIComponent(user)}/solved`, 30000);
    const data = raw.data || raw;
    const acceptedByLevel = Array.isArray(data.acSubmissionNum) ? data.acSubmissionNum : [];
    const accepted = level => acceptedByLevel.find(row => String(row.difficulty).toLowerCase() === level)?.count;
    const solvedTotal = Number(data.solvedProblem ?? data.totalSolved ?? accepted("all"));
    if (!Number.isFinite(solvedTotal)) throw new Error("No solved-count field in Alfa API response");
    metric.textContent = solvedTotal.toLocaleString(); metric.classList.remove("empty");
    for (const level of ["easy", "medium", "hard"]) {
      const solved = Number(data[`${level}Solved`] ?? data[`${level}Problem`] ?? accepted(level) ?? 0);
      const ratio = solvedTotal > 0 ? Math.min(100, solved / solvedTotal * 100) : 0;
      $(`[data-level-count="${level}"]`).textContent = solved.toLocaleString();
      $(`[data-level-bar="${level}"]`).style.width = `${ratio}%`;
      $(`[data-level-ratio="${level}"]`).textContent = `${ratio.toFixed(1)}% of solved problems`;
    }
    $("[data-lc-acceptance]").textContent = Number.isFinite(Number(data.acceptanceRate)) ? `${Number(data.acceptanceRate)}%` : "Unavailable";
    $("[data-lc-rank]").textContent = Number.isFinite(Number(data.ranking)) && Number(data.ranking) > 0 ? `#${Number(data.ranking).toLocaleString()}` : "Unavailable";
    note.textContent = `Live solved counts for ${user} · Alfa LeetCode API.`;
  } catch {
    metric.textContent = "Stats unavailable"; metric.classList.add("empty");
    note.textContent = "LeetCode stats could not be fetched. Use the profile link or refresh later.";
    for (const level of ["easy", "medium", "hard"]) $(`[data-level-ratio="${level}"]`).textContent = "Data unavailable";
    $("[data-lc-acceptance]").textContent = "Unavailable"; $("[data-lc-rank]").textContent = "Unavailable";
  }
  try {
    const rawContest = await fetchJson(`https://alfa-leetcode-api.onrender.com/${encodeURIComponent(user)}/contest`, 30000);
    const contest = rawContest.data || rawContest;
    const ranking = contest.userContestRanking || contest.contestRanking || contest;
    const rating = Number(ranking.contestRating ?? ranking.rating);
    const attended = Number(contest.contestAttend ?? contest.attendedContests ?? contest.contestCount ?? contest.contestParticipation?.length);
    const top = Number(ranking.topPercentage ?? contest.topPercentage ?? contest.contestTopPercentage);
    $("[data-lc-rating]").textContent = Number.isFinite(rating) && rating > 0 ? Math.round(rating).toLocaleString() : "Unavailable";
    $("[data-lc-contests]").textContent = Number.isFinite(attended) ? attended.toLocaleString() : "Unavailable";
    $("[data-lc-top]").textContent = Number.isFinite(top) ? `${top}%` : "Unavailable";
  } catch {
    $("[data-lc-rating]").textContent = "Unavailable"; $("[data-lc-contests]").textContent = "Unavailable"; $("[data-lc-top]").textContent = "Unavailable";
  }
}
async function loadCodeforces() {
  const user = profile.social.codeforces.username.trim();
  const rating = $("[data-cf-rating]"), note = $("[data-cf-note]");
  const snapshot = profile.social.codeforces.snapshot;
  const hasSnapshot = snapshot?.username?.toLowerCase() === user.toLowerCase();
  $("[data-cf-handle]").textContent = user || "Not connected";
  if (!user) { rating.textContent = "Unavailable"; note.textContent = "Add a Codeforces handle in js/data.js."; return; }
  if (!hasSnapshot) rating.textContent = "Loading…";
  note.textContent = hasSnapshot ? `Showing verified snapshot from ${snapshot.checkedAt} while fetching live stats…` : "Fetching current public contest data…";
  try {
    const info = await fetchJson(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(user)}`);
    if (info.status !== "OK" || !info.result?.[0]) throw new Error("Profile unavailable");
    const userInfo = info.result[0];
    rating.textContent = Number.isFinite(Number(userInfo.rating)) ? Number(userInfo.rating).toLocaleString() : "Unrated";
    $("[data-cf-max]").textContent = Number.isFinite(Number(userInfo.maxRating)) ? Number(userInfo.maxRating).toLocaleString() : "—";
    $("[data-cf-rank]").textContent = userInfo.rank || "Unrated";
    $("[data-cf-contribution]").textContent = Number.isFinite(Number(userInfo.contribution)) ? Number(userInfo.contribution).toLocaleString() : "Unavailable";
    $("[data-cf-friends]").textContent = Number.isFinite(Number(userInfo.friendOfCount)) ? Number(userInfo.friendOfCount).toLocaleString() : "Unavailable";
    $("[data-cf-registered]").textContent = Number.isFinite(Number(userInfo.registrationTimeSeconds)) ? new Date(Number(userInfo.registrationTimeSeconds) * 1000).getFullYear() : "Unavailable";
    try {
      // Codeforces limits requests to one every two seconds; leave a gap after user.info.
      await new Promise(resolve => setTimeout(resolve, 2100));
      const submissions = await fetchJson(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(user)}&from=1&count=1000`);
      const records = submissions.status === "OK" ? submissions.result : [];
      const contestIds = new Set(records.map(item => item.contestId).filter(Number.isFinite));
      const solved = new Set(records.filter(item => item.verdict === "OK").map(item => `${item.problem?.contestId ?? item.contestId}:${item.problem?.index ?? ""}`));
      $("[data-cf-solved]").textContent = solved.size.toLocaleString();
      $("[data-cf-accepted]").textContent = records.filter(item => item.verdict === "OK").length.toLocaleString();
      $("[data-cf-submissions]").textContent = records.length.toLocaleString();
      $("[data-cf-contests]").textContent = contestIds.size ? `${contestIds.size}+` : "Unavailable";
    } catch {
      $("[data-cf-solved]").textContent = "Unavailable";
      $("[data-cf-accepted]").textContent = "Unavailable";
      $("[data-cf-submissions]").textContent = "Unavailable";
      $("[data-cf-contests]").textContent = "Unavailable";
    }
    note.textContent = `Public Codeforces data for ${user}. Refresh to fetch the latest available stats.`;
  } catch {
    if (!hasSnapshot) rating.textContent = "Stats unavailable";
    note.textContent = hasSnapshot ? `Showing verified snapshot from ${snapshot.checkedAt}; live refresh failed. Use Refresh to try again.` : "Codeforces stats could not be loaded. Use the profile link or refresh later.";
  }
}
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }
function refreshProfile(key) { const provider = providers.find(item => item.key === key); if (provider) provider.load(); }

function observeReveals() {
  if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(el => el.classList.add("is-visible")); return; }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .08 });
  $$(".reveal:not(.is-visible)").forEach(el => observer.observe(el));
}
function initNavigation() {
  const toggle = $(".menu-toggle"), nav = $("#primary-nav");
  toggle.addEventListener("click", () => { const open = toggle.getAttribute("aria-expanded") !== "true"; toggle.setAttribute("aria-expanded", String(open)); toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation"); nav.classList.toggle("open", open); });
  nav.addEventListener("click", event => { if (event.target.closest("a")) { toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open navigation"); nav.classList.remove("open"); } });
  const sections = $$(".primary-nav a[href^='#']").map(link => $(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { $$(".primary-nav a").forEach(link => link.classList.toggle("active", link.hash === `#${entry.target.id}`)); } }), { rootMargin: "-35% 0px -60% 0px" }); sections.forEach(section => observer.observe(section)); }
  const top = $(".scroll-top"); window.addEventListener("scroll", () => top.classList.toggle("visible", window.scrollY > 550), { passive: true }); top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
function initTheme() {
  const button = $(".theme-toggle"), saved = localStorage.getItem("ak-theme");
  if (saved === "light") document.documentElement.dataset.theme = "light";
  const update = () => { const light = document.documentElement.dataset.theme === "light"; button.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme"); button.title = light ? "Switch to dark theme" : "Switch to light theme"; button.querySelector(".theme-icon").textContent = light ? "☾" : "☼"; };
  update(); button.addEventListener("click", () => { const light = document.documentElement.dataset.theme !== "light"; if (light) document.documentElement.dataset.theme = "light"; else delete document.documentElement.dataset.theme; localStorage.setItem("ak-theme", light ? "light" : "dark"); update(); });
}
function initTypewriter() {
  const el = $(".typewrite"); if (!el) return; const phrases = ["software & AI products", "useful web experiences", "ideas into real products"];
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let phrase = 0, pos = phrases[0].length, deleting = true;
  const tick = () => { const current = phrases[phrase]; pos += deleting ? -1 : 1; el.textContent = current.slice(0, pos); let delay = deleting ? 45 : 72; if (pos <= 0) { deleting = false; phrase = (phrase + 1) % phrases.length; delay = 350; } else if (pos >= phrases[phrase].length) { deleting = true; delay = 1900; } setTimeout(tick, delay); };
  setTimeout(tick, 2300);
}
function initContactForm() {
  const form = $("#contact-form"), note = $("#form-note");
  form.addEventListener("submit", event => {
    event.preventDefault(); if (!profile.contactEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.contactEmail)) { note.textContent = "Add a valid email in js/data.js to enable the contact form."; note.style.color = "#e7bd6a"; return; }
    const values = new FormData(form); const subject = String(values.get("subject") || "Portfolio inquiry"); const body = `From: ${values.get("name")} (${values.get("email")})\n\n${values.get("message")}`;
    window.location.href = `mailto:${encodeURIComponent(profile.contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; note.textContent = "Your email app should open with the message drafted.";
  });
}
function initResume() {
  $$('[data-resume-link]').forEach(link => link.href = profile.resumePath);
  fetch(profile.resumePath, { method: "HEAD" }).then(response => { if (!response.ok) throw new Error("Missing"); $("[data-resume-note]").textContent = "PDF ready to open or download."; }).catch(() => { $("[data-resume-note]").textContent = "Add your PDF at assets/resume.pdf."; });
}
function initEvents() {
  $("#project-filters").addEventListener("click", event => { const button = event.target.closest("[data-filter]"); if (button) renderProjects(button.dataset.filter); });
  $("#projects-grid").addEventListener("click", event => { if (event.target.closest("a")) return; const card = event.target.closest("[data-project]"); if (card) openProject(card.dataset.project); });
  $("#projects-grid").addEventListener("keydown", event => { if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-project]")) { event.preventDefault(); openProject(event.target.dataset.project); } });
  $(".dialog-close").addEventListener("click", () => $("#project-dialog").close());
  $("#project-dialog").addEventListener("click", event => { if (event.target === $("#project-dialog")) $("#project-dialog").close(); });
  $("#coding-grid").addEventListener("click", event => { const button = event.target.closest("[data-refresh]"); if (button) refreshProfile(button.dataset.refresh); });
}
function init() {
  applyProfileData(); renderSocials(); renderSkills(); renderProjects(); renderCodingCards(); configureProfileLinks(); observeReveals(); initNavigation(); initTheme(); initTypewriter(); initContactForm(); initResume(); initEvents();
  providers.forEach(provider => provider.load()); $("#current-year").textContent = new Date().getFullYear();
  $("#structured-data").textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: profile.name, jobTitle: "Computer Science Student", alumniOf: `${profile.degree} (${profile.graduationYear})`, url: safeUrl(profile.social.linkedin.url) || safeUrl(profile.social.github.url) || undefined });
}
init();
