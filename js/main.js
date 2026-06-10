// ─ Scroll reveal ─
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.07, rootMargin: '0px 0px -28px 0px' });
document.querySelectorAll('.r,.rl,.rr').forEach(el => obs.observe(el));

// ─ FAQ ─
document.querySelectorAll('.faq-p').forEach(panel => {
  panel.setAttribute('aria-hidden', 'true');
});

document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      const p = document.getElementById(b.getAttribute('aria-controls'));
      p.style.maxHeight = '0';
      p.setAttribute('aria-hidden', 'true');
    });

    if (!open) {
      btn.setAttribute('aria-expanded', 'true');
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      panel.style.maxHeight = panel.scrollHeight + 'px';
      panel.removeAttribute('aria-hidden');
    }
  });
});

// ─ Phone mask ─
const tel = document.getElementById('f-tel');
if (tel) {
  tel.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    v = v.length <= 10
      ? v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
      : v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    e.target.value = v.replace(/-$/, '');
  });
}

// ─ Form validation + submit ─
const form = document.getElementById('cForm');
const fBtn = document.getElementById('fBtn');

function setError(inputId, msg) {
  const input = document.getElementById(inputId);
  const errEl = document.getElementById(inputId + '-err');
  if (!input || !errEl) return;
  input.classList.add('err');
  input.setAttribute('aria-invalid', 'true');
  errEl.textContent = msg;
}

function clearErrors() {
  document.querySelectorAll('.fi').forEach(el => {
    el.classList.remove('err');
    el.setAttribute('aria-invalid', 'false');
  });
  document.querySelectorAll('.f-err').forEach(el => { el.textContent = ''; });
}

function validate() {
  clearErrors();
  let valid = true;
  const nome  = document.getElementById('f-nome');
  const email = document.getElementById('f-email');

  if (!nome.value.trim()) {
    setError('f-nome', 'Por favor, informe seu nome.');
    valid = false;
  }

  if (!email.value.trim()) {
    setError('f-email', 'Por favor, informe seu e-mail.');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    setError('f-email', 'E-mail inválido. Verifique e tente novamente.');
    valid = false;
  }

  if (!valid) {
    const firstErr = form.querySelector('.fi.err');
    if (firstErr) firstErr.focus();
  }

  return valid;
}

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    fBtn.textContent = 'Mensagem enviada';
    fBtn.classList.add('sent');
    fBtn.disabled = true;

    // TODO: integrar com Formspree — altere action="https://formspree.io/f/SEU_ID"
  });
}
