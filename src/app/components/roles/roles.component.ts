import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MasterService} from '../../services/master.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { iMaster } from 'src/app/models/iMaster';
import { ModalRolesComponent } from './modal-roles.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Description', 'DateIns','DateUpd', 'Status', 'actions'];
  dataSource: MatTableDataSource<iMaster>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listRoles: iMaster[] = []; 
  constructor(public dialog: MatDialog, public masterService: MasterService,public snackBar: MatSnackBar, ) { }

  ngOnInit(): void {
    this.loadGetAllData();
   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog() {    
    const dialogRef = this.dialog.open(ModalRolesComponent, {data: { type:"Register" },disableClose: true, maxWidth: '100vw', maxHeight: '100vh', height: '300px',width: '500px'});
    dialogRef.afterClosed().subscribe(result => {
      this.loadGetAllData();
    });
  }

  dialogModal(Id:any){    
		const dialogRef = this.dialog.open(ModalRolesComponent, { data: { type:"Update", Id: Id},disableClose: true, maxWidth: '100vw', maxHeight: '100vh', height: '300px',width: '500px'});
		dialogRef.afterClosed().subscribe(res => {
			this.loadGetAllData();
		});
	}
  updateStatus(Id:string, Status:string){    
    const request = {      
      'Id'    : Id, 
      'master': 'rol',     
      'Status':(Status=='1'?'0':'1')
    };
    this.masterService.UpdStatusMasters(request)
    .subscribe(data => { 
      if(data['status']==true){  
        this.loadGetAllData();     
        this.snackBar.open(data['message'], "Cerrar", {
          duration: 6500,
          verticalPosition: 'top',
          panelClass: data['type']
        });        
      }
      else{
        this.snackBar.open(data['message'], "Cerrar", {
          duration: 6500,
          verticalPosition: 'top',
          panelClass: data['type']
        });
      }          
    },
    err => console.log(err)
    );
  }
  deleteElement(Id:string){
    this.masterService.DelMasters(Id,'rol')
    .subscribe(data => { 
      if(data['status']==true){  
        this.loadGetAllData();     
        this.snackBar.open(data['message'], "Cerrar", {
          duration: 6500,
          verticalPosition: 'top',
          panelClass: data['type']
        });        
      }
      else{
        this.snackBar.open(data['message'], "Cerrar", {
          duration: 6500,
          verticalPosition: 'top',
          panelClass: data['type']
        });
      }          
    },
    err => console.log(err)
    );
  }
  loadGetAllData(){
    this.masterService.GetMasters('rol','All')
    .subscribe(data => {     
       this.listRoles = data['data'];
        this.dataSource = new MatTableDataSource(this.listRoles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => console.log(err)
    );
  }

  getStatus(value:string){
    if(value=="1") return "Activo";
    else return "Inactivo";
  }

}
