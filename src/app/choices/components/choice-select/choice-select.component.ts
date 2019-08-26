import {Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self, ViewChild,} from '@angular/core';
import {FormBuilder, FormGroup, NgControl, Validators} from '@angular/forms';
import {concat, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap, takeWhile, tap} from 'rxjs/operators';
import {choices, IChoice} from '../../state/choice.model';
import {NgSelectComponent} from '@ng-select/ng-select';
import {BaseControlValueAccessor} from '../../../core/form-helpers/base-control-value-accessor';
import {FormOperation} from '../../../core/form-operation';

@Component({
  selector: 'app-choice-select',
  templateUrl: './choice-select.component.html',
  styleUrls: ['./choice-select.component.scss'],
})
export class ChoiceSelectComponent extends BaseControlValueAccessor<IChoice> implements OnInit, OnDestroy {

  form: FormGroup;
  searchLoading = false;
  searchResult$: Observable<IChoice[]>;
  searchInput$ = new Subject<string>();
  alive = true;
  @Input() formOperation: FormOperation = 'create';
  @Input() label: string;
  @Input() placeholder = 'Start typing `choice`';
  /**
   * Form state passed into component
   */
    // tslint:disable-next-line:variable-name
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

  @Output() choiceSelected = new EventEmitter<IChoice>();

  @ViewChild('ngSelect', { static: true }) ngSelect: NgSelectComponent;

  constructor(
    @Self() @Optional() public controlDir: NgControl,
    private fb: FormBuilder,
  ) {
    super();

    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  get control() {
    return this.controlDir && this.controlDir.control;
  }

  ngOnInit() {
    this.search();
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

  private initForm() {
    this.form = this.fb.group({
      id: [this.formData && this.formData.id],
      choice: [this.formData && this.formData.choice, Validators.required],
    });
  }

  private search() {
    this.searchResult$ = concat(
      of(this.defaultSearchValue()), // default items
      this.searchInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.searchLoading = true),
        switchMap(term => {
            return of(choices)
              .pipe(
                catchError(() => of([])), // empty list on error
                tap(() => this.searchLoading = false),
              );
          },
        ),
      ),
    );
  }

  trackByFn(item: IChoice) {
    return item.id;
  }

  /**
   * Sets the "disabled" property on the input element.
   *
   * @param isDisabled The disabled value
   */
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public writeValue(obj: IChoice): void {
    this.formData = obj;
    // this.setSelected(obj);
  }

  private get choice() {
    return this.form.get('choice');
  }

  onModelChange($event) {
    // update choice value since it has no formControl binding in the template
    this.choiceSelected.emit($event);
    this.choice.setValue($event && $event.choice);
    this.onChange($event);
    this.onTouched();
  }

  private defaultSearchValue(): IChoice[] {
    return this.formData ? [this.formData] : [];
  }
}
