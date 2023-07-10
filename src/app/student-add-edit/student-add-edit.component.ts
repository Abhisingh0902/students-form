import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { createInjectableType } from '@angular/compiler';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.scss']
})
export class StudentAddEditComponent implements OnInit {
  studentForm:FormGroup;


  Course: string[] =[
    'BTech',
    'BCom',
    'Bsc.IT',
    'BCA',
    'MCA',
    'MBA',
    'MTach',

  ]

  constructor(
    private _fb: FormBuilder,
    private _studentService:StudentService,
    private _dialogRef: MatDialogRef<StudentAddEditComponent >,
    @Inject(MAT_DIALOG_DATA)public data:any
    ) {
    this.studentForm = this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      mobile_no:'',
      roll_no:'',
      dob:'',
      gender:'',
      course:'',
      college:'',
      
    })
  }
  ngOnInit(): void {
      this.studentForm.patchValue(this.data);
  }
    onFormSubmit(){
      if(this.studentForm.valid){
        if(this.data){
          // console.log(this.studentForm.value);
        this._studentService.updateStudent(this.data.id,this.studentForm.value).subscribe({
          next:(val: any) =>{
            alert('Student details updated!');
            this._dialogRef.close(true);
            // this.getStudentList();
          },
          error: (err:any) =>{
            console.error(err)
          }
        });

        }else{
          // console.log(this.studentForm.value);
        this._studentService.addStudent(this.studentForm.value).subscribe({
          next:(val: any) =>{
            alert('Student added successfully');
            this._dialogRef.close(true);
            // this.getStudentList();
          },
          error: (err:any) =>{
            console.error(err)
          }
        });

        }
        

      }
    }
}
