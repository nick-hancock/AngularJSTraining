describe('Test the todo controller', function() {
  beforeEach(module('todoApp'));

  var ctrl;
  var originalTodos;
  
  beforeEach(inject(function($controller, $filter) {
    ctrl = $controller('TodoListController');
    originalTodos = angular.copy(ctrl.todos)
  }));

  it('should have todos available on load', function() {
    expect(ctrl.todos.length).toBe(3);
  });
  
  it('should calculate the correct number of uncompleted items', function() {
    expect(ctrl.uncompleted()).toBe(2);
  });
  
  it('should add to the list of todos', function() {
    var text = 'Hello';
    
    ctrl.todoText = text;
    ctrl.addTodo();
    
    expect(ctrl.todos.length).toBe(4);
    expect(ctrl.todos[ctrl.todos.length - 1]).toEqual({text:text, done:false});
    expect(ctrl.uncompleted()).toBe(3);
    expect(ctrl.todoText).toBe('');
  });

  it('should delete all todos', function() {
    ctrl.deleteAll();
    expect(ctrl.todos.length).toBe(0);
  });


  it('should delete all completed todos', function($filter) {
    ctrl.deleteCompleted();
    expect(ctrl.todos.length).toBe(2);
    expect(ctrl.todos).toEqual($filter('onlyUncompleted')(originalTodos, {done:false}))
  });

  it('should delete specific todos by index', function() {
    ctrl.delete(1);
    expect(ctrl.todos.length).toBe(2);
    expect(ctrl.todos[0]).toEqual(originalTodos[0]);
    expect(ctrl.todos[1]).toEqual(originalTodos[2]);
  });

});