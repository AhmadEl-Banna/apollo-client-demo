import { query } from "react-apollo";
import gql from "graphql-tag";

export const draftQuery = gql`
query{
  drafts{
    id
    title
    text
  }
}
`

export default query(draftQuery,{name:'draftQuery'})