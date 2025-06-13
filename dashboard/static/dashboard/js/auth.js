// Password visibility toggle
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const icon = this.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });
  
  // Password strength indicator
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      const strengthBars = document.querySelectorAll('.strength-bar');
      const strengthText = document.querySelector('.strength-text');
      const password = this.value;
      
      // Reset
      strengthBars.forEach(bar => bar.style.backgroundColor = '#eee');
      
      // Very weak
      if (password.length > 0 && password.length < 4) {
        strengthBars[0].style.backgroundColor = '#FF4136';
        strengthText.textContent = 'Very weak';
      }
      // Weak
      else if (password.length >= 4 && password.length < 8) {
        strengthBars[0].style.backgroundColor = '#FF851B';
        strengthBars[1].style.backgroundColor = '#FF851B';
        strengthText.textContent = 'Weak';
      }
      // Medium
      else if (password.length >= 8 && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strengthBars[0].style.backgroundColor = '#FFDC00';
        strengthBars[1].style.backgroundColor = '#FFDC00';
        strengthBars[2].style.backgroundColor = '#FFDC00';
        strengthText.textContent = 'Medium';
      }
      // Strong
      else if (password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strengthBars[0].style.backgroundColor = '#2ECC40';
        strengthBars[1].style.backgroundColor = '#2ECC40';
        strengthBars[2].style.backgroundColor = '#2ECC40';
        strengthText.textContent = 'Strong';
      }
      // Empty
      else {
        strengthText.textContent = 'Password strength';
      }
    });
  }
  
  // Form validation
  document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Check if passwords match (for register form)
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirm-password');
      
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        alert('Passwords do not match!');
        return;
      }
      
      // Form is valid - proceed with submission
      alert('Form submitted successfully!');
      // In real implementation, you would send data to server here
    });
  });