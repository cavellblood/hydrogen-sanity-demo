import groq from 'groq';
import useSanityQuery from '../hooks/useSanityQuery';
import type {SanityHomePage} from '../types';

export default function IndexRoute() {
  const {data: entry} = useSanityQuery<SanityHomePage>({
    query: QUERY_SANITY_HOMEPAGE,
  });

  console.log('hello from the server component');

  if (!entry) {
    // @ts-expect-error <NotFound> doesn't require response
    return <h1>Not Found</h1>;
  }

  return (
    <div>
      {entry.panels.map((panel, indexZero) => {
        return <h1 key={panel._id}>{panel.title}</h1>;
      })}
    </div>
  );
}

const QUERY_SANITY_HOMEPAGE = groq`
*[_type == 'home'][0]{
  ...,
  panels[]-> {
    ...
  }
}
`;
