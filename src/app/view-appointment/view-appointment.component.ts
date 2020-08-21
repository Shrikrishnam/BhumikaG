import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { Router } from '@angular/router';
import { from } from 'rxjs';


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {
public User = [];
userid: string;
  constructor(public service: UserService, private router: Router) { }

  ngOnInit() {
    this.getfitness();
  }
  setId(id: string){
    this.userid= id;
  }

  onDelete( ){
    this.service.deleteFitness(this.userid).subscribe(
      data =>{console.log(data);
      window.alert("Entry deleted. Please Refresh!");
     // this.router.navigate(['./place-fitness-trainer-appointment']);

      }
    )
  }
  
  getfitness() {
    this.service.getfitnessdata().subscribe(data => this.User= data)
  }
}
