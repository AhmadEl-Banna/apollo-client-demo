import { mutation } from "react-apollo";
import gql from "graphql-tag";
import { draftQuery } from "../queries/withDrafts";
const query = gql`
  mutation($text: String!, $title: String!) {
    createDraft(text: $text, title: $title) {
      id
      title
      text
      isPublished
    }
  }
`;

export default mutation(query, {
  props: props => ({
    createDraft: async (text: string, title: string) => {
      const result = await props.mutate({
        variables: { title: title, text: text },
        refetchQueries: [
          {
            query: draftQuery
          }
        ]
      });
    }
  })
});
