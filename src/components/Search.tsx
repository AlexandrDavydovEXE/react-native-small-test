import React, { useState} from 'react';
import {
  Platform,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

const SearchInput = ({submit}: any) => {
  const [text, setText] = useState<string>('');

  const onChangeText = (t: string) => {
    setText(t);
  };

  const onSubmitEditing = () => {
    submit(text)
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
      keyboardVerticalOffset={24}>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder="Search"
        style={styles.input}
        enterKeyHint="search"
        clearButtonMode="while-editing"
      />
    </KeyboardAvoidingView>
  );
};

export default SearchInput

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    marginTop: 'auto',
    borderRadius: 8,
    marginLeft: -8,
    marginRight: -8,
  },
  input: {
    fontSize: 22,
    width: '100%',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
});
