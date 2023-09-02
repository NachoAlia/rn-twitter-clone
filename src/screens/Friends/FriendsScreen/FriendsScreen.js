import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { styles } from './FriendsScreen.styles'
import { UserContext } from '../../../context/UserProvider'
import { useThemaContext } from '../../../components/ThemeProvider'
import { color, screen } from '../../../utils'
import { PendingFriendRequestsModal } from '../../../components/Friends'

export const FriendsScreen = () => {
  const thema = useThemaContext();
  const { currentUser } = useContext(UserContext);

  console.log(currentUser.id);
  return (
    <View
      style={[
        styles.content,
        {
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        },
      ]}
    >
      <Text>FriendsScreen</Text>
      <PendingFriendRequestsModal userId={currentUser.id} />
    </View>
  )
}