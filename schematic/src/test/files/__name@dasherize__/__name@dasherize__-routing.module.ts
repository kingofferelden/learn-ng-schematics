import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: <%= classify(name) %>Component}])],
  exports: [RouterModule]
})
export class <%= classify(name) %>RoutingModule {}
