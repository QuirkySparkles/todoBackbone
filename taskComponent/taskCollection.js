let LocalStorage = new Store('backbone-todo');

const TodoList = Backbone.Collection.extend({
    model: TaskModel,
    localStorage: LocalStorage,

    getCompleted: function() {
        return this.where({taskStatus: 'Done'});
    },

    searchTasks: function(query, completed) {
        const searchFrom =  completed ? this.getCompleted() : this.models;
        let result = searchFrom.filter(task =>
            task.attributes.taskName.indexOf(query) !== -1 || task.attributes.taskDescription.indexOf(query) !== -1
        );

        return result;
    }
});
