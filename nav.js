document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
    });
  }

  // Combined Login/Register modal functionality
  const authModal = document.getElementById('auth-modal');
  const authClose = document.getElementById('auth-close');
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginFormContainer = document.getElementById('login-form-container');
  const registerFormContainer = document.getElementById('register-form-container');

  // Show modal when login or register links clicked
  document.querySelectorAll('.btn-auth').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      authModal.style.display = 'block';
      if (link.textContent.toLowerCase() === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginFormContainer.style.display = 'block';
        registerFormContainer.style.display = 'none';
      } else if (link.textContent.toLowerCase() === 'register') {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerFormContainer.style.display = 'block';
        loginFormContainer.style.display = 'none';
      }
    });
  });

  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginFormContainer.style.display = 'block';
    registerFormContainer.style.display = 'none';
  });

  registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerFormContainer.style.display = 'block';
    loginFormContainer.style.display = 'none';
  });

  authClose.addEventListener('click', () => {
    authModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === authModal) {
      authModal.style.display = 'none';
    }
  });
});
