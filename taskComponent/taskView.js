const TaskView = Backbone.View.extend({
    tagName: 'div',
    className: 'task-specimen',
    template: Handlebars.compile($('#task-template').html()),

    events: {
        'change .set-taskstatus': 'changeStatus',
        'click .delete-task': 'deleteTask'
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'remove', this.hideDeletedTask);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        // set correct state of select
        const $dropdownOptions = this.$el.find('.set-taskstatus');
        const currentStatus = this.model.get('taskStatus');

        $dropdownOptions.find('[value="' + currentStatus + '"]').attr({'selected': 'selected'});
        this.$el.find('.set-taskstatus').html($dropdownOptions.html());
        
        return this;
    },

    changeStatus: function() {
        this.model.changeStatus(this.$el.find('.set-taskstatus').val());
    },

    deleteTask: function() {
        this.model.destroy();
    },

    hideDeletedTask: function() {
        this.$el.html('');
    }
});
