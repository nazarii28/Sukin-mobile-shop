import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

const SearchBar = () => {
    return (
        <View style={styles.wrapper}>
          <View style={styles.icon}>
            <FontAwesome name="search" size={20}/> 
          </View>
          <TextInput style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: '100%',
      width: '100%',
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingLeft: 40
    },
    wrapper: {
      position: 'relative',
      height: '100%',
      width: '80%',
    },
    icon: {
      position: 'absolute',
      zIndex: 2,
      left: 10,
      top: 14,
      opacity: .7
    }
  });
  

export default SearchBar;