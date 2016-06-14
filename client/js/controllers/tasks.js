angular
  .module('app')
  .controller('AllTasksController', ['$scope', '$state', 'Task', 'User', function ($scope, $state, Task, User) {
    $scope.tasks = User.tasks({ id: User.getCurrentId() })

    $scope.update = function (task) {
      task.$save()
    }

    $scope.destroy = function (task) {
      Task
        .deleteById({ id: task.id })
        .$promise.then(function () {
          var index = $scope.tasks.indexOf(task)
          $scope.tasks.splice(index, 1)
        })
    }
  }])

  .controller('AddTaskController', ['$scope', '$state', 'Task', function ($scope, $state, Task) {
    $scope.task = {}

    $scope.save = function () {
      Task
        .create($scope.task)
        .$promise.then(function () {
          $state.go('all-tasks')
        })
    }
  }])