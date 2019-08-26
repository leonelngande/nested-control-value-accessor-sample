import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlContainer, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-form-submit-button',
  templateUrl: './form-submit-button.component.html',
  styleUrls: ['./form-submit-button.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class FormSubmitButtonComponent implements OnInit {

  @Input() submitted = false;

  @Input() leftButtonText = 'Cancel';

  @Output() leftButtonClicked = new EventEmitter<boolean>();

  constructor(
    private controlContainer: FormGroupDirective,
  ) { }

  get form() {
    return this.controlContainer.form;
  }

  ngOnInit() {
  }

  emitLeftButtonClicked() {
    this.leftButtonClicked.emit(true);
  }
}
