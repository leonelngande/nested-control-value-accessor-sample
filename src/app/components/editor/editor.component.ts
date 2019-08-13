import {AfterViewInit, Component, Input, OnDestroy, OnInit, Optional, Self, ViewChild} from '@angular/core';
import {NgControl} from '@angular/forms';
import {QuillEditorComponent, QuillModules} from 'ngx-quill';
import {untilDestroyed} from 'ngx-take-until-destroy';
import Quill from 'quill';
import {BaseControlValueAccessor} from '../../core/form-helpers/base-control-value-accessor';
import {FormOperation} from '../../core/form-operation';

@Component({
  selector: 'xc-editor',
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
    formula: true,
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

      ['formula'],

      ['link'],                         // link and image, video
      // ['link', 'image'],                         // link and image, video
    ],
  };

  @Input() formOperation: FormOperation = 'create';

  @ViewChild('editor') editor: QuillEditorComponent;

  constructor(
    @Self() @Optional() public controlDir: NgControl,
  ) {
    super();

    controlDir.valueAccessor = this;
  }

  get control() {
    return this.controlDir && this.controlDir.control;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  /**
   * @see https://github.com/quilljs/quill/issues/1184#issuecomment-384935594
   */
  private stripTextFormattingOnPaste() {
    this.editor.quillEditor.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      delta.ops = delta.ops.map(op => {
        return {
          insert: op.insert,
        };
      });
      return delta;
    });
  }

  /**
   * @see https://github.com/quilljs/quill/issues/1184#issuecomment-384935594
   */
  private enableTextOnlyPasting() {
    this.editor.quillEditor.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      const ops = [];
      delta.ops.forEach(op => {
        if (op.insert && typeof op.insert === 'string') {
          ops.push({
            insert: op.insert,
          });
        }
      });
      delta.ops = ops;
      return delta;
    });
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
