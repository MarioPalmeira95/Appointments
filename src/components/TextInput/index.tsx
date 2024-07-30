import React from 'react';
import { Field } from 'react-final-form';
import { StyleSheet, Text, TextInput as TextInputRN } from 'react-native';

const styles = StyleSheet.create({
  inputBase: {
    height: 40,
    marginTop: 12,
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
  },
  defaultColor: {
    borderWidth: 1,
    borderColor: 'grey',
  },
  errorColor: {
    borderWidth: 2,
    borderColor: 'red',
  },
  errorText: {
    paddingLeft: 4,
    color: 'red',
  },
});

type TextInputPropsType = {
  name: string;
  type?: 'text' | 'email' | 'numeric';
  placeholder: string;
  validation?: (value: any) => void;
};

const TextInput = ({
  name,
  type = 'text',
  placeholder,
  validation,
}: TextInputPropsType) => {
  return (
    <Field
      name={name}
      validate={validation}
      render={({ input, meta }) => (
        <>
          <TextInputRN
            style={[
              styles.inputBase,
              meta.error && meta.touched
                ? styles.errorColor
                : styles.defaultColor,
            ]}
            inputMode={type}
            value={input.value}
            onChange={input.onChange}
            placeholder={placeholder}
          />
          {meta.error && meta.touched && (
            <Text style={styles.errorText}>{meta.error}</Text>
          )}
        </>
      )}
    />
  );
};

export default TextInput;
