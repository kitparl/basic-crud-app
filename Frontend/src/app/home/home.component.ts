import { Component, OnInit } from "@angular/core";
import { APIService } from "../service/apiservice.service";
import { Person } from "../models/person";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  persons: Person[] = [];
  regModel: Person = new Person("", "", "", ""); // Initialize regModel
  showNew: boolean = false;
  submitType: string = "Save";
  selectedRow: number;
  selectedPersonId: number;

  constructor(private apiService: APIService) {}

  ngOnInit() {
    this.getPersons();
  }

  getPersons(): void {
    this.apiService.getPersons().subscribe(
      (res: any) => {
        this.persons = this.parseDOBPerson(res.persons);        
      },
      error => {
        console.error(error);
      }
    );
  }

  onNew() {
    this.regModel = new Person("", "", "", "");
    this.submitType = "Save";
    this.showNew = true;
  }

  onSave() {    
    if (this.submitType === "Save") {
      const dobStringified = JSON.stringify(this.regModel.dob);
      this.apiService.createPerson({ ...this.regModel, dob: dobStringified }).subscribe(
        (res: any) => {
          this.getPersons();
        },
        error => {
          console.error(error);
        }
      );
    } else {
      // Update existing

      let editPerson = new Person("", "", "", "")
      if(this.regModel.name){
        editPerson.name = this.regModel.name;
      }
      if(this.regModel.gender){
        editPerson.gender = this.regModel.gender;
      }
      if(this.regModel.dob){
        editPerson.dob = this.regModel.dob;
      }
      if(this.regModel.mobile){
        editPerson.mobile = this.regModel.mobile;
      }
      
      if(this.selectedPersonId){
        const dobStringified = JSON.stringify(editPerson.dob);
        this.apiService.updatePerson(this.selectedPersonId, { ...editPerson, dob: dobStringified }).subscribe(
          (res: any) => {
            this.getPersons();
          },
          error => {
            console.error(error);
          }
        );
      }else{

      }
      



    }

    this.showNew = false;
  }

  onEdit(index: number, id: number) {
    this.selectedPersonId=id
    this.selectedRow = index;
    // Retrieve selected
    this.regModel = Object.assign({}, this.persons[this.selectedRow]);    
    this.submitType = "Update";
    this.showNew = true;
  }

  onDelete(index: number) {

    if(index){
      this.apiService.deletePerson(index).subscribe(
        (res: any) => {
          this.getPersons();
        },
        error => {
          console.error(error);
        }
      );
    }else{

    }

  }

  onCancel() {
    this.showNew = false;
  }

  parseDOBPerson(persons: any[]): Person[] {
    return persons.map(person => {
      return {
        ...person,
        dob: JSON.parse(person.dob)
      } as Person; // Type assertion as Person
    });
  }
}
