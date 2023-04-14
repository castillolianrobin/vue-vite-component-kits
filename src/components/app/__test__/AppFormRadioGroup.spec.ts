import { inputTest } from "@/components/__tests__/helpers/form.spec";
import { validationTest } from "@/components/__tests__/helpers/validation.spec";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { AppFormRadioGroup } from '..'
import type { ItemProp } from "../AppFormRadioGroup.vue";
const name = 'AppFormRadioGroup'
describe(name, ()=> {
  const items: ItemProp[] = [
    { label: 'Item 1', value: 1 },
    { label: 'Item 2', value: 2 },
    { label: 'Item 3', value: 3 },
  ];

  it('displays the list of items correctly', ()=>{
    
    const wrapper = mount(AppFormRadioGroup, {
      props: {
        items,
      }
    })

    const radioItems = wrapper
      .findAll('[role="radio"]')
      .map(radio=>
          radio.element.parentNode?.querySelector('label')?.textContent
      );
    
    expect(radioItems).toEqual(items.map(i=>i.label))
  });

  it('display selected item correctly', ()=>{
    const correctItem = items[1];
    const wrapper = mount(AppFormRadioGroup, {
      props: {
        items,
        modelValue: correctItem.value,
      }
    })

    const checkedItem = wrapper
      .find('[aria-checked="true"]')
      .element.parentNode
      ?.querySelector('label')
      ?.textContent

    expect(checkedItem).toBe(correctItem.label)
  });


  inputTest(AppFormRadioGroup, { 
    options: {props: { items }},
    disableTest: async (wrapper, testEmit)=>{
      const radio = wrapper.find('[role="radio"]');
      await radio.trigger('click');
      await testEmit();
    }, 
  });
  validationTest(AppFormRadioGroup, { props: { items: [] } });
})