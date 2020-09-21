
export default class NavigationUtil {
    static goPage(params,page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            return;
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }

    static goBack(navigation) {
        navigation.goBack();
    }

    static resetToHomPage(params) {
        const { navigation } = params;
        navigation.navigate("Main");
    }

}