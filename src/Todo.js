class Todo {
    constructor(title) {
        this.title = title,
        this.dueDate = new Date().toISOString(),
        this.priority = "normal",
        this.notes = ""
        this.isComplete = false;
        this.id;
    }
}

export { Todo }