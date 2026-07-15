// ============================================
// AUTHENTICATION PAGES
// ============================================

class AuthPage {
    constructor() {
        this.isSignup = window.location.pathname.includes('signup.html');
        this.init();
    }

    init() {
        const form = this.isSignup 
            ? document.getElementById('signupForm') 
            : document.getElementById('loginForm');

        form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.clearMessages();

        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            let user;
            if (this.isSignup) {
                user = await ApiService.signup(
                    data.username,
                    data.email,
                    data.password,
                    data.confirmPassword
                );
                this.showSuccess('Account created! Redirecting...');
            } else {
                user = await ApiService.login(data.email, data.password);
                this.showSuccess('Login successful! Redirecting...');
            }

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } catch (error) {
            this.showError(error.message);
        }
    }

    showError(message) {
        const errorEl = document.getElementById('errorMessage');
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }

    showSuccess(message) {
        const successEl = document.getElementById('successMessage');
        successEl.textContent = message;
        successEl.classList.add('show');
    }

    clearMessages() {
        document.getElementById('errorMessage').classList.remove('show');
        document.getElementById('successMessage').classList.remove('show');
    }
}

// Initialize auth page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('loginForm') || document.getElementById('signupForm')) {
        new AuthPage();
    }
});