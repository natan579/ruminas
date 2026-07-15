// ============================================
// TO-DO LIST APPLICATION
// ============================================

class TodoApp {
    constructor() {
        // DOM Elements
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.totalTasksEl = document.getElementById('totalTasks');
        this.activeTasksEl = document.getElementById('activeTasks');
        this.completedTasksEl = document.getElementById('completedTasks');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.modal = document.getElementById('confirmModal');
        this.confirmBtn = document.getElementById('confirmBtn');
        this.cancelBtn = document.getElementById('cancelBtn');

        // State
        this.todos = [];
        this.currentFilter = 'all';
        this.modalAction = null;

        // Initialize
        this.init();
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    init() {
        this.loadTodos();
        this.attachEventListeners();
        this.render();
    }

    attachEventListeners() {
        // Add task
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Action buttons
        this.clearCompletedBtn.addEventListener('click', () => this.showConfirmModal('clearCompleted'));
        this.clearAllBtn.addEventListener('click', () => this.showConfirmModal('clearAll'));

        // Modal buttons
        this.confirmBtn.addEventListener('click', () => this.confirmAction());
        this.cancelBtn.addEventListener('click', () => this.hideModal());
    }

    // ============================================
    // TODO OPERATIONS
    // ============================================

    addTodo() {
        const text = this.todoInput.value.trim();
        
        if (!text) {
            this.showNotification('Please enter a task', 'error');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: 'medium',
            createdAt: new Date().toISOString(),
            dueDate: null
        };

        this.todos.push(todo);
        this.saveTodos();
        this.todoInput.value = '';
        this.todoInput.focus();
        this.render();
        this.showNotification('Task added successfully!', 'success');
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
        this.showNotification('Task deleted', 'success');
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    editTodo(id, newText) {
        const todo = this.todos.find(t => t.id === id);
        if (todo && newText.trim()) {
            todo.text = newText.trim();
            this.saveTodos();
            this.render();
            this.showNotification('Task updated', 'success');
        }
    }

    setPriority(id, priority) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.priority = priority;
            this.saveTodos();
            this.render();
        }
    }

    clearCompleted() {
        const initialCount = this.todos.length;
        this.todos = this.todos.filter(todo => !todo.completed);
        const deletedCount = initialCount - this.todos.length;
        this.saveTodos();
        this.render();
        this.showNotification(`${deletedCount} completed task(s) deleted`, 'success');
    }

    clearAll() {
        this.todos = [];
        this.saveTodos();
        this.render();
        this.showNotification('All tasks deleted', 'success');
    }

    // ============================================
    // FILTERING
    // ============================================

