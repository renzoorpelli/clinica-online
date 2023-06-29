import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Usuario } from 'src/app/interfaces/Usuario';
import { EspecialistaService } from 'src/app/services/Especialista/especialista.service';
import { PDFService } from 'src/app/services/File/pdf.service';

@Component({
  selector: 'app-historia-clinica-paciente',
  templateUrl: './historia-clinica-paciente.component.html',
  styleUrls: ['./historia-clinica-paciente.component.css']
})
export class HistoriaClinicaPacienteComponent implements OnInit{

  formHistoriaClinica!: FormGroup;
  @Input() pacientFromComponent!:Paciente;

  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal, private _specialistService: EspecialistaService){

  }
  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.formHistoriaClinica = new FormGroup({
      peso: new FormControl('', [Validators.required, Validators.min(50)]),
      altura: new FormControl('', [Validators.required, Validators.min(100)]),
      temperatura: new FormControl('', [Validators.required]),
      presion: new FormControl('', [Validators.required]),
      keyValuePairs: this.formBuilder.array([])
    });
  }

  addKeyValuePair(): void {
    this.getKeyValuePairs.push(this.formBuilder.group({
      key: '',
      value: ''
    }));
  }

  get getKeyValuePairs() {
    return this.formHistoriaClinica.get('keyValuePairs') as FormArray;
  }

  removeKeyValuePair(index: number): void {
    this.getKeyValuePairs.removeAt(index);
  }


  onSubmitEventHandler() {
    //console.log(this.formHistoriaClinica.value)
    let valuesForm = this.formHistoriaClinica.value;
    if(this.formHistoriaClinica.valid && valuesForm.keyValuePairs[0].key !== ""){

      const clinicHistory: any = {
        altura: valuesForm.altura,
        peso: valuesForm.peso,
        temperatura: valuesForm.temperatura,
        presion: valuesForm.presion,
        keyValuePairs: valuesForm.keyValuePairs
      }

      this._specialistService.setClinicHistoryToPacient(this.pacientFromComponent, clinicHistory);


      this.activeModal.close();
    }
  }
}
