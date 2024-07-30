import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { FlatList, ListRenderItem, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  inputBase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white', 
    padding: 11,
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#808080'
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
  modalContentContainer: {
    flexDirection: 'column', 
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  modalClose: {
    flexDirection: 'row', 
    justifyContent: 'flex-end',
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'grey',
  }
});

type OptionType = {
  key: string;
  value: string;
};

type DropdownModalPropType = {
    show: boolean;
    dataSource: Array<any>;
    onSelect: (item: OptionType) => void;
    onClose: () => void;
}

type SelectInputPropsType = {
  name: string;
  placeholder: string;
  dataSource: Array<OptionType>;
  validation?: (value: any) => void;
};

const DropdownModal = ({show, onClose, dataSource, onSelect}: DropdownModalPropType) => {
  
  const renderOption: ListRenderItem<OptionType> = ({ item }) => {
    return (
      <TouchableOpacity 
        activeOpacity={0.5} 
        onPress={() => onSelect(item)} 
        style={styles.option}
      >
          <Text>{item.value}</Text>
        </TouchableOpacity>
    )
  };

  return (
    <Modal 
      visible={show} 
      animationType='fade'
      onDismiss={onClose} 
    >
      <View style={styles.modalContentContainer}>
        <View style={styles.modalClose}>
          <Pressable onPress={onClose}>
          <Text>Cancelar</Text>
          </Pressable>
        </View>
        <FlatList<OptionType>
          data={dataSource}
          renderItem={renderOption}
          contentContainerStyle={{ paddingBottom: 30}}
        />
      </View>
    </Modal>
  )
}

const SelectInput = ({name, placeholder, validation, dataSource}:SelectInputPropsType) => {
    const [selectedItem, setSelectedItem] = useState<OptionType | undefined>();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleClose = () => {
        setShowDropdown(false);
    }

    return (
      <Field
        name={name}
        validate={validation}
        render={({ input, meta }) => (
          <>
            <TouchableOpacity 
              onPress={() => setShowDropdown(true)} 
              style={styles.inputBase}
            >
              <Text>{input.value ? selectedItem?.value : placeholder}</Text>
              <Icon name="chevron-down" size={18} />
            </TouchableOpacity>
            {showDropdown ? (
                <DropdownModal 
                    show={showDropdown} 
                    dataSource={dataSource}
                    onSelect={item => {
                        input.onChange(item);
                        setSelectedItem(item);
                        setShowDropdown(false);
                      }
                    }
                    onClose={handleClose}
                />
            ) : null}
            {meta.error && meta.touched && (
              <Text style={styles.errorText}>{meta.error}</Text>
            )}
          </>
        )}
      />
    );
}

export default SelectInput;