import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  @Input() title?:string;
  @Input() form!:FormGroup;
  @Output() formSubmitted = new EventEmitter<any>();

  constructor(private _fb:FormBuilder){

  }

  ngOnInit(): void {
    if(!this.form){
      this.form = this._fb.group({});
    }
  }

  onSubmit(){
    if(this.form.valid){
      this.formSubmitted.emit(this.form.value);

    }
  }
}
