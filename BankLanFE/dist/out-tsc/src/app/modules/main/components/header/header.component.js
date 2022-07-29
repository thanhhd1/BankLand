import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router } from '@angular/router';
import Global from 'src/app/Global';
import UserCriteria from 'src/app/modules/common/criterias/user.criteria';
import { UserService } from 'src/app/modules/common/services/user.service';
import { DatePipe } from '@angular/common';
import { ChangePasswordComponent } from 'src/app/modules/main/components/user/change-password/change-password.component';
var HeaderComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HeaderComponent, _super);
    function HeaderComponent(authService, userService, datePipe, router) {
        var _this = _super.call(this, authService) || this;
        _this.authService = authService;
        _this.userService = userService;
        _this.datePipe = datePipe;
        _this.router = router;
        _this.criteria = new UserCriteria();
        _this.searchText = '';
        _this.criteria.ItemPerPage = 100;
        return _this;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.registerSearch();
    };
    HeaderComponent.prototype.registerSearch = function () {
        var _this = this;
        var strUrl = Global.apiUrl + "/api/User/SearchAllUser";
        var datas = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: strUrl,
                prepare: function (query, settings) {
                    this.searchText = query;
                    settings.url = Global.apiUrl + "/api/User/SearchAllUser?q=" + query;
                    if (this.currentUser && this.currentUser.access_token) {
                        var headers = {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + ' ' + this.currentUser.access_token
                        };
                        settings.headers = headers;
                    }
                    return settings;
                }.bind(this),
                filter: function (data) {
                    return data.Data;
                }
            }
        });
        datas.initialize();
        var typeAhead = $('#txtSearch').typeahead({
            hint: true,
            highlight: true,
            minLength: 3,
            tabAutocomplete: true,
        }, {
            name: 'User',
            source: function show(q, cb, cba) {
                this.userService.SearchAllUser(q).subscribe(function (r) {
                    cba(r);
                });
            }.bind(this),
            limit: 100,
            templates: {
                empty: [
                    '<span class="col-md-12 text-center" style="width :100%">',
                    '<b style="padding:5px;"> Not found any records</b>',
                    '</span>'
                ].join('\n'),
                suggestion: function (data) {
                    var template = '';
                    var linkImage = data.ProfilePicturePath ? data.ProfilePicturePath : 'https://s3.amazonaws.com/zumedic-network-storage/User/Images/avatar.png';
                    template += '<div class="row ml-0 mr-0">';
                    template += '<div class="col-md-3">';
                    template += '<img class="rounded-circle" style="width:30px;height:30px;" src="' + linkImage + '"/>';
                    template += '</div>';
                    template += '<div class="col-md-9 no-padding">';
                    template += '<h6 class="col-md-12 text-bold-500"> ' + data.FullName + '</h6>';
                    template += '<div class="col-md-12">' + (data.BirthDate ? "" + this.datePipe.transform(data.BirthDate, 'dd/MM/yyyy') : '') + '</div>';
                    template += '</div>';
                    template += '</div>';
                    return template;
                }.bind(this)
            }
        });
        typeAhead.bind('typeahead:selected', function (obj, selected, name) {
            if (selected) {
                $('#txtSearch').typeahead('val', '');
            }
            $('#typeaheadInput').typeahead('close');
            return false;
        });
        typeAhead.bind('typeahead:autocompleted', function (obj, selected, name) {
            if (selected) {
                $('#txtSearch').typeahead('val', '');
                _this.router.navigate(['/', 'management', 'edit-client', selected.Id]);
            }
            $('#typeaheadInput').typeahead('close');
            return false;
        });
    };
    HeaderComponent.prototype.signOut = function () {
        this.authService.SignOut();
        this.router.navigate(['/', 'auth', 'sign-in']);
    };
    HeaderComponent.prototype.showChangePassword = function (id) {
        this.changePasswordModal.show(id);
    };
    HeaderComponent.prototype.RefreshTable = function () {
        this.table.ajax.reload();
    };
    tslib_1.__decorate([
        ViewChild('changePasswordModal'),
        tslib_1.__metadata("design:type", ChangePasswordComponent)
    ], HeaderComponent.prototype, "changePasswordModal", void 0);
    HeaderComponent = tslib_1.__decorate([
        Component({
            selector: '[app-header]',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css'],
            providers: [DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            UserService,
            DatePipe,
            Router])
    ], HeaderComponent);
    return HeaderComponent;
}(BaseComponent));
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map