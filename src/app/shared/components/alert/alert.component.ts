import { Component, Input } from '@angular/core';

import { IError } from '@app/shared';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {

  @Input()
  public errors!: IError[] | null;

  @Input()
  public successMessage!: string | null;

  constructor() { }

}
