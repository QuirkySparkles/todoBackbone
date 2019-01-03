// general view
const AppView = Backbone.View.extend({
    el: $('#app'),

    events: {
        'click #add-task': 'switchModal',
        'click .show-completed': 'showCompletedTasks',
        'input #search-input': 'searchTasks'
    },

    initialize: function() {
        this.addButton = $('#task-creation-window');
        this.$modalWindow = $('#task-creation-window');
        this.$taskList = $('#task-list');
        this.isCompletedShown = false;

        $('.create-task').click((e) => e.preventDefault());
        $('.cancel-adding').click((e) => e.preventDefault());

        this.listenTo(this.collection, 'add', this.addTask);
        // this.listenTo(this.collection, 'change', this.render);
        // this.listenTo(this.collection, 'remove', this.render);

        this.collection.fetch();

        if (!this.collection.length) {
            this.showWarning('There are no tasks for now');
        }
    },

    render: function() {
        this.renderList();
        return this;
    },

    renderList: function() {
        $('#task-list').html('');
        $('#notification').hide();

        if (!this.collection.length) {
            this.showWarning('There are no tasks for now');
            return;
        }

        if (!this.isCompletedShown) {
            this.collection.each(this.addTask);
        } else {
            const completedTasks = this.collection.getCompleted();

            if (!completedTasks.length) {
                this.showWarning('There are no completed tasks');
                return;
            }

            completedTasks.forEach(task => this.addTask(task));
        }
    },

    addTask: function(taskModel) {
        const taskView = new TaskView({model: taskModel});
        const modelAttrs = taskModel.attributes;

        if (this.isCompletedShown && taskModel.isNew()) {
            return;
        }

        if (!this.searchQuery 
            || modelAttrs.taskName.indexOf(this.searchQuery) !== -1
            || modelAttrs.taskDescription.indexOf(this.searchQuery) !== -1) {
                $('#task-list').append(taskView.render().el);
        }
    },

    switchModal: function() {
        if (this.addButton.is(":hidden")) {
            this.addButton.show();
        } else {
            this.addButton.hide();
        }
    },

    showCompletedTasks: function() {
        this.isCompletedShown = !this.isCompletedShown;

        if (this.searchQuery) {
            this.searchTasks();
        } else {
            this.renderList();
        }
    },

    searchTasks: function() {
        this.searchQuery = $('#search-input').val().trim();

        if (!this.searchQuery) {
            this.render();
            return;
        }

        const resultToShow = this.collection.searchTasks(this.searchQuery, this.isCompletedShown);

        $('#task-list').html('');

        if (!resultToShow.length) {
            this.showWarning('No matches found');
            return;
        }

        $('#notification').hide();
        resultToShow.forEach(task => this.addTask(task));
    },

    showWarning: function(message) {
        $('#notification').html(message).show();
    }
});

const todoList = new TodoList();
const appView = new AppView({collection: todoList});
const modalWindowView = new ModalWindowView({collection: todoList});
