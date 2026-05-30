import { Injectable, signal, inject } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root' // This makes the service available application-wide
})

export class TasksService {
    private tasks = signal<Task[]>([]);
    allTasks = this.tasks.asReadonly();
    logginService = inject(LoggingService);

    addTask(taskData: {title: string, description: string}) {
        const newTask: Task = {
            ...taskData, // Spread the title and description from the input data
            id: (this.tasks().length+1).toString(), // Simple ID generation based on the current number of tasks
            status: 'OPEN' // Default status for new tasks
        };
        this.tasks.update(oldTasks => [...oldTasks, newTask]);
        this.logginService.log(`Added new task: ${newTask.title}`);
    }

    updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update(oldTasks => 
            oldTasks.map(task => 
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
        this.logginService.log(`Updated task ${taskId} status to ${newStatus}`);
    }
}
