import { IUsers } from './../users-interface';
import { UsersService } from './../users.service';
import { Component, OnInit, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  columns: string[];
  users: IUsers[];

  @Output() sendToApp = new EventEmitter<IUsers>();

  constructor(private service: UsersService) { }

  getUsers(): void {
    this.service.getUsers()
      .subscribe(
        resultArray => {
          this.service.setErrorMessage("");
          this.users = resultArray;
        },
        err => {
          this.service.setErrorMessage("Error occured while loading users!");
        });
  }

  addUserToTable(user: IUsers) {
    this.users.push(user);
  }

  getEditedUser(user: IUsers) {
    this.sendToApp.emit(user);
  }

  getColumns() {
    this.columns = this.service.getColumns();
  }

  ngOnInit() {
    this.getUsers();
    this.getColumns();
  }
}
