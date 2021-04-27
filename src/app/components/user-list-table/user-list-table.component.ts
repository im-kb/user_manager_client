import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/User';

@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list-table.component.css'],
})
export class UserListTableComponent implements OnInit {

  @Input() users: User[];
  isSortedAz: boolean = false;
  currentPage = 1;
  itemsPerPage = 7;
  pageSize: number;

  constructor() {
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }
  ngOnInit(): void {
  }

  public sortUsers(): void {
    if (this.isSortedAz === true) {
      this.users.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
      console.log(this.users);
      this.isSortedAz = false;
    } else {
      this.users.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      this.isSortedAz = true;
      console.log(this.users);
    }


  }
}
