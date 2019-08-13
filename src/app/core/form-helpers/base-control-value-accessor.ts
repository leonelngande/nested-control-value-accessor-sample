import { ControlValueAccessor } from '@angular/forms';

export class BaseControlValueAccessor<T> implements ControlValueAccessor {

  public disabled = false;

  /**
   * Call when value has changed programmatically
   */
  public value: T;
  public onChange(newVal: T) {}
  public onTouched(_?: any) {}

  /**
   * Every time the form control is being updated from the parent
   *
   * @param obj
   */
  public writeValue(obj: T): void { this.value = obj; }

  /**
   * When we want to let the parent know that the value of the form control should be updated
   * @param fn
   */
  public registerOnChange(fn: any): void { this.onChange = fn; }

  /**
   * When we want to let the parent know that the form control has been touched
   * @param fn
   */
  public registerOnTouched(fn: any): void { this.onTouched = fn; }

  /**
   * When the parent updates the state of the form control
   *
   * @param isDisabled
   */
  public setDisabledState?(isDisabled: boolean): void { this.disabled = isDisabled; }
}
