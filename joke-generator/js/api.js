// ============================================
// JOKE API SERVICE
// ============================================

class JokeAPI {
    constructor() {
        this.baseUrl = 'https://v2.jokeapi.dev/joke';
        this.cache = {};
    }

    // ============================================
    // GET RANDOM JOKE
    // ============================================

    async getRandomJoke(category = 'Any', type = 'any') {
        try {
            const url = this.buildUrl(category, type);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch joke');
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.message || 'Error getting joke');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    // ============================================
    // BUILD URL WITH PARAMETERS
    // ============================================

    buildUrl(category = 'Any', type = 'any') {
        let url = `${this.baseUrl}/${category}`;

        const params = new URLSearchParams();
        params.append('format', 'json');

        if (type !== 'all' && type !== 'any') {
            params.append('type', type);
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        return url;
    }

    // ============================================
    // GET AVAILABLE CATEGORIES
    // ============================================

    getCategories() {
        return ['Any', 'General', 'Programming', 'Knock-Knock'];
    }
}

// Create global instance
const jokeAPI = new JokeAPI();