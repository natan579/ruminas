// ============================================
// API SERVICE
// ============================================

const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
    // ============================================
    // HELPER METHODS
    // ============================================

    static getToken() {
        return localStorage.getItem('token');
    }

    static setToken(token) {
        localStorage.setItem('token', token);
    }

    static removeToken() {
        localStorage.removeItem('token');
    }

    static getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`
        };
    }

    static async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: this.getHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }

        return data;
    }

    // ============================================
    // AUTHENTICATION
    // ============================================

    static async signup(username, email, password, confirmPassword) {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, confirmPassword })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Signup failed');
        }

        this.setToken(data.token);
        return data.user;
    }

    static async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        this.setToken(data.token);
        return data.user;
    }

    static async verifyToken() {
        try {
            return await this.request('/auth/verify');
        } catch (error) {
            this.removeToken();
            throw error;
        }
    }

    static logout() {
        this.removeToken();
    }

    // ============================================
    // TODOS
    // ============================================

    static async getTodos(filter = 'all') {
        return await this.request(`/todos?filter=${filter}`);
    }

    static async createTodo(text, priority = 'medium') {
        return await this.request('/todos', {
            method: 'POST',
            body: JSON.stringify({ text, priority })
        });
    }

    static async updateTodo(id, updates) {
        return await this.request(`/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    }

    static async deleteTodo(id) {
        return await this.request(`/todos/${id}`, {
            method: 'DELETE'
        });
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiService;
}