const ModalWindowView = Backbone.View.extend({
    el: $('#task-creation-window'),

    events: {
        'click .create-task': 'createTask',
        'click .cancel-adding': 'hideWindow'
    },

    createTask: function() {
        const taskName = $('#input-taskname').val().trim();
        const taskDescription = $('#input-taskdesc').val().trim();
        const notifier = $('.notifier');
        notifier.hide();

        if (!taskName || !taskDescription) {
            notifier.html('Fill in all fields').show();
            setTimeout(() => notifier.hide(), 3000);
            
            return;
        }

        const formValues = {
            taskName,
            taskDescription,
            taskStatus: $('#input-taskstatus').val()
        };

        this.collection.create(formValues);
        notifier.html('Task has been added').show();
        $('#task-creation-window')[0].reset();
        setTimeout(() => notifier.hide(), 3000);
    },

    hideWindow: function() {
        const windowReference = $('#task-creation-window');
        windowReference.hide();
        $('.notifier').hide();

        windowReference[0].reset();
    }
});
