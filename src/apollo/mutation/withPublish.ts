import { mutation } from "react-apollo";
import gql from "graphql-tag";

const query = gql`
mutation($id: ID!) {
    publish(id: $id) {
      id
      text
      title
      isPublished
    }
  }
`

export default mutation(query,{name:'publish'})