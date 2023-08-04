import {Button, Card, ListItem} from '@rneui/themed';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

function FilesPage() {
  return (
    <ScrollView>
      <View style={styles.topView}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>Files</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <Text style={styles.filetype}>Receiving</Text>
            <Text style={styles.filename}>sample.pdf</Text>
            <Text style={styles.filesize}>12.2 MB</Text>
          </View>
          <View style={styles.operations}>
            <Text style={styles.button}>Stop</Text>
            <ProgressBar
              style={styles.progressBar}
              progress={0.6}
              color="#6f9dab"
            />
          </View>
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.filetype}>Received</Text>
            <Text style={styles.filename}>model.ckpt</Text>
            <Text style={styles.filesize}>1.5 GB</Text>
          </View>
          <View style={styles.operations}>
            <Text style={styles.button}>Share</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.filetype}>Sending</Text>
            <Text style={styles.filename}>resume.docx</Text>
            <Text style={styles.filesize}>139.0 KB</Text>
          </View>
          <View style={styles.operations}>
            <Text style={styles.button}>Cancel</Text>
            <ProgressBar
              style={styles.progressBar}
              progress={0.12}
              color="#6f9dab"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

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
  group: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'darkgrey',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    backgroundColor: '#e1e1e1',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filetype: {
    marginBottom: 8,
  },
  filename: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  filesize: {
    fontSize: 18,
  },
  operations: {
    marginTop: 16,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#eeeeee',
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 32,
    width: 82,
    lineHeight: 32,
    textAlign: 'center',
    display: 'flex',
  },
  progressBar: {
    width: 82,
    borderRadius: 4,
    backgroundColor: '#eeeeee',
    marginTop: 8,
    height: 6,
  },
});

export default FilesPage;
