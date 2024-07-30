import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { addDays, format, subDays } from 'date-fns';
import { AppointmentType } from "../../../service/appointment/types";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../../api';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AppointmentStackParamList } from '../../../routes';

const MOCK = [
  {
    id: 1,
    type: 'Normal',
    date: '2024-08-20T09:41:00',
    customer: {
      id: 6,
      name: 'Mário',
      lastname: 'Palmeira',
      nickname: 'Mário',
      whatsappUser: true,
      observation: 'Só pode aos sábados',
    },
  },
  {
    id: 2,
    type: 'Normal',
    date: '2024-08-20T09:41:00',
    customer: {
      id: 4,
      name: 'Marcia',
      lastname: 'Lima',
      nickname: 'Marcia',
      whatsappUser: true,
      observation: 'Só pode aos sábados',
    },
  },
  {
    id: 3,
    type: 'Normal',
    date: '2024-08-20T09:41:00',
    customer: {
      id: 7,
      name: 'Fernando',
      lastname: 'Arruda',
      nickname: 'Fernando',
      whatsappUser: true,
      observation: 'Só pode aos sábados',
    },
  },
  {
    date: '2024-08-20T10:41:00',
  },
  {
    date: '2024-08-20T10:41:00',
  },
  {
    date: '2024-08-20T10:41:00',
  },
  {
    date: '2024-08-20T10:41:00',
  },
  {
    date: '2024-08-20T10:41:00',
  },
  {
    date: '2024-08-20T10:41:00',
  },
  {
    date: '2024-08-20T10:41:00',
  },
  {
    date: '2024-08-20T10:41:00',
  },
  {
    date: '2024-08-20T10:41:00',
  },
  {
    date: '2024-08-20T10:41:00',
  },
]

const styles = StyleSheet.create({
  listFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginVertical: 12,
    gap: 12
  },
  selectedDayContainer: {
    paddingBottom: 6, 
    borderBottomWidth: 1,
    borderColor: '#8c8c8c',
  },
  selectedDay: {
    fontSize: 30,
  },
  appointmentHour: {
    fontSize: 22,
  },
  appointmentCustomer: {
    fontSize: 18,
  },
  freeAppointmentItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  appointmentsItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'white',
    backgroundColor: 'white',
    marginVertical: 6,
    padding: 12,
    elevation: 6,
    shadowColor: '#52006A',
  }
})

type ListDayFilterType = {
  selectedDay: Date;
  onSelectedDayChange: (newDate: Date) => void;
}

type AppointmentListItemPropsType = {
  item: AppointmentType;
}

const ListDateFilter = ({
  selectedDay,
  onSelectedDayChange
}: ListDayFilterType) => {

  const handleSelectAnotherDate = () => {
    console.log('Calendário')
  }

  const handleLessOneDay = () => {
    const lessOne = subDays(selectedDay, 1);
    onSelectedDayChange(lessOne);
  }

  const handleOneMoreDay = () => {
    const oneMore = addDays(selectedDay, 1);
    onSelectedDayChange(oneMore);
  }

  return (
    <View style={styles.listFilterContainer}>
      <TouchableOpacity onPress={handleLessOneDay}>
        <Icon name="arrow-left-drop-circle-outline" size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSelectAnotherDate}>
        <View style={styles.selectedDayContainer}>
          <Text style={styles.selectedDay}>{format(selectedDay, 'dd/MM')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOneMoreDay}>
        <Icon name="arrow-right-drop-circle-outline" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const AppointmentListItem = ({item}: AppointmentListItemPropsType) => {    
  const navigation = useNavigation<BottomTabNavigationProp<AppointmentStackParamList>>();

  const handlePress = () => {
    navigation.navigate('AppointmentCreateUpdate', {
      id: item.id,
      selectedDate: new Date(item.date)
    });
  }

  return (
    <TouchableOpacity 
      activeOpacity={0.5} 
      onPress={handlePress} 
      style={styles.appointmentsItemContainer}
    >
      <Text style={styles.appointmentHour}>{format(new Date(item.date), 'HH:mm')}</Text>
        <View style={styles.freeAppointmentItem}>
        {!item.id || !item.customer ? (
          <>
            <Icon name="plus-circle-outline" size={18} />
            <Text>Disponível</Text>
          </>
        ) : (
          <Text style={styles.appointmentCustomer}>{item.customer.name}</Text>
        )}
        </View>
    </TouchableOpacity>
  )
}

const AppointmentsList = () => {
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [data, setData] = useState([]);

  const getAppointments = useCallback(async () => {
    try {
      const response = await api.get('/appointment/all');
      setData(response.data);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }, [selectedDay]);

  const handleSelectedDay = useCallback((newSelectedDay: Date) => {
    console.log({ newSelectedDay })
    setSelectedDay(newSelectedDay);
  }, []);

  const renderItem: ListRenderItem<AppointmentType> = ({ item }) => {
    return (
      <AppointmentListItem item={item} />
    )
  };

  const renderEmptyList = () => {
    return (
      <Text>Não há dados para exibir.</Text>
    )
  };

  useEffect(() => {
    setLoading(true);
    getAppointments();
  }, [getAppointments]);

  return (
    <View>
      <ListDateFilter selectedDay={selectedDay} onSelectedDayChange={handleSelectedDay} />
      <FlatList<AppointmentType>
        data={MOCK}
        renderItem={renderItem}
        onRefresh={getAppointments}
        refreshing={loading}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={{paddingHorizontal: 12, paddingBottom: 30}}
      />
    </View>
  );
}

export default AppointmentsList;