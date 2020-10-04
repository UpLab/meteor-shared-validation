import { useQuery, gql } from '@apollo/react-hooks';
import { extractGQLResult } from '/imports/ui/utils/graphql';

export const BOOKS_QUERY = gql`
  query books {
    books {
      _id
      title
      author
      createdAt
    }
  }
`;

export default function useBooksListQuery() {
  const { data, loading, error, refetch, ...rest } = useQuery(BOOKS_QUERY);
  const books = extractGQLResult(data);

  return { books, loading, error, refetch, ...rest };
}
