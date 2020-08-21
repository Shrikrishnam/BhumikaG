import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,  } from "@angular/forms"; 
import { UserService } from '../_services';
import { inflateRaw } from 'zlib';


export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) { }

 
}
 class CustomValidator{
  static ageLimitValidator(minAge: number, maxAge: number): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any} | null=>{
      if (control.value !==null){
        return isNaN(control.value) ||
        control.value< minAge ||
          control.value> maxAge ? { ageLimit: true} : null;
      }
      return null;
    };
  }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  name="akash";
  trainers= ['Male', 'Female'];
  packages= ['1000', '2000', '3000','3500'];
  

  fitnessForm: FormGroup;
  
  public obj: any = {};
  constructor(private fb: FormBuilder , private service:UserService) { }
  

  ngOnInit() {
    this.fitnessForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      age: ["", [Validators.required, Validators.compose([CustomValidator.ageLimitValidator(18,60)])]],
      phonenumber: ["", [Validators.required]],
      email: ["", [Validators.required]],
      streetaddress: ["", Validators.required],
      city: ["", Validators.required],
        state: ["", Validators.required],
        pincode: ["", [Validators.required]],
        country: ["", [Validators.required]],
      
      physiotherapist: ["", Validators.required],
      trainer: ["", Validators.required],
      
      package: ["", Validators.required],
      inr: ["", Validators.required],
      paisa: ["", Validators.required],

      id: ["", [Validators.required]],

     
    });
    // const fitnessData = new Fitness(null,null,'','','','',null,null,'','','',null,'','','');
  }
  onSubmit() {
    this.obj = { ...this.fitnessForm.value, ...this.obj };
    this.fitnessForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.fitnessForm.value",
      this.fitnessForm.value
    );

    if (this.fitnessForm.valid) {
        
          let firstname =   this.fitnessForm.value.firstname;
          const lastname = this.fitnessForm.value.lastname;
          const age= this.fitnessForm.value.age;
          const number = this.fitnessForm.value.phonenumber;
          const email  = this.fitnessForm.value.email;
          const physiotherapist  = this.fitnessForm.value.physiotherapist;
          const city  = this.fitnessForm.value.city;
          const streetaddress  = this.fitnessForm.value.streetaddress;
          const state= this.fitnessForm.value.state;
          const pincode  = this.fitnessForm.value.pincode;
          const country = this.fitnessForm.value.country;
          const trainer  = this.fitnessForm.value.trainer;
          const fitnessPackage = this.fitnessForm.value.package;
          const inr= this.fitnessForm.value.inr;
          const paisa= this.fitnessForm.value.paisa;
          const id= this.fitnessForm.value.id;
          

          const jsonvar = {
           
            'firstname':firstname,
            'lastname': lastname,
            'number':number,
            'email':email,
            'age': age,
            'physiotherapist': physiotherapist,
            'city': city,
            'streetaddress': streetaddress,
            'state': state,
            'pincode': pincode,
            'country': country,
            'trainer': trainer,
            'fitnessPackage': fitnessPackage,
            'inr': inr,
            'paisa': paisa
            
          
            
          }
          
          const userData= JSON.stringify(jsonvar);
          this.service.postfitnessdata(userData).subscribe(data=>console.log(data));

    }
  }    
}
