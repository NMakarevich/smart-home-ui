import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemInterface } from '../interfaces/smart-home-response';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly http = inject(HttpClient);

  toggleDevice(deviceId: string, state: boolean) {
    return this.http.patch<ItemInterface>(
      `/devices/${deviceId}`,
      { state },
      { observe: 'response' },
    );
  }
}
