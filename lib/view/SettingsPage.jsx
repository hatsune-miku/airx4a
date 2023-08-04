import {Icon, ListItem} from '@rneui/themed';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

function SettingsPage() {
  return (
    <ScrollView>
      <View style={styles.topView}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>Preferences</Text>
        </View>
      </View>
      <View style={styles.container}>
        {options.map((group, i) => {
          return (
            <View>
              {group.name ? (
                <Text key={`gn${i}`} style={styles.group}>
                  {group.name.toLocaleUpperCase()}
                </Text>
              ) : (
                <View key={`gn${i}`} style={styles.groupNoTitle} />
              )}
              <View key={`gi${i}`} style={styles.listView}>
                {group.items.map((opt, j) => {
                  return (
                    <ListItem
                      key={`${i}${j}`}
                      Component={TouchableHighlight}
                      onPress={opt.onClicked}
                      bottomDivider>
                      <Icon
                        name={opt.icon}
                        type="material-community"
                        color="grey"
                      />
                      <ListItem.Content>
                        <ListItem.Title>{opt.title}</ListItem.Title>
                        {opt.subtitle && (
                          <ListItem.Subtitle style={styles.subtitle}>
                            {opt.subtitle}
                          </ListItem.Subtitle>
                        )}
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const options = [
  {
    name: 'General',
    items: [
      {
        icon: 'cog',
        title: 'LAN Group Identifier',
        subtitle: '0',
      },
    ],
  },
  {
    items: [
      {
        icon: 'cog',
        title: 'LAN Discovery Server Port',
        subtitle: '9818',
        onClicked: () => console.log('clicked'),
      },
      {
        icon: 'cog',
        title: 'LAN Discovery Client Port',
        subtitle: '0',
        onClicked: () => console.log('clicked'),
      },
      {
        icon: 'cog',
        title: 'Data Service Port',
        subtitle: '9819',
        onClicked: () => console.log('clicked'),
      },
    ],
  },
  {
    name: 'Advanced',
    items: [
      {
        icon: 'cog',
        title: 'Clipboard Uploader',
        subtitle:
          'Share clipboard content with my other devices over the Internet',
        onClicked: () => console.log('clicked'),
      },
      {
        icon: 'cog',
        title: 'Clipboard Receiver',
        subtitle:
          'Receive clipboard content from my other devices over the Internet',
        onClicked: () => console.log('clicked'),
      },
    ],
  },
  {
    name: 'Developer',
    items: [
      {
        icon: 'cog',
        title: 'Developer Console',
        onClicked: () => console.log('clicked'),
      },
    ],
  },
];

const styles = StyleSheet.create({
  topView: {
    height: 128,
    justifyContent: 'flex-end',
  },
  titleArea: {
    margin: 16,
  },
  title: {
    fontSize: 36,
    color: '#6f9dab',
    fontWeight: 'bold',
  },
  container: {},
  listView: {
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  subtitle: {
    color: 'grey',
  },
  group: {
    color: 'darkgray',
    fontWeight: 'bold',
    marginLeft: 24,
    marginTop: 12,
    marginBottom: 6,
  },
  groupNoTitle: {
    height: 12,
  },
});

export default SettingsPage;
