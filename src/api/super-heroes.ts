import {
  QueryFunctionContext,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
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
      // enabled: false, // if uncommented only way to refetch would be via refetch function
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

// CREATE
export type SuccessResponseCreateSuperHero = AxiosResponse<Hero>;

const createSuperHero = () => {
  return axios.post<Hero>(`${BASE_URL}`, {
    name: Date.now(),
    alterEgo: Date.now(),
  });
};

export const useCreateSuperHero = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SuccessResponseCreateSuperHero,
    AxiosError,
    { name: string }
  >(createSuperHero, {
    onSuccess: (data) => {
      // it'll cause "super-heroes" query to refetch
      // queryClient.invalidateQueries(["super-heroes"]);

      // directly update "super-heroes" query w/o making it refetch
      queryClient.setQueryData(["super-heroes"], (oldQueryData: any) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
