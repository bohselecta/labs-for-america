(async function(){
  // Hamburger menu functionality
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    }
  });
  
  // Close menu when clicking nav links
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    }
  });

  // Template loading
  const grid = document.getElementById('templates-grid');
  try {
    const res = await fetch('./templates.json', { cache: 'no-store' });
    const templates = await res.json();

    const tpl = (t) => {
      try {
        const color = t.color || '#2563EB';
        const features = (t.features || []).slice(0, 3).join(' • ');
        const hasGithubPages = t.githubPagesUrl && t.githubPagesUrl.length > 4;
        const previewUrl = `./static-previews/${t.id}-preview.html`;

        console.log('Template:', t.id, 'Preview URL:', previewUrl);

        const card = document.createElement('article');
        card.className = 'card';
        card.setAttribute('id', `template-${t.id}`);
        card.innerHTML = `
          <div class="template-head">
            <span class="dot" style="background:${color}"></span>
            <h3 style="margin:0">${t.title}</h3>
          </div>
          <p class="lead" style="margin:4px 0 10px">${t.tagline}</p>
          <p style="color:#475569">${t.description}</p>
          <p style="margin-top:8px;color:#64748b;font-size:14px">${features}</p>
          <div class="template-actions">
            <a class="btn small" href="${previewUrl}" target="_blank" rel="noopener">View Template</a>
            ${
              hasGithubPages
                ? `<a class="btn small btn-primary" href="${t.githubPagesUrl}" target="_blank" rel="noopener">🚀 Deploy to GitHub Pages</a>`
                : `<button class="btn small" disabled title="GitHub Pages deployment not configured">Deploy to GitHub Pages</button>`
            }
            <a class="btn small" href="./${t.folder}/README.md" target="_blank" rel="noopener">README</a>
          </div>
        `;
        return card;
      } catch (error) {
        console.error('Error creating template card for:', t, error);
        return document.createElement('div'); // Return empty div on error
      }
    };

    templates.forEach(t => {
      console.log('Creating card for template:', t.id, 'with URL:', `./static-previews/${t.id}-preview.html`);
      grid.appendChild(tpl(t));
    });
  } catch (e) {
    grid.innerHTML = `<div class="card"><strong>Couldn't load templates.</strong><p>Make sure <code>templates.json</code> exists at project root.</p></div>`;
    console.error(e);
  }
})();
