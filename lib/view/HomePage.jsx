import {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AirX from '../native/libairx';

function HomePage() {
  const [libairxVersion, setLibairxVersion] = useState('');
  const [libairxCompatibilityNumber, setLibairxCompatibilityNumber] =
    useState('');
  const [libairxVersionString, setLibairxVersionString] = useState('');
  const [airXVersion, setAirXVersion] = useState('');
  const updateVersions = async () => {
    const versionCode = await AirX.getAirXVersion();
    const compatibilityNumber = await AirX.getAirXCompatibilityNumber();
    const versionDescription = await AirX.getAirXVersionString();

    setLibairxVersion(versionCode);
    setLibairxCompatibilityNumber(compatibilityNumber);
    setLibairxVersionString(versionDescription);

    setAirXVersion(
      `${versionCode} (${compatibilityNumber}) - ${versionDescription}`,
    );
  };
  useEffect(() => {
    updateVersions();
  }, []);

  const data = [
    {
      key: 'AirX Android Frontend Version',
      value: '1',
    },
    {
      key: 'libairx Version',
      value: libairxVersion,
    },
    {
      key: 'libairx Compatibility Number',
      value: libairxCompatibilityNumber,
    },
    {
      key: 'libairx Version Code',
      value: libairxVersionString,
    },
    {
      key: 'libairx JNI Bridge Version',
      value: '1 (Rust, aarch64, API 33)',
    },
    {
      key: 'React Version',
      value: '18.2.0',
    },
    {
      key: 'React Native Version',
      value: '0.72.3',
    },
  ];

  return (
    <ScrollView>
      <View style={styles.topView}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>Dashboard</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.cardPrimary}>
          <Text style={styles.cardTitle}>AirX Service Online</Text>
          <Text style={styles.cardSubtitle}>{airXVersion}</Text>
        </View>
        <View style={styles.cardSecondary}>
          {data.map((d, i) => (
            <View key={i} style={styles.dataBlock}>
              <Text style={styles.cardDataTitle}>{d.key}</Text>
              <Text style={styles.cardDataSubtitle}>{d.value}</Text>
            </View>
          ))}
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
  cardPrimary: {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    backgroundColor: '#abcad6',
  },
  cardSecondary: {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    backgroundColor: '#e1e1e1',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f2d2b',
  },
  cardSubtitle: {},
  dataBlock: {
    marginBottom: 16,
  },
  cardDataTitle: {
    fontWeight: 'bold',
  },
  cardDataSubtitle: {
    color: 'black',
  },
});

export default HomePage;
