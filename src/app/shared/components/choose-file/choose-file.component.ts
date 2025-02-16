import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-choose-file',
  standalone: true,
  imports: [],
  templateUrl: './choose-file.component.html',
  styleUrl: './choose-file.component.scss',
})
export class ChooseFileComponent {
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) accept: string = '';
}
