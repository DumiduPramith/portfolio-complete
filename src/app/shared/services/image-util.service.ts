import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageUtilService {
  getImageDimensions(base64: string): Promise<[string, string]> {
    return new Promise<[string, string]>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve([img.width.toString(), img.height.toString()]);
      };
      img.onerror = reject;
      img.src = base64;
    });
  }
}
