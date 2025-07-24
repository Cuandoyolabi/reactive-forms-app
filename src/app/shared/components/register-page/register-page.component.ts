import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ["", [Validators.required, Validators.pattern( FormUtils.namePattern )]],
    email: ["", [Validators.required ,Validators.pattern( FormUtils.emailPattern )]],
    username: ["", [Validators.required, Validators.minLength(6), Validators.pattern( FormUtils.notOnlySpacesPattern)]],

    password: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", Validators.required ],
  }, {
    validators: [
      this.isFieldOneEqualFieldTwo("password", "confirmPassword"),
    ]
  });

  isFieldOneEqualFieldTwo( field1: string, field2: string){
    return ( formGroup: AbstractControl ) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordNotEqual: true };
    };
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }

}
