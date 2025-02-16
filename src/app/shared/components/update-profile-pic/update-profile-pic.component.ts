import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-profile-pic',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './update-profile-pic.component.html',
  styleUrl: './update-profile-pic.component.scss',
})
export class UpdateProfilePicComponent {
  @Input({ required: true }) profilePictureForm!: FormGroup;

  faTimes = faTimes;
  oldValue: any = '';

  onFileChange(event: Event) {
    this.oldValue = this.profilePictureForm.get('profilePictureUrl')?.value;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Update the live preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const preview = document.getElementById(
          'profilePreview'
        ) as HTMLImageElement;
        preview.src = e.target.result;

        console.log(preview);
        // Update the form control values
        this.profilePictureForm.patchValue({
          profilePictureUrl: e.target.result, // Set the data URL
          isChanged: true, // Set isChanged to true
        });
      };
      reader.readAsDataURL(file);
    }
  }

  clearFileInput() {
    this.profilePictureForm.patchValue({
      profilePictureUrl: this.oldValue,
      isChanged: false,
    });
    const fileInput = document.getElementById(
      'profilePicture'
    ) as HTMLInputElement;
    fileInput.value = '';
    const preview = document.getElementById(
      'profilePreview'
    ) as HTMLImageElement;
    preview.src = this.oldValue;
  }
}
