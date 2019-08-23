import { NgModule } from '@angular/core';

import { DashboardCommonModule } from 'common/dashboard-common.module';
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';
import { <%= classify(name) %>RoutingModule } from './<%= dasherize(name) %>-routing.module';
import { Api<%= classify(name) %>ClientService } from './services/<%= dasherize(name) %>.service';

@NgModule({
  imports: [DashboardCommonModule, <%= classify(name) %>RoutingModule],
  declarations: [<%= classify(name) %>Component],
  providers: [Api<%= classify(name) %>ClientService]
})
export class <%= classify(name) %>Module {


}



