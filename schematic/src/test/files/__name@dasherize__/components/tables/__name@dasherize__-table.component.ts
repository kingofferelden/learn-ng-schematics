import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '<%= dasherize(name) %>-table',
  templateUrl: './<%= dasherize(name) %>-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class <%= classify(name) %>TableComponent {
    @Input() public data = null;
}
