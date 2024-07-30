import { BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { Form } from "react-final-form";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../../components/Button";
import SelectInput from "../../../components/SelectInput";
import { AppointmentStackParamList } from "../../../routes";
import { validateNotEmpty } from "../../../utils/validators";
import Header from "../../../components/Header";

const styles = StyleSheet.create({
  formContent: {
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderRadius: 6, 
    borderColor: 'white', 
    marginHorizontal: 12, 
    padding: 12
  },
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
  dateTimeDisplay: {
    fontSize: 14
  }
});

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  customerId: string;
};

const MOCK_CUSTOMER = [
  {
    id: 6,
    name: 'Mário',
    lastname: 'Palmeira',
    nickname: 'Mário',
    whatsappUser: true,
    observation: 'Só pode aos sábados',
  },
  {
    id: 4,
    name: 'Marcia',
    lastname: 'Lima',
    nickname: 'Marcia',
    whatsappUser: true,
    observation: 'Só pode aos sábados',
  },
  {
    id: 7,
    name: 'Fernando',
    lastname: 'Arruda',
    nickname: 'Fernando',
    whatsappUser: true,
    observation: 'Só pode aos sábados',
  },
];

const MOCK_APPOINTMENT_TYPE = [
  {
    id: 1,
    name: 'PROCEDIMENTO_UM',
    description: 'Procedimento 1',
  },
  {
    id: 2,
    name: 'PROCEDIMENTO_DOIS',
    description: 'Procedimento 2',
  },
  {
    id: 3,
    name: 'PROCEDIMENTO_TRES',
    description: 'Procedimento 3',
  },
]

const AppointmentCreateUpdate = ({route}: BottomTabScreenProps<AppointmentStackParamList, 'AppointmentCreateUpdate'>) => {
  const navigation = useNavigation<BottomTabNavigationProp<AppointmentStackParamList>>();
  const {id, selectedDate} = route.params;

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
      <View>
        <Header title={id ? 'Agendamento' : 'Novo agendamen'} onPress={handleGoBack}/>
          <Form            
            onSubmit={onSubmit}
            render={({handleSubmit}) => (
              <View style={styles.formContent}>
                <View style={styles.inputBase}>
                  <Text style={styles.dateTimeDisplay}>{format(new Date(selectedDate), 'EEEE, dd/MM, \'às\' HH:mm')}</Text>
                </View>
                <SelectInput
                  name="customerId"
                  placeholder="Selecione um cliente"
                  dataSource={
                    MOCK_CUSTOMER.map(item => {
                      return {
                        key: String(item.id),
                        value: `${item.name} ${item.lastname}`
                      }
                      }
                    )}
                    validation={validateNotEmpty}
                />
                <SelectInput
                  name="type"
                  placeholder="Selecione o procedimento"
                  dataSource={
                    MOCK_APPOINTMENT_TYPE.map(item => {
                      return {
                        key: item.name,
                        value: item.description
                      }
                      }
                    )}
                  validation={validateNotEmpty}
                />
                <Button 
                  title="Salvar" 
                  onClick={handleSubmit} 
                  style={{marginVertical: 12}}
                />
              </View>
            )}
          />
      </View>
  );
}

export default AppointmentCreateUpdate;