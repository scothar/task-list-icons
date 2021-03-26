import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import { PayIcon, PayIconActive} from './components/CustomIcons'
import { Icon, InlineIcon } from '@iconify/react';
import airbnbIcon from '@iconify-icons/simple-icons/airbnb';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'VacasaAirbnbPlugin';

export default class VacasaAirbnbPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    
    
    
  
  
    const airbnbChannel = flex.DefaultTaskChannels.createChatTaskChannel(
      'airbnb',
      (task) => {
        return task.taskChannelUniqueName === 'chat' && task.attributes.type === 'airbnb';
      }, 
      <Icon icon={airbnbIcon} style={{color: 'white', backgroundColor: '#FF0750'}} />,
      <Icon icon={airbnbIcon} style={{color: '#FF0750', backgroundColor: 'white'}} />,
      "#FFFFFF"
    
  );

  // register the definition
    
  flex.TaskChannels.register(airbnbChannel);
    
    
    
    this.registerReducers(manager);

   
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
