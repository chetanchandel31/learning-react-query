import {
  QueryFunctionContext,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Hero } from "../types";

const BASE_URL = "http://localhost:4000/superheroes";

// list super heroes
export type SuccessResponseListSuperHeroes = AxiosResponse<Hero[], any>;

const fetchSuperHeroes = () => {
  return axios.get<Hero[]>(BASE_URL);
};

export const useListSuperHeroes = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: SuccessResponseListSuperHeroes) => void;
  onError?: (data: AxiosError) => void;
}) => {
  return useQuery<SuccessResponseListSuperHeroes, AxiosError>(
    ["super-heroes"],
    fetchSuperHeroes,
    {
      enabled: false,
      onSuccess,
      onError,
    }
  );
};

// actually files within folder would be better

export type SuccessResponseGetSuperHeroById = AxiosResponse<Hero, any>;

const fetchSuperHero = ({ queryKey }: QueryFunctionContext<QueryKey, any>) => {
  const heroId = queryKey[1];

  return axios.get<Hero>(`${BASE_URL}/${heroId}`);
};

export const useGetSuperHeroById = ({ heroId }: { heroId: string }) => {
  return useQuery<SuccessResponseGetSuperHeroById, AxiosError>(
    ["super-hero", heroId],
    fetchSuperHero
  );
};
