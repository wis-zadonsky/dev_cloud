import { Component, Input } from '@angular/core';

import { IError } from '../../../core/interfaces/error.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {

  @Input()
  public errors!: IError[];

  constructor() { }

}
