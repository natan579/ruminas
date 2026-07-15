# To-Do List Application

A feature-rich to-do list application with local storage functionality, built with vanilla HTML, CSS, and JavaScript.

## 🎯 Features

### Core Functionality
- ✅ **Add Tasks**: Create new tasks with a simple input form
- ✏️ **Edit Tasks**: Modify existing tasks inline
- 🗑️ **Delete Tasks**: Remove individual tasks
- ✓ **Mark Complete**: Check off completed tasks
- 🎨 **Priority Levels**: Set task priority (Low, Medium, High)
- 💾 **Local Storage**: All tasks persist between browser sessions

### Filtering & Organization
- 📊 **Filter Options**: View All, Active, or Completed tasks
- 📈 **Statistics**: Real-time count of total, active, and completed tasks
- 🎯 **Empty State**: Friendly message when no tasks are visible

### User Interface
- 🎨 **Modern Design**: Gradient backgrounds and smooth animations
- 📱 **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Smooth Animations**: Slide-in and fade effects for task operations
- 🔔 **Notifications**: Toast messages for all actions
- ⚠️ **Confirmation Dialogs**: Confirm before deleting all tasks

### Bulk Actions
- 🧹 **Clear Completed**: Delete all finished tasks at once
- 🗑️ **Clear All**: Remove all tasks with confirmation

## 📂 Project Structure

```
todo-app/
├── index.html          # Main HTML file
├── styles/
│   └── style.css       # All styling (CSS Grid, Flexbox, Animations)
├── js/
│   └── script.js       # Application logic (TodoApp class)
└── README.md           # This file
```

## 🚀 How to Use

1. **Open the app**: Open `todo-app/index.html` in your browser
2. **Add a task**: 
   - Type in the input field
   - Click "Add Task" or press Enter
3. **Manage tasks**:
   - Check the checkbox to mark complete
   - Click ✏️ to edit a task
   - Click 🗑️ to delete a task
4. **Filter tasks**: Use the filter buttons to show All, Active, or Completed
5. **Bulk actions**: 
   - Click "Clear Completed" to remove finished tasks
   - Click "Clear All" to delete everything (requires confirmation)

## 💾 Local Storage

All tasks are automatically saved to your browser's local storage. Your tasks will persist even after:
- Refreshing the page
- Closing and reopening your browser
- Closing and reopening the tab

### Stored Data Structure
```javascript
{
  id: timestamp,           // Unique identifier
  text: "Task text",       // Task description
  completed: false,        // Completion status
  priority: "medium",      // Priority level
  createdAt: "ISO string", // Creation date
  dueDate: null            // Future feature
}
```

## 🎨 Styling Features

- **Color Scheme**: Purple gradients with accent colors
- **Responsive Grid**: Adapts to all screen sizes
- **Interactive Elements**: Hover effects and transitions
- **Priority Colors**:
  - 🔴 High (Red)
  - 🟡 Medium (Orange)
  - 🟢 Low (Green)

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with side-by-side elements
- **Tablet (≤600px)**: Adjusted spacing and single-column inputs
- **Mobile (≤400px)**: Optimized for small screens

## 🔧 Customization

### Change Colors
Edit the gradient in `style.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add Due Dates
Modify the `todo` object structure and add date picker inputs.

### Add Categories
Extend the `TodoApp` class to support task categorization.

### Cloud Sync
Replace `saveTodos()` and `loadTodos()` to sync with a backend API.

## 🎓 Learning Points

This project demonstrates:
- **Object-Oriented Programming**: TodoApp class structure
- **DOM Manipulation**: Creating and managing elements
- **Event Handling**: Click, keypress, and change events
- **Local Storage API**: Persistence without a backend
- **ES6 Features**: Classes, arrow functions, template literals
- **CSS Grid & Flexbox**: Responsive layouts
- **Animations**: CSS keyframes and transitions
- **Error Prevention**: Form validation and confirmations

## 🐛 Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Future Enhancements

- [ ] Due dates with calendar picker
- [ ] Task categories/tags
- [ ] Search functionality
- [ ] Recurring tasks
- [ ] Dark mode theme
- [ ] Cloud sync with Firebase
- [ ] Push notifications
- [ ] Export/Import tasks
- [ ] Multiple lists/projects
- [ ] Drag-and-drop reordering

## 📄 License

This project is open source and available for personal and educational use.

---

**Made with ❤️ using vanilla HTML, CSS, and JavaScript**