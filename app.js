(async function(){
  const grid = document.getElementById('templates-grid');
  try {
    const res = await fetch('./templates.json', { cache: 'no-store' });
    const templates = await res.json();

    const tpl = (t) => {
      const color = t.color || '#2563EB';
      const features = (t.features || []).slice(0, 3).join(' • ');
      const hasReplit = t.replitUrl && t.replitUrl.length > 4;

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
          <a class="btn small" href="./preview.html?id=${encodeURIComponent(t.id)}">View Template</a>
          ${
            hasReplit
              ? `<a class="btn small btn-primary" href="${t.replitUrl}" target="_blank" rel="noopener">Fork on Replit</a>`
              : `<button class="btn small" disabled title="Admin hasn't set Replit link yet">Fork on Replit</button>`
          }
          <a class="btn small" href="./${t.folder}/README.md" target="_blank" rel="noopener">README</a>
        </div>
      `;
      return card;
    };

    templates.forEach(t => grid.appendChild(tpl(t)));
  } catch (e) {
    grid.innerHTML = `<div class="card"><strong>Couldn't load templates.</strong><p>Make sure <code>templates.json</code> exists at project root.</p></div>`;
    console.error(e);
  }
})();
