import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder)
  FormUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      this.fb.control("Metal Gear", Validators.required),
      this.fb.control("Death Stranding", Validators.required),
    ],Validators.minLength(2)),
  });

  newFavorite = new FormControl('', Validators.required);

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites(){
    console.log("Si llega aqui")
    if(this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;
    console.log(newGame)
    console.log("Si se activa")
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();

  }

  onSubmit(){
    this.myForm.markAsTouched();
  }

}


