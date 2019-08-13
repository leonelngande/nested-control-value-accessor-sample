import {Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {IChoice} from '../../state/choice.model';
import {FormBuilder, FormGroup, NgControl, Validators} from '@angular/forms';
import {BaseControlValueAccessor} from '../../../core/form-helpers/base-control-value-accessor';
import {FormOperation} from '../../../core/form-operation';

@Component({
  selector: 'xc-choice-form',
  templateUrl: './choice-form.component.html',
  styleUrls: ['./choice-form.component.scss'],
})
export class ChoiceFormComponent extends BaseControlValueAccessor<IChoice> implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  showMessages: any = {};
  errors: string[] = [];
  messages: string[] = [];
  alive = true;

  @Input() hasSubmitButton = true;
  /**
   * Form state passed into component
   */
  private _formData: IChoice = null;
  @Input() set formData(formData: IChoice) {
    this._formData = formData;

    if (this.form) {
      const formDataCopy = {...formData};
      this.form.setValue(formDataCopy, { emitEvent: false });

      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }
  get formData() {
    return this._formData;
  }

  @Input() formOperation: FormOperation = 'create';

  @Output() onSubmit = new EventEmitter<IChoice>();

  constructor(
    @Self() @Optional() public controlDir: NgControl,
    private fb: FormBuilder,
  ) {
    super();

    if (controlDir) controlDir.valueAccessor = this;
  }

  get control() {
    return this.controlDir && this.controlDir.control;
  }

  ngOnInit() {
    this.initForm();

    this.form.valueChanges.pipe(
        takeWhile(_ => this.alive),
      )
      .subscribe(value => {
        this.onChange(value);
        this.onTouched();
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  get choice() {
    return this.form.get('choice');
  }

  private initForm() {
    this.form = this.fb.group({
      id: [this.formData && this.formData.id],
      choice: [this.formData && this.formData.choice, Validators.required],
    });
  }

  submit(formData: IChoice) {
    this.errors = this.messages = [];
    this.submitted = true;

    this.onSubmit.emit(formData);
  }

  get canShowSubmitButton() {
    return (this.formOperation !== 'view') && this.hasSubmitButton;
  }

  writeValue(obj: IChoice): void {
    this.formData = obj;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
