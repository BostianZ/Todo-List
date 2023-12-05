class Todo {
    constructor(title) {
        this.title = title,
        this.dueDate = new Date().toISOString(),
        this.priority = false,
        this.notes = "",
        this.isComplete = false;
    }
}

export { Todo }