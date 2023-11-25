class Todo {
    constructor(title) {
        this.title = title,
        this.dueDate;
        this.priority = "normal",
        this.notes = ""
        this.isComplete = false;
    }
}

export { Todo }