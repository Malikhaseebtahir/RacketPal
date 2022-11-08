import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  View,
} from 'react-native';

const GOOGLE_PACKAGE_NAME = 'agrawal.trial.yourfeedback';
const APPLE_STORE_ID = 'id1453817491';

const starImageField =
  'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
const starImageCornet =
  'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

const App = () => {
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [showFeedBackBox, setShowFeedBackBox] = useState(false);
  const [ratingPopup, setRatingPopup] = useState(true);

  useEffect(() => {
    if (defaultRating > 3) {
      setShowFeedBackBox(false);
    } else {
      setShowFeedBackBox(true);
    }
  }, []);

  const openStore = () => {
    //This is the main trick
    if (Platform.OS != 'ios') {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.racketpal&hl=en&gl=US',
      ).catch(err => alert('Please check for Google Play Store'));
    } else {
      Linking.openURL(
        `https://apps.apple.com/gb/app/racketpal-find-sport-partners/${APPLE_STORE_ID}`,
      ).catch(err => alert('Please check for the App Store'));
    }
  };

  const onButtonHandle = item => {
    setDefaultRating(item);
    if (item > 3) {
      openStore();
      setShowFeedBackBox(false);
    } else {
      setShowFeedBackBox(true);
    }
  };

  const onHandleRemindMeLater = () => {
    setRatingPopup(false);
  };

  const handleFeedbackChange = e => {
    setShowFeedBackBox(e);
  };

  const handleSubmitFeedback = () => {
    console.log('called');
  };

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBar}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => onButtonHandle(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? {uri: starImageField}
                    : {uri: starImageCornet}
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {ratingPopup ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.ratingContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>Enjoying RacketPal</Text>
              <Text>Tap a star to rate it on the AppStore</Text>
            </View>
            <CustomRatingBar />
            <Text style={styles.textStyle}>
              {defaultRating + '/' + maxRating.length}
            </Text>
            {showFeedBackBox ? (
              <View>
                <TextInput
                  onChangeText={e => handleFeedbackChange(e)}
                  style={styles.textInput}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.buttonStyle}
                  onPress={() => handleSubmitFeedback()}>
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => onHandleRemindMeLater()}>
                <Text style={styles.remindText}>Remind me later</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      ) : (
        <TouchableOpacity onPress={() => setRatingPopup(true)}>
          <Text>Give feedback</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#D3D3D3',
  },
  ratingContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  textContainer: {
    alignItems: 'center',
  },
  textInput: {
    borderColor: 'yellow',
    borderWidth: 1,
  },
  remindText: {
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    marginTop: 20,
  },
  customRatingBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    padding: 15,
    backgroundColor: 'yellow',
  },
});

export default App;
