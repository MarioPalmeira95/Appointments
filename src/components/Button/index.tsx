import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#009973',
    padding: 8,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#009973',
  },
  buttonTitle: {
    fontWeight: 'bold',
    color: 'white'
  },
});

type ButtonPropsType = {
  title: string;
  loading?: boolean;
  style?: ViewStyle;
  onClick?: () => void;
};

const Button = ({ 
  title, 
  loading = false,
  style, 
  onClick, 
}: ButtonPropsType) => {

  const buttonStyles = [
    styles.button,
    style
  ]

  const handleClickButton = () => {
    onClick ? onClick() : console.log("Botão");
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={buttonStyles}
      onPress={handleClickButton}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.buttonTitle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
