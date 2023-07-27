import { screen } from "./screenName";

export function GoToUserProfile(navigation, userId) {
  navigation.navigate(screen.account.account, {
    screen: screen.account.accountProfile,
    params: { user_id: userId },
  });
}
