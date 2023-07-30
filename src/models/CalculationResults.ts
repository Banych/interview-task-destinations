import { CityType } from "./CityType";

export type CalculationResultsType = {
  distance: number;
  cities: [ CityType, CityType ];
}