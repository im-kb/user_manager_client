import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserService} from './services/user.service';
import {User} from '../model/User';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public users: User[];
  public deleteUser:User;
  public updateUser:User;
  public isGrid:boolean=true;



  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddUser(addForm: NgForm): void {
    document.getElementById('add-user-form').click(); //close modal
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onUpdateUser(user:User): void {
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onDeleteUser(id:number): void {
    document.getElementById('delete-dismiss-button').click(); //close modal
    this.userService.deleteUser(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public searchUser(key:string):void{
    const results:User[] = [];
    for (const user of this.users){
      if(user.name.toLowerCase().indexOf(key.toLowerCase())!==-1 ){
        results.push(user);
      }
    }
    this.users=results;
    if(results.length==0||!key){
      this.getUsers();
    }
  }


  public openModal(user: User, mode: string): void {
    const container = document.querySelector('.container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';

    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'edit') {
      this.updateUser=user;
      button.setAttribute('data-target', '#updateUserModal');
    }
    if (mode==='delete') {
      this.deleteUser=user;
      button.setAttribute('data-target', '#deleteUserModal');
    }

    container.appendChild(button);//add item do dom under div
    button.click();
  }

  public changeView():void{
    if(this.isGrid){
      document.getElementById('main-container').style.display="none";
      document.getElementById('list-container').style.display="block"
      document.getElementById('changeViewButton').innerText="Change to grid";
      this.isGrid=false;
    }else{
      document.getElementById('main-container').style.display="block";
      document.getElementById('list-container').style.display="none";

      this.isGrid=true;
      document.getElementById('changeViewButton').innerText="Change to list";
    }

  }


}
