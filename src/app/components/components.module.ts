import {NgModule} from '@angular/core';
import {QuillModule} from 'ngx-quill';
import {EditorComponent} from './editor/editor.component';
import {FormSubmitButtonComponent} from './form-submit-button/form-submit-button.component';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

const ENTRY_COMPONENTS = [
  ConfirmModalComponent,
];

const COMPONENTS = [
  EditorComponent,
  FormSubmitButtonComponent,
  ...ENTRY_COMPONENTS,
];

const BASE_MODULES = [
  // NgbModule,
  QuillModule,
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
];

@NgModule({
  imports: [
    ...BASE_MODULES,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, BASE_MODULES],
  entryComponents: [...ENTRY_COMPONENTS],
})

export class ComponentsModule { }
