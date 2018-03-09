import { IUsers } from './../users-interface';
import { UsersService } from './../users.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {

  @Input() users: any;
  @Output() sendSelectedUser = new EventEmitter<IUsers>();

  constructor(private service: UsersService) { }

  deleteUser(user: IUsers) {
    this.service.deleteUser(user.id)
    .subscribe(
      suc => {
        this.service.setErrorMessage("");
        this.users.splice(this.users.indexOf(user), 1);
      },
      err => {
        this.service.setErrorMessage("Error occured while deleting user!");
      });
  }

  editUser(user: IUsers) {
    this.sendSelectedUser.emit(user);
  }

  ngOnInit() {
  }

}
