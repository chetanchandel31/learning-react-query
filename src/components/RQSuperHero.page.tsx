import { useParams } from "react-router-dom";
import { useGetSuperHeroById } from "../api/super-heroes";

export default function RQSuperHero() {
  const { heroId } = useParams();

  const { isFetching, data, isError, error } = useGetSuperHeroById({
    heroId: heroId as string,
  });

  if (isFetching) return <div>...loading</div>;

  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <h2>Single Super Hero details</h2>

      <div>
        {data?.data.name}: {data?.data.alterEgo}
      </div>
    </>
  );
}
