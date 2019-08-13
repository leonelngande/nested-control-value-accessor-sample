import {ChoiceFormComponent} from './components/choice-form/choice-form.component';
import {ChoiceSelectComponent} from './components/choice-select/choice-select.component';
import {ComponentsModule} from '../components/components.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgModule} from '@angular/core';

const ENTRY_COMPONENTS = [
];

const COMPONENTS = [
  ...ENTRY_COMPONENTS,
  ChoiceFormComponent,
  ChoiceSelectComponent,
];

const DIRECTIVES = [
    //
];

const BASE_MODULES = [
  ComponentsModule,
  NgSelectModule,
];

// @ts-ignore
@NgModule({
    imports: [
      ...BASE_MODULES,
    ],
    declarations: [...COMPONENTS, ...DIRECTIVES],
    exports: [...COMPONENTS, ...DIRECTIVES, ...BASE_MODULES],
    entryComponents: [...ENTRY_COMPONENTS],
})

export class ChoiceWidgetsModule { }
