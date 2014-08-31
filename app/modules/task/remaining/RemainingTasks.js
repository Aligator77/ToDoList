/**
 * Created by Joseph on 8/25/2014.
 */
angular.module('ToDoList.TaskModule')
    .directive('remainingTasks', function(TaskService, AlertService, truncateLimit) {
        return {
            restrict: 'A',
            scope: {},
            templateUrl: "modules/task/remaining/RemainingTasks.html",
            controller: function($scope, $filter) {

                $scope.dateFilter = function() {
                    return $filter('24HourTime');
                };

                $scope.getTasks = function() {
                    return TaskService.getTasks();
                };

                $scope.markComplete = function(task) {
                    TaskService.markComplete(task);
                    if (task.name != null) {
                        if (task.name.length > truncateLimit) {
                           AlertService.setAlert('alert-success', 'Task Complete!', task.name.substr(0, truncateLimit) + '... has been marked as complete.', 2000);
                        }
                        else if (task.name.length <= truncateLimit) {
                            AlertService.setAlert('alert-success', 'Task Complete!', task.name + ' has been marked as complete.', 2000);
                        }
                    }
                    else {
                        AlertService.setAlert('alert-success', 'Task Complete!', 'A task has been marked as complete.', 2000);
                    }
                };

                $scope.prepareEditTask = function(task) {
                    currentlyEditedTask = task;
                    $scope.inputCopy = angular.copy(currentlyEditedTask);
                };

                $scope.editTask = function(taskFields) {
                    currentlyEditedTask.name = taskFields.name;
                    currentlyEditedTask.group = taskFields.group;
                    $scope.inputCopy = null;
                    currentlyEditedTask = null;
                };

                $scope.startTrackingTask = function(task) {
                    TaskService.startTrackingTask(task);
                };

                $scope.stopTrackingTask = function(task) {
                    TaskService.stopTrackingTask(task);
                };
            }
        }
    });