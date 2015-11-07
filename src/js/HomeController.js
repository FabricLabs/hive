'use strict';

const DIALOG = new WeakMap();
const BOTTOMSHEET = new WeakMap();
const EVENT = new WeakMap();
const SIDENAV = new WeakMap();

class HomeController {
  constructor($event, $mdBottomSheet, $mdDialog, $mdSidenav) {
    BOTTOMSHEET.set(this, $mdBottomSheet);
    DIALOG.set(this, $mdDialog);
    EVENT.set(this, $event);
    SIDENAV.set(this, $mdSidenav);
  }

  toggleSidenav(menuId) {
    $mdSidenav(menuId).toggle();
  }

  success(desserts) {
    this.desserts = desserts;
  }

  search(predicate) {
    this.filter = predicate;
    this.deferred = $nutrition.desserts.get($this.query, success).$promise;
  }

  showListBottomSheet($event) {
    this.alert = '';
    BOTTOMSHEET.get(this).show({
      template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
      controller: 'HomeController',
      targetEvent: $event
    }).then(function(clickedItem) {
      this.alert = clickedItem.name + ' clicked!';
    });
  }

}

HomeController.$inject = [
  '$mdSidenav',
  '$mdDialog',
  '$mdBottomSheet'
];

export default HomeController
