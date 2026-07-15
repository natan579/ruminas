// ============================================
// JOKE GENERATOR APP
// ============================================

class JokeApp {
    constructor() {
        // DOM Elements
        this.jokeText = document.getElementById('jokeText');
        this.jokeSetup = document.getElementById('jokeSetup');
        this.jokeDelivery = document.getElementById('jokeDelivery');
        this.getJokeBtn = document.getElementById('getJokeBtn');
        this.getRandomCategoryBtn = document.getElementById('getRandomCategoryBtn');
        this.copyJokeBtn = document.getElementById('copyJokeBtn');
        this.shareJokeBtn = document.getElementById('shareJokeBtn');
        this.favoritesBtn = document.getElementById('favoritesBtn');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.errorMessage = document.getElementById('errorMessage');
        this.categoryBtns = document.querySelectorAll('.category-btn');
        this.typeRadios = document.querySelectorAll('input[name="jokeType"]');
        this.jokeCount = document.getElementById('jokeCount');
        this.currentCategory = document.getElementById('currentCategory');
        this.modal = document.getElementById('favoritesModal');
        this.closeModalBtns = document.querySelectorAll('#closeModalBtn, #closeModalBtn2');
        this.clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
        this.favoritesList = document.getElementById('favoritesList');
        this.noFavoritesMsg = document.getElementById('noFavoritesMsg');
        this.toast = document.getElementById('toast');

        // State
        this.currentJoke = null;
        this.jokesCount = 0;
        this.selectedCategory = 'Any';
        this.selectedType = 'any';
        this.favorites = this.loadFavorites();

        // Initialize
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.loadJoke();
    }

