export const emptyTask = () => Promise.resolve()

export function concatTask(...tasks: Array<Task>): Task {
    return tasks.reduce((acc, cur) => 
        acc 
            ? () => acc().then(cur) 
            : cur
    )
}

export function concurrentTasks(tasks: Array<Task>): Task {
    return () => Promise.all(tasks.map(t => t())).then()
}