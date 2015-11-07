'use strict';

class HomeController {
  constructor($event) {

  }

  success(desserts) {
    this.desserts = desserts;
  }

  search(predicate) {
    this.filter = predicate;
    this.deferred = $nutrition.desserts.get($this.query, success).$promise;
  }

  showListBottomSheet() {
    this.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
      controller: 'HomeController',
      targetEvent: $event
    }).then(function(clickedItem) {
      this.alert = clickedItem.name + ' clicked!';
    });
  }

}

HomeController.$inject = [
  '$mdBottomSheet',
  '$event'
];

export default HomeController
