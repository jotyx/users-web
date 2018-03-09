import { IUsers } from './users-interface';
import { Component, ViewChild, EventEmitter } from '@angular/core';
import { UsersService } from './users.service';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(TableComponent) table: TableComponent;

  title: string;
  newUserName: string;
  selectedUserName: string;
  selectedUser: IUsers;
  showNewUserBlock: boolean;
  showEditUserBlock: boolean;
  errorMessage: string;

  constructor(private service: UsersService) {
    this.title = 'Table of Users';
    this.showNewUserBlock = true;
    this.showEditUserBlock = false;
    this.errorMessage = this.service.getErrorMessage();
    let subscription = service.errorMessageChange.subscribe((message) => {
      this.errorMessage = message;
    })
  }

  showEditHideNew() {
    this.showEditUserBlock = true;
    this.showNewUserBlock = false;
  }

  showNewHideEdit() {
    this.showNewUserBlock = true;
    this.showEditUserBlock = false;
  }

  addUser() {
    if (this.newUserName === undefined)
      return;
    this.service.addUser(this.newUserName)
      .subscribe(
        suc => {
          this.service.setErrorMessage("");
          this.table.addUserToTable(suc);
        },
        err => {
          this.service.setErrorMessage("Error occured while adding user!");
        });
    this.newUserName = undefined;
  }

  getSelectedUser(user: IUsers) {
    this.showEditHideNew();
    this.selectedUser = (user);
    this.selectedUserName = user.name;
  }

  updateUser() {
    if (this.selectedUserName === undefined)
      return;
    this.selectedUser.name = this.selectedUserName;
    this.service.updateUser(this.selectedUser)
      .subscribe(
          suc => {
            this.service.setErrorMessage("");
          },
          err => {
            this.service.setErrorMessage("Error occured while updating user!");
          });
    this.clearUpdate();
  }

  clearUpdate() {
    this.selectedUser = undefined;
    this.selectedUserName = undefined;
    this.showNewHideEdit();
  }
}
