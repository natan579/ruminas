# 😂 Joke Generator Application

A fun and interactive web application that generates random jokes using the JokeAPI. Get a laugh with jokes from multiple categories!

## ✨ Features

### Core Functionality
- 🎭 **Random Jokes**: Get jokes from multiple categories
- 📂 **Multiple Categories**: General, Programming, Knock-Knock jokes
- 📝 **Joke Types**: Single-liner or two-part jokes
- ❤️ **Favorites**: Save your favorite jokes locally
- 📋 **Copy Jokes**: Copy jokes to clipboard
- 📤 **Share**: Share jokes via share API or copy
- 📊 **Statistics**: Track how many jokes you've seen

### User Interface
- 🎨 **Modern Design**: Beautiful gradient design with smooth animations
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- ⚡ **Smooth Animations**: Fade, slide, and spin effects
- 🔄 **Real-time Updates**: Live stats and category selection
- 🎲 **Random Category**: Get surprised with random joke categories

## 📚 API Used

**JokeAPI (v2)** - https://jokeapi.dev/

Free, public API for random jokes with multiple categories and no authentication required.

## 🚀 Getting Started

### Option 1: Online (Quickest)
Just open `joke-generator/index.html` in any modern browser!

### Option 2: Download Files
1. Download all files from the repository
2. Extract to a folder
3. Open `joke-generator/index.html` in your browser
4. Start generating jokes!

## 📂 Project Structure

```
joke-generator/
├── index.html          # Main HTML file
├── styles/
│   └── style.css       # All styling
├── js/
│   ├── api.js          # JokeAPI service
│   └── app.js          # Application logic
└── README.md           # This file
```

## 🎯 How to Use

### Get Jokes
1. Click **"🎭 Get a Joke"** to load a random joke
2. Choose a category (General, Programming, Knock-Knock, All)
3. Select joke type (Single, Two-Part, Both)
4. Click the button again for a new joke

### Manage Jokes
- **Copy**: Click **"📋 Copy Joke"** to copy to clipboard
- **Share**: Click **"📤 Share"** to share with others
- **Favorites**: Click **"❤️ View Favorites"** to see saved jokes
- **Random Category**: Click **"🎲 Random Category"** for surprise

### Save Favorites
- Click the favorites button to see all saved jokes
- View saved jokes with timestamps
- Remove individual jokes or clear all
- All favorites are saved to browser storage

## 🎨 Categories

- **Any**: Random joke from all categories
- **General**: Clean, general audience jokes
- **Programming**: Tech and programming jokes
- **Knock-Knock**: Classic knock-knock jokes

## 📊 Joke Types

- **Single**: One-liner jokes
- **Two-Part**: Setup and delivery format
- **Both**: Mix of both types

## 💾 Local Storage

Your favorite jokes are saved in your browser's local storage:
- Persists across browser sessions
- No account needed
- 5MB storage limit (plenty for jokes!)
- Can be cleared anytime

## 🔌 API Information

### Endpoint
```
https://v2.jokeapi.dev/joke/{category}
```

### Categories
- `Any` - All categories
- `General` - General jokes
- `Programming` - Programming jokes
- `Knock-Knock` - Knock-knock jokes

### Type Parameter
- `single` - Single-liner jokes
- `twopart` - Two-part jokes
- `any` - Both types

## 🎓 Code Highlights

### JokeAPI Service
```javascript
const jokeAPI = new JokeAPI();
const joke = await jokeAPI.getRandomJoke('General', 'single');
```

### Favorites Management
```javascript
app.toggleFavorite(joke);
app.saveFavorites();
app.loadFavorites();
```

### Copy to Clipboard
```javascript
navigator.clipboard.writeText(jokeText);
```

## 📱 Responsive Design

- **Desktop**: Full layout with all features visible
- **Tablet (≤ 600px)**: Adjusted spacing and single-column buttons
- **Mobile (≤ 400px)**: Optimized for small screens

## 🎯 Technologies

- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, Animations
- **JavaScript (ES6+)**: Classes, Async/Await, Arrow Functions
- **Fetch API**: External API calls
- **Local Storage API**: Data persistence

## 🚀 Future Enhancements

- [ ] Search jokes by keyword
- [ ] Category filters with tags
- [ ] Export favorites as JSON
- [ ] Dark mode theme
- [ ] Joke of the day
- [ ] Rate jokes (thumbs up/down)
- [ ] Share to social media
- [ ] Custom joke submission
- [ ] Multiple languages
- [ ] Offline mode with cached jokes

## 🐛 Troubleshooting

### Jokes not loading?
- Check your internet connection
- The JokeAPI might be temporarily down
- Try refreshing the page
- Try a different category

### Favorites not saving?
- Check if browser storage is enabled
- Clear browser cache and try again
- Check browser privacy settings

### Share button not working?
- Share API only works on HTTPS or localhost
- Fallback to copy feature
- Not all browsers support share API

## 📄 License

This project is open source and free to use. The JokeAPI is also free and public.

## 🙏 Credits

- **JokeAPI**: https://jokeapi.dev/
- Built with HTML, CSS, and JavaScript

---

**Ready to laugh? Start generating jokes now! 😂**

For more information visit: https://jokeapi.dev/