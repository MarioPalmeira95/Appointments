import { Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type HeaderPropsType = {
    title: String;
    onPress: () => void;
}

const Header = ({title, onPress}: HeaderPropsType) => {
    return (        
    <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#009973', gap: 22, padding: 12, marginBottom: 8}}>
        <TouchableOpacity onPress={onPress}>
            <Icon name="arrow-left" size={24} color="white"/>
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 18}}>{title}</Text>
    </View>
    );
}

export default Header;