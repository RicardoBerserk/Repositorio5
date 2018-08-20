app.directive('bsSelect', function () {
    //<button class="btn button-label btn-info" style="width:180px"
    //<button class="btn button-label btn-info" style="width:180px;font-size:13px;zoom:1;">
        return {
            restrict: 'E',
            require:'^ngModel',
            scope: {
                items: '=',
                textField: '@',
                valueField: '@',
                ngModel:'='
            },
            template: //'<div class="btn-group" >' +
                     '<a class="dropdown-toggle" data-toggle="dropdown" href ng-class="{ disabled: disabled }">' +
						'<span class="spanData">{{currentItemLabel}}</span>' +
						'<b></b>' +
					 '</a>' +
                     '<div class="dropdown-menuuu">' +
                     /*
                        '<div stop-propagation="click" class="multi-select-search">' +
							'<input class="" type="text" autocomplete="off" ng-model="searchTerm" />' +
						'</div>' +*/
                        '<ul role="menu">' +
                        // ng-show="{items.length == 0 ? false: true}"
                        '<li class="divider" >' +
                        '<a ng-click="checkAll(items , true)" ng-hide="items.length == 0" >' +
                        '<span><input type="checkbox" ng-model="test1" ng-checked="isSelectedAll()"> </span>&nbsp;Check All' +
                        '</a>' +
                        '<a ng-click="uncheckAll(items , false)" ng-hide="items.length == 0">' +
                        '<span><input type="checkbox"  ng-model="test2" ng-checked="isSelectedUnAll()" ></span>&nbsp;Uncheck All' +
                        '</a>' +
                        //'<button class=""  ng-click="checkAll(items , true)" multiplevalor="true" ><i class="icon-ok"></i> Check all</button>' +
                        //'<button class="" ng-click="uncheckAll(items, false)"><i class="icon-remove"></i> Uncheck all</button>' +
                        '</li>' +
                        '<li class="" ng-repeat="item in items" ng-click="cancelClose($event)" ng-class="{red: hover}" ng-mouseenter="hover = true" ng-mouseleave="hover = false">' +
                        //'<div class="input-group">' +
                        '<input type="checkbox" ng-checked="setCheckboxChecked(item)"  ng-click="selectValor(false,item,$index)">' +
                        '<a href=""   tabindex="-1" >' +
                        '{{item[textField]}}' +
                        '</a>' +
                        //'</div>' +
                        '</li>' +
                        '</ul>' +
                     '</div>',
            link: function (scope, element, attrs, ngModelCtrl) {
               //debugger;
              //added a watch to update the text of the multiselect
                scope.$watch('ngModel', function (v) {
                    //console.log(scope.test1);
                scope.setLabel();
              }, true);

                var valueField = scope.valueField.toString().trim();
                var textField = scope.textField.toString().trim();
                var modelIsValid = false;
                var selectedItemIsValid = false;
                isMultiple = attrs.multiplevalor ? true : false,
                //console.log(isMultiple);
                scope.multiple = isMultiple;
                
                scope.checkModelValidity = function (items) {
                    if (typeof(items) == "undefined" || !items) return false;
                   if (items.length < 1) return false;
                    return true;
                };
                modelIsValid = scope.checkModelValidity(scope.ngModel);
                scope.setFormValidity = function () {
                    if (typeof (attrs.required) != "undefined") {
                        return modelIsValid;//modelIsValid must be set before we setFormValidity
                    }
                    return true;
                };
                ngModelCtrl.$setValidity('noItemsSet!', scope.setFormValidity());
                scope.checkSelectedItemValidity = function (item) {
                    if (!item) return false;
                    if (!item[valueField]) return false;
                    if (!item[valueField].toString().trim()) return false;
                    return true;
                };
                
                scope.getItemName = function (item) {
                    return item[textField];
                };

                scope.setLabel = function() {
                    if (typeof (scope.ngModel) =="undefined" || !scope.ngModel || scope.ngModel.length < 1) {
                        
                            scope.currentItemLabel = attrs.defaultText;
                       
                    } else {
                        var valor = scope.multiple;
                        var totalitems = '';
                        if (isMultiple) {
                            var totalitems = '';
                            var longitudCount = scope.ngModel.length;
                            if (longitudCount < 3) {
                                angular.forEach(scope.ngModel, function (item) {
                                    totalitems += item[textField] + ', ';
                                });
                            } else {
                                totalitems = longitudCount + " Seleccionados";
                            }
                            scope.currentItemLabel = totalitems;
                        } else {
                            //var allItemsString = '';
                            var selectedItemsCount = scope.ngModel.length;
                            if (selectedItemsCount < 3) {
                                angular.forEach(scope.ngModel, function (item) {
                                    totalitems += item[textField].toString() + ', ';
                                });
                            } else {
                                totalitems = selectedItemsCount + " Seleccionados";
                            }
                            scope.currentItemLabel = totalitems;
                        }
                    }
                };
                scope.setLabel();
                scope.setCheckboxChecked = function (_item) {
                    var found = false;
                    angular.forEach(scope.ngModel, function (item) {
                        if (!found) {
                            if (_item[valueField].toString() === item[valueField].toString()) {
                                found=true;
                            }
                        }
                    });
                    return found;
                };
                scope.selectValor = function (marcado ,_item) {
                    isMultiple = marcado ? true : false,
                    scope.multiple = isMultiple;

                    if (!isMultiple) {
                        var found = false;
                        if (typeof (scope.ngModel) != "undefined" && scope.ngModel) {
                            for (var i = 0; i < scope.ngModel.length; i++) {
                                if (!found) {
                                    if (_item[valueField].toString() === scope.ngModel[i][valueField].toString()) {
                                        found = true;
                                        var index = scope.ngModel.indexOf(scope.ngModel[i]);
                                        scope.ngModel.splice(index, 1);
                                    }
                                }
                            }
                        } else {
                            scope.ngModel = [];
                        }
                        if (!found) {
                            scope.ngModel.push(_item);
                        }
                    }
                    
                    modelIsValid = scope.checkModelValidity(scope.ngModel);
                    selectedItemIsValid = scope.checkSelectedItemValidity(_item);
                    ////ngModelCtrl.$setValidity('noItemsSet!', scope.setFormValidity() && selectedItemIsValid);
                    ngModelCtrl.$setValidity('No elegidos', scope.setFormValidity() && selectedItemIsValid);
                    scope.setLabel();
                    
                    ngModelCtrl.$setViewValue(scope.ngModel);
                };

                scope.checkAll = function (_item,  marcados)
                {
                    console.log(scope.test1);
                    console.log(scope.test2);
                    scope.test1 = true;
                    scope.test2 = false;
                    console.log(scope.test1);
                    isMultiple = marcados ? true : false,
                    scope.multiple = isMultiple;
                    var found = false;
                    if (isMultiple) {
                        scope.ngModel = [];
                        for (var i = 0; i < _item.length; i++) {
                            scope.ngModel.push(_item[i]);
                        }
                    }
                    
                    modelIsValid = scope.checkModelValidity(scope.ngModel);
                    selectedItemIsValid = scope.checkSelectedItemValidity(_item);
                    ngModelCtrl.$setValidity('No Seleccionados', scope.setFormValidity() && selectedItemIsValid);
                    scope.setLabel();
                    ngModelCtrl.$setViewValue(scope.ngModel);
                };

                scope.isSelectedAll = function () {
                    //scope.test1 = true;
                    //scope.test2 = false;
                    return scope.ngModel.length > 0;
                };

               
                scope.uncheckAll = function (_items, desmarcados) {
                    scope.test1 = false;
                    scope.test2 = true;
                    isMultiple = desmarcados ? true : false,
                    scope.multiple = isMultiple;
                    var found = false;
                    if (!isMultiple) {
                        var found = false;
                        if (typeof (scope.ngModel) != "undefined" && scope.ngModel.length > 0) {
                            scope.ngModel = [];
                        } else {
                            scope.ngModel = [];
                        }
                    }
                };

                scope.isSelectedUnAll = function () {
                    //scope.test1 = false;
                    //scope.test2 = true;
                    return scope.ngModel.length == 0;
                };


                scope.cancelClose = function ($event) {
                    $event.stopPropagation();
                };
            }
        };
    });
    


