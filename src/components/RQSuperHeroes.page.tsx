import { AxiosError, AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { useCreateSuperHero, useListSuperHeroes } from "../api/super-heroes";
import { Hero } from "../types";

type SuccessResponse = AxiosResponse<Hero[], any>;

const RQSuperHeroes = () => {
  const onSuccess = (data: SuccessResponse) => console.log("yay success");

  const { data, isLoading, error, isError, isFetching, refetch } =
    useListSuperHeroes({ onSuccess });

  console.log({ isLoading, isFetching, data }, "loading");

  const { mutate } = useCreateSuperHero();

  if (isFetching) return <h2>loading..</h2>;

  // `instace of` check isn't needed when using generics with `useQuery`
  if (isError) return <h2>{error instanceof AxiosError && error?.message}</h2>; // any error from BE will be in `error.response.something..`

  return (
    <>
      <h2>RQ super heroes</h2>
      {isFetching && <h3>Refreshing</h3>}

      <button onClick={() => refetch()}>get data</button>
      <button onClick={() => mutate({ name: "aaa" })}>create hero</button>

      <div>
        {data?.data.map((hero) => (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default RQSuperHeroes;
