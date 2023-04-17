import { namedSlotTest } from "@/components/__tests__/helpers/slot.spec";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { AppTabs as component } from '../'
import type { ItemProp } from "../AppTabs.vue";
const name = 'AppTabs';
describe(name, ()=> {
  const items:ItemProp[] = [
    { text: 'Tab 1', key: 'tab-1' },
    { text: 'Tab 2', key: 'tab-2' },
    { text: 'Tab 3', key: 'tab-3' },
  ];
  function mountWithDefaultItem(options?: Record<any, any>) {
    return mount(component, {
      ...options,
      props: {
        items,
        ...options?.props,
      }
    });
  }
  it('should render tabs properly', () => {
    const wrapper = mountWithDefaultItem();

    const tabItems = wrapper.findAll('[role="tab"]');
    const tabItemsText = tabItems.map(item=>item.text());
    expect(tabItemsText).toStrictEqual(items.map(({text})=>text));
  })

  it('should render default tab properly', ()=> {
    const defaultText = 'Text';
    const defautlKey = items[0].key;
    const wrapper = mountWithDefaultItem({
      slots: {
        [`${defautlKey}`]: defaultText, 
      }
    });
    const defaultTabPanel = wrapper
      .find(`[aria-label="${defautlKey} tabpanel"]`);
    expect(defaultTabPanel.exists()).toBeTruthy();
    expect(defaultTabPanel.text()).toBe(defaultText);
  })
  
  it('should not render other tabs', ()=> {
    const defaultText = 'Text';
    const nondefautlKey = items[1].key;
    const wrapper = mountWithDefaultItem({
      slots: {
        [`${nondefautlKey}`]: defaultText, 
      }
    });
    const defaultTabPanel = wrapper
      .find(`[aria-label="${nondefautlKey} tabpanel"]`);
    expect(defaultTabPanel.exists()).toBeFalsy();
  })
  it('should render other tabs on change', async ()=> {
    const defaultText = 'Text';
    const nondefautlKey = items[1].key;
    const wrapper = mountWithDefaultItem({
      slots: {
        [`${nondefautlKey}`]: defaultText, 
      }
    });
    const nonDefaultTab = wrapper
      .find(`[aria-label="${nondefautlKey} tab"]`);
    await nonDefaultTab.trigger('click');
    const defaultTabPanel = wrapper
      .find(`[aria-label="${nondefautlKey} tabpanel"]`);
    
    expect(defaultTabPanel.exists()).toBeTruthy();
    expect(defaultTabPanel.text()).toBe(defaultText);
  })
  it('should render all tabs if eager prop is enabled', ()=> {
    const defaultText = 'Text';
    const nondefautlKey = items[1].key;
    const wrapper = mountWithDefaultItem({
      props: {
        eager: true,
      },
      slots: {
        [`${nondefautlKey}`]: defaultText, 
      }
    });
    const defaultTabPanel = wrapper
      .find(`[aria-label="${nondefautlKey} tabpanel"]`);

    expect(defaultTabPanel.exists()).toBeTruthy();
    expect(defaultTabPanel.text()).toBe(defaultText);
  });
  
  namedSlotTest(component, 'tabs', { props: { items } });
  namedSlotTest(component, 'panel', { props: { items } });
})