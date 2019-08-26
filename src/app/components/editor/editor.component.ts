import {AfterViewInit, Component, Input, OnDestroy, OnInit, Optional, Self, ViewChild} from '@angular/core';
import {NgControl} from '@angular/forms';
import {QuillEditorComponent, QuillModules} from 'ngx-quill';
import {BaseControlValueAccessor} from '../../core/form-helpers/base-control-value-accessor';
import {FormOperation} from '../../core/form-operation';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent extends BaseControlValueAccessor<string> implements OnInit, AfterViewInit, OnDestroy {

  @Input() heightInPixels = '150px';
  @Input() theme = 'snow';
  @Input() label;
  @Input() placeholder;
  @Input() sanitize = true;
  @Input() modules: QuillModules = {
    // syntax: true,
    formula: false,
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote'],

      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link'],                         // link and image, video
      // ['link', 'image'],                         // link and image, video
    ],
  };

  @Input() formOperation: FormOperation = 'create';

  @ViewChild('editor', { static: true }) editor: QuillEditorComponent;

  constructor(
    @Self() @Optional() public controlDir: NgControl,
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
  }

  ngAfterViewInit(): void {
  }

  /**
   * Sets the "disabled" property on the input element.
   *
   * @param isDisabled The disabled value
   */
  setDisabledState(isDisabled: boolean): void {
    // disable directly on the editor instance
    this.editor.setDisabledState(isDisabled);
  }

  onModelChange($event) {
    this.onChange($event);
    this.onTouched();
  }

  ngOnDestroy(): void {}
}
