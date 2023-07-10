import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';
import { StudentService } from './services/student.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  // title = 'form_app';

  displayedColumns: string[] = [
  'id',
  'firstName', 
  'lastName', 
  'roll_no',
  'email',
  'dob',
  'gender',
  'mobile_no',
  'college',
  'course',
  'action',

];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _studentService:StudentService
    ) {}
  ngOnInit(): void {
    this.getStudentList();
  }

  openAddEditStudentForm() {
    const dialogRef = this._dialog.open(StudentAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getStudentList();
        }
      },
    });
    
  }

  getStudentList() {
    this._studentService.getStudentList().subscribe({
      next:(res) => {
        // console.log(res);
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error:console.log,
      // error:(err)=>{
      //   console.log(err)
      // }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteStudent(id: number) {
    this._studentService.deleteStudent(id).subscribe({
      next: (res) =>{
        alert('Student deleted!');
        this.getStudentList();
      },
      error: console.log
    });
  }

  openEditForm(data: any) {
    const dialogRef=this._dialog.open(StudentAddEditComponent,{
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getStudentList();
        }
      },
    });

  }

}
