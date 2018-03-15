import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  ScrollView
} from "react-native";
import { compose } from "react-apollo";

import WithDraftsQuery, { draftQuery } from "../../apollo/queries/withDrafts";
import WithPublish from "../../apollo/mutation/withPublish";
import WithCreateDraft from "../../apollo/mutation/withCreateDraft";

class App extends React.Component<{}> {
  state = {
    text: "",
    title: ""
  };
  render() {
    const { draftQuery: { drafts, loading } } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={value => {
            this.setState({ title: value });
          }}
          style={{
            width: 200,
            height: 30,
            borderColor: "grey",
            borderWidth: 1,
            margin: 10
          }}
        />
        <TextInput
          onChangeText={value => {
            this.setState({ text: value });
          }}
          style={{
            width: 200,
            height: 30,
            borderColor: "grey",
            borderWidth: 1,
            margin: 10
          }}
        />
        <Button
          title="New Draft"
          onPress={() => {
            try {
              this.props.createDraft(this.state.text, this.state.title);
            } catch (error) {
              console.log(error);
            }
          }}
        />

        {loading ? (
          <Text>Loading</Text>
        ) : (
          <ScrollView style={{ paddingTop: 100 }}>
            {drafts.map(item => (
              <View>
                <Text>{item.title}</Text>
                <Text>{item.text}</Text>
                <Button
                  title={"Publish"}
                  onPress={async () => {
                    try {
                      const published = await this.props.publish({
                        variables: { id: item.id },
                        refetchQueries: [
                          {
                            query: draftQuery
                          }
                        ]
                      });
                      console.log(published);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

// export default WithCreateDraft(WithPublish(withDraftsQuery(App)));
export default compose(WithCreateDraft, WithPublish, WithDraftsQuery)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