    setFilter(filter) {
        this.currentFilter = filter;
        this.updateFilterButtons();
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    updateFilterButtons() {
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === this.currentFilter);
        });
    }

    // ============================================
    // RENDERING
    // ============================================

    render() {
        this.updateStats();
        this.renderTodos();
        this.updateActionButtons();
    }

    renderTodos() {
        const filteredTodos = this.getFilteredTodos();
        this.todoList.innerHTML = '';

        if (filteredTodos.length === 0) {
            this.emptyState.classList.add('show');
            return;
        }

        this.emptyState.classList.remove('show');

        filteredTodos.forEach(todo => {
            const todoEl = this.createTodoElement(todo);
            this.todoList.appendChild(todoEl);
        });
    }

    createTodoElement(todo) {
        const div = document.createElement('div');
        div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        div.id = `todo-${todo.id}`;

        div.innerHTML = `
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
                data-id="${todo.id}"
            >
            <span class="todo-text">${this.escapeHtml(todo.text)}</span>
            <span class="priority-badge ${todo.priority}">${todo.priority}</span>
            <div class="todo-actions">
                <button class="action-btn edit" data-id="${todo.id}" title="Edit">✏️</button>
                <button class="action-btn delete" data-id="${todo.id}" title="Delete">🗑️</button>
            </div>
        `;

        // Event listeners
        const checkbox = div.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

        const editBtn = div.querySelector('.action-btn.edit');
        editBtn.addEventListener('click', () => this.startEdit(todo.id));

        const deleteBtn = div.querySelector('.action-btn.delete');
        deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

        return div;
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;

        this.totalTasksEl.textContent = total;
        this.activeTasksEl.textContent = active;
        this.completedTasksEl.textContent = completed;
    }

    updateActionButtons() {
        const hasCompleted = this.todos.some(t => t.completed);
        this.clearCompletedBtn.disabled = !hasCompleted;
        this.clearAllBtn.disabled = this.todos.length === 0;
    }

    // ============================================
    // EDIT MODE
    // ============================================

    startEdit(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const todoEl = document.getElementById(`todo-${id}`);
        if (!todoEl) return;

        const textSpan = todoEl.querySelector('.todo-text');
        const priorityBadge = todoEl.querySelector('.priority-badge');
        const actions = todoEl.querySelector('.todo-actions');

        // Create edit input
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = todo.text;

        // Create priority selector
        const prioritySelect = document.createElement('select');
        prioritySelect.className = 'priority-select';
        prioritySelect.style.cssText = 'padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.9rem;';
        prioritySelect.innerHTML = `
            <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>Low</option>
            <option value="medium" ${todo.priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>High</option>
        `;

        // Create action buttons
        const saveBtn = document.createElement('button');
        saveBtn.className = 'action-btn';
        saveBtn.textContent = '✅';
        saveBtn.style.background = '#4caf50';
        saveBtn.style.color = 'white';
        saveBtn.title = 'Save';

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'action-btn';
        cancelBtn.textContent = '❌';
        cancelBtn.style.background = '#f44336';
        cancelBtn.style.color = 'white';
        cancelBtn.title = 'Cancel';

        // Replace elements
        textSpan.replaceWith(editInput);
        priorityBadge.replaceWith(prioritySelect);
        actions.innerHTML = '';
        actions.appendChild(saveBtn);
        actions.appendChild(cancelBtn);

        todoEl.classList.add('edit-mode');
        editInput.focus();
        editInput.select();

        // Event listeners
        const saveEdit = () => {
            const newText = editInput.value.trim();
            const newPriority = prioritySelect.value;
            if (newText) {
                this.editTodo(id, newText);
                this.setPriority(id, newPriority);
            } else {
                this.showNotification('Task cannot be empty', 'error');
            }
        };

        saveBtn.addEventListener('click', saveEdit);
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') cancelEdit();
        });
        cancelBtn.addEventListener('click', cancelEdit);

        const cancelEdit = () => {
            this.render();
        };
    }

    // ============================================
    // MODAL
    // ============================================

    showConfirmModal(action) {
        this.modalAction = action;
        const confirmMessage = document.getElementById('confirmMessage');

        if (action === 'clearCompleted') {
            confirmMessage.textContent = 'Are you sure you want to delete all completed tasks? This action cannot be undone.';
        } else if (action === 'clearAll') {
            confirmMessage.textContent = 'Are you sure you want to delete ALL tasks? This action cannot be undone.';
        }

        this.modal.classList.add('show');
    }

    confirmAction() {
        if (this.modalAction === 'clearCompleted') {
            this.clearCompleted();
        } else if (this.modalAction === 'clearAll') {
            this.clearAll();
        }
        this.hideModal();
    }

    hideModal() {
        this.modal.classList.remove('show');
        this.modalAction = null;
    }

    // ============================================
    // LOCAL STORAGE
    // ============================================

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        const stored = localStorage.getItem('todos');
        this.todos = stored ? JSON.parse(stored) : [];
    }

    // ============================================
    // UTILITIES
    // ============================================

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#4caf50' : '#f44336'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 2000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ============================================
// INITIALIZE APP
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});

// Add missing animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);