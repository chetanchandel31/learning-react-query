import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Hero } from "../types";

// list super heroes
type SuccessResponse = AxiosResponse<Hero[], any>;

const fetchSuperHeroes = () => {
  return axios.get<Hero[]>("http://localhost:4000/superheroes");
};

const useListSuperHeroes = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: SuccessResponse) => void;
  onError?: (data: AxiosError) => void;
}) => {
  return useQuery<SuccessResponse, AxiosError>(
    ["super-heroes"],
    fetchSuperHeroes,
    {
      enabled: false,
      onSuccess,
      onError,
    }
  );
};

// similarly can add hooks here for other relating endpoints
// actually files within folder would be better
// export success response type also

export { useListSuperHeroes };
