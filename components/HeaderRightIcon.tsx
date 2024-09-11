// HeaderRightIcon.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface HeaderRightIconProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    onPress: () => void;
}

const HeaderRightIcon: React.FC<HeaderRightIconProps> = ({ iconName, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} accessibilityLabel={`Navigate to ${iconName}`}>
            <Feather
                name={iconName}
                size={24}
                color="purple"
                style={{ marginRight: 20 }}
            />
        </TouchableOpacity>
    );
};

export default HeaderRightIcon;
