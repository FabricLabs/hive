'use strict';

const DIALOG = new WeakMap();
const BOTTOMSHEET = new WeakMap();
const EVENT = new WeakMap();

class HomeController {
  constructor($mdDialog, $mdBottomSheet, Channels, Categories) {
    BOTTOMSHEET.set(this, $mdBottomSheet);
    DIALOG.set(this, $mdDialog);

    this.channels = [];
    this.imagePath = 'images/placeholder-360x.jpg';

    Channels.query((channels) => {
      this.channels = channels;
      //console.log(channels);
    });
    
    Categories.query((channels) => {
      this.channels = channels;
      //console.log(channels);
    });

  }

  toggleSidenav(menuId) {
    // $mdSidenav(menuId).toggle();
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

  showAdd(ev) {
    DIALOG.get(this).show({
      controller: 'HomeController',
      template: '<md-dialog aria-label="User Form"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
    .then(function(answer) {
      this.alert = 'You said the information was "' + answer + '".';
    }, function() {
      this.alert = 'You cancelled the dialog.';
    });
  }


}

HomeController.$inject = [
  '$mdDialog',
  '$mdBottomSheet',
  'Channels',
  'Categories'
];

export default HomeController
