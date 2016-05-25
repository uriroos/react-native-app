import React from 'react';
import {
  Component,
  TabBarIOS,
  Navigator,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { globalStyles } from '../styles/globals';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChatView from '../chat/ChatView';
import OtherChatView from '../chat/OtherChatView';

var NavigationBarRouteMapper = isTyping => ({

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={globalStyles.navBarLeftButton}>
        <Icon name='arrow-left' color='#fff' size={20} />
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.push({
          title: 'test',
          component: OtherChatView
        })}
        style={globalStyles.navBarRightButton}>
        <Icon name='cog' size={20} color='#fff' style={{paddingRight: 10}} />
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    
    return (
      <View style={{paddingLeft: 40, paddingRight: 40, overflow: 'hidden'}}>
        <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>{route.title}</Text>
        <Text style={{fontSize: 12, color: '#fff'}}>{isTyping}</Text>
      </View>
    );
  }

});

const secondTabIcon = 'data:image/png;base64,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';

const firstTabIcon = 'data:image/png;base64,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';

const thirdTabIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABECAYAAABtcnDsAAAAAXNSR0IArs4c6QAABUVJREFUeAHtnG9rFEccx2dm7w85xTRXrWex4Yxa+qA0kRrrA6H4xJeQt5DHgdTEJcKiF+TQR3mWt5BXYEGQFqFaa5McxWKt9EikpDYEzza5ZPdmpjPb7OX+OFwuu3s3t/kthJ2dv7/5fvY3O5OdPYzEsbCwYPy0vDyKK+iEvIajPQUIIRvZ7Okfx8fHnfZKts5NZJalpZfHAU5rsVQ5GGPpFysrGVW6n3gXEMZbMT+VQFmEEjRuhKFDMxiDs75E4lkYjUWtzs3t7RHCjXiY/WoCxDjhlmWthdloVOq+bpoUURQqIHeIi4pgUewHANKcKgACQJoroLl54EEASHMFNDcPPAgAaa6A5uaBBwEgzRXQ3DzwIACkuQKamwceBIA0V0Bz88CDAJDmCmhuHniQ5oCa3qhqbq9W5iUIWWGIuW9UEwn0LgzjAJAPVXO53AsfxfdVFIa4fcnUvUyR96CJiYm+VCqVdpw47p7MbbXMzp499be3CTLSgCxrIbG5Xfi6UuFxjAPf9NmW6u1k/r1YlM+z72SZiA9xz48RzkPdFtWO8PvNSxg5Jra+JWT+SHvQzs6OGNb27kFGMN2vSJ3ORxgTtuKqsel02h2SIw2oUeTRC198OzY2piWk6ek7A5z/e6XR5iqxxgS41kMBAKQHB6UVAEgpjR4JAEgPDkorAJBSGj0SAJAeHJRWACClNHokACA9OCitAEBKafRIAEB6cFBaAYCU0uiRAID04KC0AgAppdEjAQDpwUFpBQBSSqNHAgDSg4PSiqYXdgQzfN2yPlaWCCghhdC2eK270ao6zjk2zTtpmrSTLfMixO5G7FdSmgAhigkuO1+2EsNvellUMDMz81zsLXulqmtubi5pmuYlxsgHWBZocfD/d4bcb5Gtp5LdIY7zVKUbVtucK3+fbnLy7pHXa2tXJJxu2KZLm64HjYycX19cXHwjKJ2IoVB+VavaX8a4uxlCRhhiF0c1oSYwNTXVj3HpK05x3bBGCOY12ZqDovLmyN6OcQHtbqR40omuTJrm5wbFZ1RtiefS8bJtj3LKq8OvCP11cXj4ma4bPlR9CSK+KkIQlfmtQ05OBJwL8jlYrStBVvK3bhUwbuE91QLRCuwJ0eV+iQnDGXdyUgOHkPjL/O3by4cVjkSihQfduGF95jjO+dp7JB7Hv+Ry1h+1cYcx3FVAjDA8dfPmMLOdQU98EcdxMvlzzrL+9OIO87mrgFAFfSjWluJv9zB45Ugi+VRMFNa9qCDPhULhnPBW3zM9x6g4R2OxVWFn0/JErNtOisV1P0J1E9CW3WBsq+99mboLqM4ibiNKH4tOl+qiA7xwHP4pQv6/cjAYQmXH+WR+fv4H7zMRaaZpzp6kdOuS2GMtrvy3I+vUYpLADb5F6cCjfD4fKBzG+m3ZyZCO/mKxeFlAqn49UamUA1lUy2E+k8m43tlxQIZhNA4xpdOZzKN7977ZDFrIfH66JL4M+k10+J2YCf4TzB/d8eyU/+Wog+R+MOKlcnaQ9ghhbzFNLnlrvveu5L0mwjiLMfoUpfiirJsStn702rWn1tWrTWN5GG0HUaf18GGsfP/BZVHXgFefuAHenstmH79aXR3C7jDqppTy+dnvvTwHPXcckDRUPGc+su04np013/TiGkcFicRiG8hmQ7swehfQQe8mncq5kB4IT6rseVKDfYEA6vgzqKETPXsph+WhwcEncngLsxMAyIe6cootnz1hQgJAPgDJomFDAkA+AdVCklNkrzrximTbC/s5AyA/6tWUlZ6UFcMdxvS1XD4gx/m1JhmCUVXgPwrMtqk8ieK5AAAAAElFTkSuQmCC';

class App extends Component {

  render() {
    return (
      <TabBarIOS tintColor="red">
        <TabBarIOS.Item
          icon={{uri: firstTabIcon, scale: 3}}
          selected={true}
          title={null}
          >
          {this.renderChatView()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={{uri: secondTabIcon, scale: 3}}
          title={null}
          >
          {null}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={{uri: thirdTabIcon, scale: 3}}
          title={null}
          >
          {null}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
  
  renderChatView() {
    let isTyping = '';

    if (this.props.isTyping) {
      isTyping = '...is typing';
    }
    
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="#b11220"
          barStyle="light-content"
        />
        <Navigator
          style={globalStyles.wrapper}
          renderScene={(route, navigator) => {
            return <route.component navigator={navigator} {...route.passProps} />;
          }}
          navigationBar={
            <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper(isTyping)}
            style={globalStyles.navBar}
            />
          }
          initialRoute={{
            title: 'ACE',
            component: ChatView
          }} />
      </View>
    );
  }
}

const stateToProps = (state) => {
  return {
    isTyping: state.chat.isTyping
  };
};

export default connect(stateToProps, null)(App);
