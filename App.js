import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Pressable,
  Linking,
  Modal,
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
  const [feedBackMessage, setFeedBackMessage] = useState('');
  const [showFeedBackMessageBox, setShowFeedBackMessageBox] = useState(false);
  const [ratingModal, setRatingModal] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (defaultRating > 3) {
      setShowFeedBackMessageBox(false);
    } else {
      setShowFeedBackMessageBox(true);
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
      setRatingModal(false);
      setShowFeedBackMessageBox(false);
    } else {
      setShowFeedBackMessageBox(true);
    }
  };

  const onHandleRemindMeLater = () => {
    setRatingModal(false);
  };

  const handleFeedbackChange = e => {
    setFeedBackMessage(e);
  };

  const handleSubmitFeedback = () => {
    setRatingModal(false);
    setModalVisible(false);
    console.log('Handle Submit button -> ', feedBackMessage);
  };

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBar}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              style={styles.starContainer}
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
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.container}>
          <SafeAreaView style={styles.container}>
            <View style={styles.ratingContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Enjoying RacketPal?</Text>
                <Text>Tap a star to rate it on the AppStore</Text>
              </View>
              <CustomRatingBar />
              {/* <Text style={styles.textStyle}>
              {defaultRating + '/' + maxRating.length}
            </Text> */}
              {showFeedBackMessageBox ? (
                <View>
                  <Text style={styles.feedbackHeadingText}>
                    Any feedback for us?
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={e => handleFeedbackChange(e)}
                    style={styles.textInput}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.buttonStyle}
                    onPress={() => handleSubmitFeedback()}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={() => onHandleRemindMeLater()}>
                  <Text style={styles.remindText}>Remind me later</Text>
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    backgroundColor: '#D3D3D3',
  },
  ratingContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  starContainer: {
    padding: 10,
    marginTop: -30,
  },
  textContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  textInput: {
    borderColor: '#ccad00',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginTop: 4,
    height: 100,
  },
  remindText: {
    alignSelf: 'center',
    marginTop: 40,
    color: 'grey',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 20,
  },
  feedbackHeadingText: {
    marginTop: 10,
    marginBottom: 4,
    color: '#ccad00',
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
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#ccad00',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
