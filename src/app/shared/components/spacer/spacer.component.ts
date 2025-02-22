import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spacer',
  standalone: true,
  imports: [],
  templateUrl: './spacer.component.html',
  styleUrl: './spacer.component.scss',
})
export class SpacerComponent {
  @Input({ required: true }) spacer!: string;
}
