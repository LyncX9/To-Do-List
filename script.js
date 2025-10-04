document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('newTaskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        addTask();
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target.classList.contains('complete-btn') || target.closest('.complete-btn')) {
            const taskItem = target.closest('.task-item');
            toggleComplete(taskItem);
        }
        if (target.classList.contains('delete-btn') || target.closest('.delete-btn')) {
            const taskItem = target.closest('.task-item');
            deleteTask(taskItem);
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Task cannot be empty.'); 
            return;
        }
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <p>${escapeHTML(taskText)}</p>
            <div class="task-buttons">
                <button class="complete-btn" title="Mark as Completed"><i class="fa-solid fa-check"></i></button>
                <button class="delete-btn" title="Delete Task"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = '';
        taskInput.focus();
    }

    function toggleComplete(taskItem) {
        taskItem.classList.toggle('completed');
    }

    function deleteTask(taskItem) {
        taskItem.classList.add('removing');

        taskItem.addEventListener('animationend', () => {
            taskItem.remove();
        });
    }
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

});
