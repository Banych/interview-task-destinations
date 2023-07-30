import { CityType } from "./CityType";

export type SearchFormModel = {
  origin: CityType;
  destinations: Partial<CityType>[];
  passengers: number;
  date: string;
}