import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MasterService} from '../../services/master.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { iMaster } from 'src/app/models/iMaster';
import { ModalProfileComponent } from './modal-profile.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Description', 'DateIns','DateUpd', 'Status', 'actions'];
  dataSource: MatTableDataSource<iMaster>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listData: iMaster[] = []; 
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
    const dialogRef = this.dialog.open(ModalProfileComponent, {data: { type:"Register" },disableClose: true, maxWidth: '100vw', maxHeight: '100vh', height: '300px',width: '500px'});
    dialogRef.afterClosed().subscribe(result => {
      this.loadGetAllData();
    });
  }

  dialogModal(Id:any){    
		const dialogRef = this.dialog.open(ModalProfileComponent, { data: { type:"Update", Id: Id},disableClose: true, maxWidth: '100vw', maxHeight: '100vh', height: '300px',width: '500px'});
		dialogRef.afterClosed().subscribe(res => {
			this.loadGetAllData();
		});
	}
  updateStatus(Id:string, Status:string){    
    const request = {      
      'Id'    : Id, 
      'master': 'profiles',     
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
    this.masterService.DelMasters(Id,'profiles')
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
    this.masterService.GetMasters('profiles','All')
    .subscribe(data => {     
       this.listData = data['data'];
        this.dataSource = new MatTableDataSource(this.listData);
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

