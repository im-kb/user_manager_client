import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/User';

@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list-table.component.css']
})
export class UserListTableComponent implements OnInit {
  @Input() users: User[];
  constructor() { }

  ngOnInit(): void {
  }

}