    attachEventListeners() {
        // Main buttons
        this.getJokeBtn.addEventListener('click', () => this.loadJoke());
        this.getRandomCategoryBtn.addEventListener('click', () => this.getRandomCategory());
        this.copyJokeBtn.addEventListener('click', () => this.copyJoke());
        this.shareJokeBtn.addEventListener('click', () => this.shareJoke());
        this.favoritesBtn.addEventListener('click', () => this.showFavorites());

        // Category buttons
        this.categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.selectCategory(e.target));
        });

        // Type radios
        this.typeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.selectedType = radio.value;
            });
        });

        // Modal
        this.closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => this.hideModal());
        });
        this.clearFavoritesBtn.addEventListener('click', () => this.clearAllFavorites());

        // Close modal on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
    }

    // ============================================
    // LOAD JOKE
    // ============================================

    async loadJoke() {
        try {
            this.showLoading(true);
            this.clearError();
            this.jokeText.textContent = '';
            this.jokeSetup.style.display = 'none';
            this.jokeDelivery.style.display = 'none';

            const joke = await jokeAPI.getRandomJoke(this.selectedCategory, this.selectedType);
            this.currentJoke = joke;
            this.jokesCount++;
            this.jokeCount.textContent = this.jokesCount;

            this.displayJoke(joke);
            this.showLoading(false);
        } catch (error) {
            this.showError(error.message || 'Failed to load joke. Please try again.');
            this.showLoading(false);
        }
    }

    displayJoke(joke) {
        if (joke.type === 'twopart') {
            this.jokeSetup.textContent = joke.setup;
            this.jokeDelivery.textContent = joke.delivery;
            this.jokeSetup.style.display = 'block';
            this.jokeDelivery.style.display = 'block';
            this.jokeText.textContent = '';
        } else {
            this.jokeText.textContent = joke.joke;
            this.jokeSetup.style.display = 'none';
            this.jokeDelivery.style.display = 'none';
        }
    }

    // ============================================
    // CATEGORY MANAGEMENT
    // ============================================

    selectCategory(btn) {
        this.categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.selectedCategory = btn.dataset.category;
        const categoryMap = {
            'all': 'Any',
            'general': 'General',
            'programming': 'Programming',
            'knock-knock': 'Knock-Knock'
        };
        this.currentCategory.textContent = categoryMap[this.selectedCategory] || 'Any';
        this.loadJoke();
    }

    getRandomCategory() {
        const categories = ['Any', 'General', 'Programming', 'Knock-Knock'];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const btn = Array.from(this.categoryBtns).find(b => 
            b.dataset.category === randomCategory.toLowerCase().replace(' ', '-')
        );
        if (btn) {
            this.selectCategory(btn);
        }
    }

    // ============================================
    // COPY JOKE
    // ============================================

    copyJoke() {
        if (!this.currentJoke) return;

        const text = this.getJokeText();
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Joke copied to clipboard!');
        }).catch(() => {
            this.showToast('Failed to copy', 'error');
        });
    }

    getJokeText() {
        if (this.currentJoke.type === 'twopart') {
            return `${this.currentJoke.setup}\n${this.currentJoke.delivery}`;
        }
        return this.currentJoke.joke;
    }

    // ============================================
    // SHARE JOKE
    // ============================================

    shareJoke() {
        if (!this.currentJoke) return;

        const text = this.getJokeText();
        const title = '😂 Check out this joke!';

        if (navigator.share) {
            navigator.share({
                title: title,
                text: text
            }).catch((err) => console.log('Share failed:', err));
        } else {
            // Fallback: copy to clipboard
            this.copyJoke();
        }
    }

    // ============================================
    // FAVORITES MANAGEMENT
    // ============================================

    toggleFavorite(joke = this.currentJoke) {
        if (!joke) return;

        const jokeText = this.getJokeText();
        const exists = this.favorites.find(fav => fav.text === jokeText);

        if (exists) {
            this.favorites = this.favorites.filter(fav => fav.text !== jokeText);
            this.showToast('Removed from favorites');
        } else {
            this.favorites.push({
                text: jokeText,
                type: joke.type,
                category: joke.category,
                addedAt: new Date().toISOString()
            });
            this.showToast('Added to favorites! ❤️');
        }

        this.saveFavorites();
    }

    saveFavorites() {
        localStorage.setItem('jokeFavorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const stored = localStorage.getItem('jokeFavorites');
        return stored ? JSON.parse(stored) : [];
    }

    showFavorites() {
        this.favoritesList.innerHTML = '';

        if (this.favorites.length === 0) {
            this.noFavoritesMsg.style.display = 'block';
            this.favoritesList.style.display = 'none';
        } else {
            this.noFavoritesMsg.style.display = 'none';
            this.favoritesList.style.display = 'block';

            this.favorites.forEach((fav, index) => {
                const item = document.createElement('div');
                item.className = 'favorite-item';
                item.innerHTML = `
                    <div class="favorite-text">${this.escapeHtml(fav.text)}</div>
                    <div class="favorite-actions">
                        <button class="favorite-btn favorite-copy" onclick="jokeApp.copyFavoriteText('${index}')">Copy</button>
                        <button class="favorite-btn favorite-remove" onclick="jokeApp.removeFavorite(${index})">Remove</button>
                    </div>
                `;
                this.favoritesList.appendChild(item);
            });
        }

        this.modal.classList.add('show');
    }

    copyFavoriteText(index) {
        const fav = this.favorites[index];
        navigator.clipboard.writeText(fav.text).then(() => {
            this.showToast('Copied to clipboard!');
        });
    }

    removeFavorite(index) {
        this.favorites.splice(index, 1);
        this.saveFavorites();
        this.showFavorites();
        this.showToast('Removed from favorites');
    }

    clearAllFavorites() {
        if (confirm('Are you sure you want to clear all favorites?')) {
            this.favorites = [];
            this.saveFavorites();
            this.showFavorites();
            this.showToast('All favorites cleared');
        }
    }

    // ============================================
    // MODAL MANAGEMENT
    // ============================================

    hideModal() {
        this.modal.classList.remove('show');
    }

    // ============================================
    // UI HELPERS
    // ============================================

    showLoading(show) {
        this.loadingSpinner.style.display = show ? 'block' : 'none';
        this.getJokeBtn.disabled = show;
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
    }

    clearError() {
        this.errorMessage.style.display = 'none';
        this.errorMessage.textContent = '';
    }

    showToast(message, type = 'success') {
        this.toast.textContent = message;
        this.toast.style.background = type === 'error' ? '#f44336' : '#4caf50';
        this.toast.classList.add('show');

        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ============================================
// INITIALIZE APP
// ============================================

let jokeApp;

document.addEventListener('DOMContentLoaded', () => {
    jokeApp = new JokeApp();
});