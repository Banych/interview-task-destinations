import data from './data'
import { CityType } from '../models/CityType';
import { calculateDistanceBetweenCities } from '../utils';

const duration = 500;

export const fetch = (search: string) =>
  new Promise<CityType[]>((res, rej) => {
    if (search.toLowerCase() === 'dijon') {
      setTimeout(() => rej('Dijon is not a city'), 500)
    }
    setTimeout(() => {
      const cities = data.filter((city =>
        city[ 0 ]
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      ))
        .map(([
          name,
          lat,
          lon
        ]): CityType => ({
          lat,
          lon,
          name: name
        }))
      if (cities.length === 0) {
        rej('No city found')
      } else {
        res(cities);
      }
    }, duration)
  });

export const calculateDistances = (cities: CityType[]) =>
  new Promise<ReturnType<typeof calculateDistanceBetweenCities>>((res) => {
    setTimeout(() => {
      res(calculateDistanceBetweenCities(cities));
    }, duration);
  })