import { Router } from '@angular/router';
import { AnimaisService } from './../animais.service';
import { FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.css']
})
export class NovoAnimalComponent implements OnInit {

  formularioAnimal!: FormGroup;
  file!: File;
  preview!: string;
  percentualConcluido = 0;

  constructor(
    private animaisService: AnimaisService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formularioAnimal = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    })
  }
  upload() {
    const allowComments = this.formularioAnimal.get('allowComments')?.value ?? false;
    const descripton = this.formularioAnimal.get('descripton')?.value ?? '';

    this.animaisService.upload(descripton, allowComments, this.file)
      .pipe(
        finalize(() => this.router.navigate(['animais'])))
        .subscribe(
        (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          const total = event.total ?? 1;
          this.percentualConcluido = Math.round(100 * (event.loaded / total));
        }
      },
        (error) => console.log(error))

  }

  gravarArquivo(arquivo: any): void {
    const [file] = arquivo?.files;
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file)
  }

}