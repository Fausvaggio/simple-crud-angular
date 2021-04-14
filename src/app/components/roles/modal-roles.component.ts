import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import {MasterService} from '../../services/master.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-roles',
  templateUrl: './modal-roles.component.html',
  styleUrls: ['./modal-roles.component.css']
})
export class ModalRolesComponent implements OnInit {

  firstFormGroup  : FormGroup; 
  description     : string = "";
  public Id       : string = "";  
  constructor(
    public dialogRef: MatDialogRef<ModalRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public masterService: MasterService,
    public snackBar: MatSnackBar, 
    private _formBuilder: FormBuilder
  ) {

    this.firstFormGroup = this._formBuilder.group({              
      txtDescription: ['', Validators.required]
    });	
   }

  ngOnInit(): void {
    console.log(this.data.type);
    if(this.data.type == "Register"){       
      this.Id = "";
   }
   else if(this.data.type=="Update"){  
      this.Id = this.data.Id;
      this.onGetMasterById(this.Id);
   }
   console.log('ID:',this.Id);
  } 
  
  onGetMasterById(Id:string){
		this.masterService.GetMaster('rol',Id).subscribe(data =>{
      console.log(data);
      this.firstFormGroup.controls.txtDescription.setValue(data['data'][0].Description);			      
		});
	}
  onSendSave(){
    this.description = this.firstFormGroup.controls['txtDescription'].value
    if(this.Id === ""){
      const request = {      
        'description':this.description,      
        'master':'rol',
        'status':'All'
      };
      this.masterService.SetMasters(request).subscribe(data=>{  
        console.log(data);    
        if(data['status']==true){       
          this.snackBar.open(data['message'], "Cerrar", {
            duration: 6500,
            verticalPosition: 'top',
            panelClass: data['type']
          });

          this.firstFormGroup.reset();
        }
        else{
          this.snackBar.open(data['message'], "Cerrar", {
            duration: 6500,
            verticalPosition: 'top',
            panelClass: data['type']
          });
        }      
      }); 
    }
    else{
      const request = { 
        'Id':this.Id,     
        'description':this.description,      
        'master':'rol',
        'status':'All'
      };
      this.masterService.UpdMasters(request).subscribe(data=>{  
        console.log(data);    
        if(data['status']==true){       
          this.snackBar.open(data['message'], "Cerrar", {
            duration: 6500,
            verticalPosition: 'top',
            panelClass: data['type']
          });
          //this.firstFormGroup.reset();
        }
        else{
          this.snackBar.open(data['message'], "Cerrar", {
            duration: 6500,
            verticalPosition: 'top',
            panelClass: data['type']
          });
        }      
      }); 
    }
       
  }

  

}
