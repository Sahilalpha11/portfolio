// ===== Portfolio App — Renders data.json into the page =====

document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      renderHero(data);
      renderAbout(data);
      renderSkills(data.skills);
      renderExperience(data.experience);
      renderEducation(data.education);
      renderProjects(data.projects);
      renderCertificates(data.certificates);
      renderContact(data);
      renderFooter(data);
      setupNav(data);
      initAnimations();
      initBackToTop();
      initMobileMenu();
      initNavHighlight();
    })
    .catch(err => console.error('Failed to load data.json:', err));
});

// ===== Icon Map (inline SVG paths) =====
const icons = {
  github: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
  linkedin: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  email: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
  phone: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>',
  location: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  download: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
  external: '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>',
  code: '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
  print: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>',
  briefcase: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
  academic: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>',
  cert: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>',
  arrow_up: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>'
};

// Sanitize text to prevent XSS
function esc(str) {
  const el = document.createElement('span');
  el.textContent = str || '';
  return el.innerHTML;
}

// ===== HERO =====
function renderHero(d) {
  document.getElementById('hero').innerHTML = `
    <div class="hero-glow"></div>
    <div class="relative z-10 text-center">
      <div class="mb-4">
        <div class="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-blue-500/25">
          ${esc(d.name.split(' ').map(w => w[0]).join(''))}
        </div>
      </div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3">
        ${esc(d.name)}
      </h1>
      <p class="text-xl sm:text-2xl gradient-text font-semibold mb-4">${esc(d.title)}</p>
      <p class="text-slate-400 max-w-2xl mx-auto mb-8 text-base sm:text-lg leading-relaxed">${esc(d.tagline)}</p>
      <div class="flex flex-wrap justify-center gap-3">
        <a href="${esc(d.resumeFile)}" download class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/25">
          ${icons.download} Download CV
        </a>
        <button onclick="window.print()" class="no-print inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          ${icons.print} Print
        </button>
        <a href="${esc(d.github)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-lg transition-colors border border-slate-700">
          ${icons.github} GitHub
        </a>
        <a href="${esc(d.linkedin)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-lg transition-colors border border-slate-700">
          ${icons.linkedin} LinkedIn
        </a>
      </div>
    </div>
  `;
}

// ===== ABOUT =====
function renderAbout(d) {
  document.getElementById('about-content').innerHTML = `
    <p class="text-slate-300 text-lg leading-relaxed">${esc(d.about)}</p>
    <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="flex items-center gap-3 text-slate-400">
        ${icons.location}
        <span>${esc(d.location)}</span>
      </div>
      <div class="flex items-center gap-3 text-slate-400">
        ${icons.email}
        <a href="mailto:${esc(d.email)}" class="hover:text-blue-400 transition-colors">${esc(d.email)}</a>
      </div>
      <div class="flex items-center gap-3 text-slate-400">
        ${icons.phone}
        <a href="tel:${esc(d.phone)}" class="hover:text-blue-400 transition-colors">${esc(d.phone)}</a>
      </div>
    </div>
  `;
}

// ===== SKILLS =====
function renderSkills(skills) {
  const container = document.getElementById('skills-content');
  let html = '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">';
  for (const [category, items] of Object.entries(skills)) {
    html += `
      <div class="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
        <h3 class="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">${esc(category)}</h3>
        <div class="flex flex-wrap gap-2">
          ${items.map(s => `<span class="skill-pill bg-slate-700/70 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-600/50 cursor-default">${esc(s)}</span>`).join('')}
        </div>
      </div>
    `;
  }
  html += '</div>';
  container.innerHTML = html;
}

