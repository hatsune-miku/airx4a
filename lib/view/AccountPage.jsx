import {Icon, ListItem} from '@rneui/themed';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function AccountPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.userInfoArea}>
          <Text style={styles.prefix}>Good morning,</Text>
          <Text style={styles.username}>username</Text>
          <Text>UID: 1001</Text>
        </View>
      </View>
      {accountOptions.map((opt, i) => (
        <ListItem
          key={i}
          Component={TouchableHighlight}
          onPress={() => console.log('pressed')}
          bottomDivider>
          <Icon name="key" type="material-community" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Logout</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </SafeAreaView>
  );
}

const accountOptions = [
  {
    title: 'Logout',
  },
];

const styles = StyleSheet.create({
  container: {},
  card: {
    marginTop: 24,
    marginHorizontal: 24,
    height: 64,
  },
  topView: {
    height: 128,
    justifyContent: 'flex-end',
  },
  userInfoArea: {
    margin: 16,
  },
  prefix: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 36,
    color: '#6f9dab',
    fontWeight: 'bold',
  },
});

export default AccountPage;
