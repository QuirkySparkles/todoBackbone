const TaskModel = Backbone.Model.extend({
    defaults: function () {
        return {
            taskName: 'Task name',
            taskDescription: 'Description',
            taskStatus: 'To Do',
            completedAt: ''
        };
    },

    changeStatus: function(status) {
        if (status === 'Done' && !this.get('completedAt')) {
            const today = new Date();
            const date = this.beautifyDate(today.getDate());
            const month = this.beautifyDate(today.getMonth() + 1);
            const hours = this.beautifyDate(today.getHours());
            const minutes = this.beautifyDate(today.getMinutes());

            this.set({
                taskStatus: status,
                completedAt: `Completed ${date}.${month}.${today.getFullYear()} at ${hours}:${minutes}`
            });

        } else if (this.get('taskStatus') === 'Done') {
            this.set({taskStatus: status, completedAt: ''});
        } else {
            this.set({taskStatus: status});
        }

        LocalStorage.update(this);
    },

    beautifyDate(digit) {
        return digit < 10 ? '0' + digit : digit;
    }
});
