import { validationTest } from "@/components/__tests__/helpers/validation.spec";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { namedSlotTest } from '../../__tests__/helpers/slot.spec';
import { AppFormSelect as component } from '../';
import { inputTest } from "@/components/__tests__/helpers/form.spec";
const name = 'AppFormSelect';


// Component specific test
describe(name, () => {
  const items = [
    { label: 'Item 1',  value: 1},
    { label: 'Item 2',  value: 2},
    { label: 'Item 3',  value: 3},
  ];
  // slot test
  namedSlotTest(component, 'prepend', { props: { items} });
  namedSlotTest(component, 'append',  { props: { items} });
  // namedSlotTest(component, 'inactive-icon');
  // it(`renders 'active-icon' slot`, async () => {
  //   const namedSlot_class = 'slot-class';
  //   const namedSlot_text = 'Test 1';
  //   const wrapper = mount(component, {
  //     slots: {
  //       'active-icon': `<div class="${namedSlot_class}">${namedSlot_text}</div>`
  //     }
  //   });

  //   await (wrapper.vm.active = true);
  //   const defaultSlot_result = wrapper.findAll(`.${namedSlot_class}`);
  //   expect(defaultSlot_result.length).toBe(1) 
  //   expect(defaultSlot_result[0].text()).toBe(namedSlot_text);
  // })
  // Input related Test
  inputTest(component,  { 
    options: {props: { items}},
    disableTest: async (wrapper, testEmit)=>{
      const trigger = wrapper.find('input')
      await trigger.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('ul').exists()).toBeFalsy()
      await testEmit();
    }, 
  });
  
  // validation related Test
  validationTest(component,  { props: { items} })

  it('Persist items onClick if multiselect', async ()=> {
    const wrapper = mount(component, {
      props: {
        items,
        multiselect: true,
      }
    });

    const input = wrapper.find('input');
    await input.trigger('click');
    const listbox = ()=> wrapper.find('[role="listbox"]');
    
    expect(listbox().exists()).toBeTruthy();
    
    const itemEls = listbox().findAll('li')
    await itemEls[0].trigger('click')
    
    expect(listbox().exists()).toBeTruthy();    
  })
});
