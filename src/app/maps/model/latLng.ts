import { LatLngSteps } from './latLngSteps';

export class LatLng {

  constructor(
    public srcLat: number,
    public srcLng: number,
    public dstLat: number,
    public dstLng: number,
    public latLngSteps: Array<LatLngSteps>
  ) { }

}