// ===== EXPERIENCE =====
function renderExperience(experience) {
  const container = document.getElementById('experience-content');
  let html = '<div class="space-y-8">';
  experience.forEach((exp, i) => {
    html += `
      <div class="fade-in relative pl-8">
        ${i < experience.length - 1 ? '<div class="timeline-line"></div>' : ''}
        <div class="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 border-4 border-slate-900 z-10"></div>
        <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <div>
              <h3 class="text-lg font-semibold text-white">${esc(exp.role)}</h3>
              <p class="text-blue-400 font-medium">${esc(exp.company)}</p>
            </div>
            <span class="text-sm text-slate-400 mt-1 sm:mt-0 bg-slate-700/50 px-3 py-1 rounded-full">${esc(exp.period)}</span>
          </div>
          <ul class="space-y-2">
            ${exp.highlights.map(h => `
              <li class="flex items-start gap-2 text-slate-300 text-sm">
                <span class="text-blue-500 mt-1.5 flex-shrink-0">▹</span>
                <span>${esc(h)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

// ===== EDUCATION =====
function renderEducation(education) {
  const container = document.getElementById('education-content');
  let html = '<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 stagger-children">';
  education.forEach(edu => {
    html += `
      <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <div class="flex items-start gap-4">
          <div class="p-2 bg-blue-600/20 rounded-lg text-blue-400 flex-shrink-0">
            ${icons.academic}
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white">${esc(edu.degree)}</h3>
            <p class="text-blue-400 text-sm font-medium">${esc(edu.institution)}</p>
            <p class="text-slate-400 text-sm mt-1">${esc(edu.period)} · ${esc(edu.location)}</p>
            <p class="text-emerald-400 text-sm font-semibold mt-2">Score: ${esc(edu.score)}</p>
          </div>
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

// ===== PROJECTS =====
function renderProjects(projects) {
  const container = document.getElementById('projects-content');
  let html = '<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-children">';
  projects.forEach(p => {
    html += `
      <div class="project-card bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 flex flex-col">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-white mb-2">${esc(p.name)}</h3>
          <p class="text-slate-400 text-sm mb-4">${esc(p.description)}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            ${p.techStack.map(t => `<span class="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20">${esc(t)}</span>`).join('')}
          </div>
          <ul class="space-y-1.5 mb-5">
            ${p.highlights.map(h => `
              <li class="flex items-start gap-2 text-slate-300 text-sm">
                <span class="text-blue-500 mt-1 flex-shrink-0">▹</span>
                <span>${esc(h)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        <div class="flex gap-3 pt-4 border-t border-slate-700/50">
          ${p.repoUrl ? `<a href="${esc(p.repoUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">${icons.code} Source Code</a>` : ''}
          ${p.liveUrl ? `<a href="${esc(p.liveUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">${icons.external} Live Demo</a>` : '<span class="inline-flex items-center gap-2 text-slate-500 text-sm px-4 py-2">No live demo yet</span>'}
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

// ===== CERTIFICATES =====
function renderCertificates(certs) {
  const container = document.getElementById('certificates-content');
  let html = '<div class="flex flex-wrap gap-4 stagger-children">';
  certs.forEach(c => {
    html += `
      <div class="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 flex items-center gap-4">
        <div class="p-2 bg-emerald-600/20 rounded-lg text-emerald-400 flex-shrink-0">
          ${icons.cert}
        </div>
        <div>
          <h3 class="text-white font-medium">${esc(c.name)}</h3>
          <p class="text-slate-400 text-sm">${esc(c.issuer)}</p>
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

// ===== CONTACT =====
function renderContact(d) {
  document.getElementById('contact-content').innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
      <a href="mailto:${esc(d.email)}" class="group flex items-center gap-4 bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-blue-500/50 transition-colors">
        <div class="p-3 bg-blue-600/20 rounded-lg text-blue-400 group-hover:bg-blue-600/30 transition-colors">${icons.email}</div>
        <div>
          <p class="text-xs text-slate-400 uppercase tracking-wider">Email</p>
          <p class="text-white text-sm font-medium">${esc(d.email)}</p>
        </div>
      </a>
      <a href="tel:${esc(d.phone)}" class="group flex items-center gap-4 bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-blue-500/50 transition-colors">
        <div class="p-3 bg-blue-600/20 rounded-lg text-blue-400 group-hover:bg-blue-600/30 transition-colors">${icons.phone}</div>
        <div>
          <p class="text-xs text-slate-400 uppercase tracking-wider">Phone</p>
          <p class="text-white text-sm font-medium">${esc(d.phone)}</p>
        </div>
      </a>
      <a href="${esc(d.linkedin)}" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-4 bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-blue-500/50 transition-colors">
        <div class="p-3 bg-blue-600/20 rounded-lg text-blue-400 group-hover:bg-blue-600/30 transition-colors">${icons.linkedin}</div>
        <div>
          <p class="text-xs text-slate-400 uppercase tracking-wider">LinkedIn</p>
          <p class="text-white text-sm font-medium">Sahil Singh</p>
        </div>
      </a>
      <a href="${esc(d.github)}" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-4 bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-blue-500/50 transition-colors">
        <div class="p-3 bg-blue-600/20 rounded-lg text-blue-400 group-hover:bg-blue-600/30 transition-colors">${icons.github}</div>
        <div>
          <p class="text-xs text-slate-400 uppercase tracking-wider">GitHub</p>
          <p class="text-white text-sm font-medium">Sahilalpha11</p>
        </div>
      </a>
    </div>
  `;
}

// ===== FOOTER =====
function renderFooter(d) {
  document.getElementById('footer').innerHTML = `
    <div class="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-slate-400 text-sm">&copy; ${new Date().getFullYear()} ${esc(d.name)}. All rights reserved.</p>
      <div class="flex items-center gap-4">
        <a href="${esc(d.github)}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-white transition-colors">${icons.github}</a>
        <a href="${esc(d.linkedin)}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-white transition-colors">${icons.linkedin}</a>
        <a href="mailto:${esc(d.email)}" class="text-slate-400 hover:text-white transition-colors">${icons.email}</a>
      </div>
    </div>
  `;
}

// ===== NAVBAR =====
function setupNav(d) {
  document.getElementById('nav-name').textContent = d.name.split(' ')[0];
  document.getElementById('nav-download').href = d.resumeFile;
}

// ===== Scroll Animations (IntersectionObserver) =====
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in, .stagger-children').forEach(el => observer.observe(el));
}

// ===== Back to Top =====
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('opacity-0', window.scrollY < 400);
    btn.classList.toggle('pointer-events-none', window.scrollY < 400);
    btn.classList.toggle('opacity-100', window.scrollY >= 400);
    btn.classList.toggle('pointer-events-auto', window.scrollY >= 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== Mobile Menu =====
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');

  function toggleMenu() {
    menu.classList.toggle('open');
    overlay.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  }

  btn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', toggleMenu));
}

// ===== Active Nav Highlight =====
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });
}
