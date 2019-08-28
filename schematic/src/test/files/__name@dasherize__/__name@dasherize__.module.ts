import { NgModule } from '@angular/core';

import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';
import { <%= classify(name) %>RoutingModule } from './<%= dasherize(name) %>-routing.module';
import { Api<%= classify(name) %>Client } from './clients/<%= dasherize(name) %>.client';
import { <%= classify(name) %>CommonComponent } from './components/common/<%= dasherize(name) %>-common.component';

@NgModule({
  imports: [<%= classify(name) %>RoutingModule],
  declarations: [<%= classify(name) %>Component, <%= classify(name) %>CommonComponent],
  providers: [Api<%= classify(name) %>Client]
})
export class <%= classify(name) %>Module {}
