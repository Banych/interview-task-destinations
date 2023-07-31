import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CityType } from './models/CityType';
import { CalculationResultsType } from './models/CalculationResults';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const haversineDistanceBetweenPoints = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371e3;
  const p1 = lat1 * Math.PI / 180;
  const p2 = lat2 * Math.PI / 180;
  const deltaLon = lon2 - lon1;
  const deltaLambda = (deltaLon * Math.PI) / 180;
  const d = Math.acos(
    Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda),
  ) * R;
  return d;
}

export const calculateDistanceBetweenCities = (cities: CityType[]): CalculationResultsType[] => {
  return cities.reduce((acc, city, index) => {
    const nextCity = cities[ index + 1 ];
    if (nextCity) {
      const distanceToNextCity = haversineDistanceBetweenPoints(
        city.lat,
        city.lon,
        nextCity.lat,
        nextCity.lon
      );
      acc.push({
        distanceToNextCity,
        city: city
      });
    } else {
      acc.push({
        distanceToNextCity: 0,
        city: city
      });
    }
    return acc;
  }, [] as CalculationResultsType[])
}