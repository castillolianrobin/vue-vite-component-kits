import { inputTest } from "@/components/__tests__/helpers/form.spec";
import { validationTest } from "@/components/__tests__/helpers/validation.spec";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { AppFormCheckboxGroup } from '..'
import type { ItemProp } from "../AppFormCheckboxGroup.vue";
const name = 'AppFormCheckboxGroup'
describe(name, ()=> {
  const items: ItemProp[] = [
    { label: 'Item 1', value: 1 },
    { label: 'Item 2', value: 2 },
    { label: 'Item 3', value: 3 },
  ];

  it('displays the list of items correctly', ()=>{
    
    const wrapper = mount(AppFormCheckboxGroup, {
      props: {
        items,
      }
    })

    const checkItems = wrapper
      .findAll('[role="checkbox"]')
      .map(checkb=>
          checkb.element.parentNode?.querySelector('label')?.textContent
      );
    
    expect(checkItems).toEqual(items.map(i=>i.label))
  });

  it('display selected item correctly', ()=>{
    const correctItem = items[1];
    const wrapper = mount(AppFormCheckboxGroup, {
      props: {
        items,
        modelValue: [correctItem.value],
      }
    })

    const checkedItem = wrapper
      .find('[aria-checked="true"]')
      .element.parentNode
      ?.querySelector('label')
      ?.textContent

    expect(checkedItem).toBe(correctItem.label)
  });


  it('return modelValue returnInactive prop correctly ', async ()=> {
    const items: ItemProp[] = [
      { label: 'Item 1', value: 1, inactiveValue: 'test'},
      { label: 'Item 2', value: 2, inactiveValue: 'test' },
      { label: 'Item 3', value: 3, inactiveValue: 'test' },
    ];
    let modelValue: any[] = [];
    const wrapper = mount(AppFormCheckboxGroup, {
      props: {
        items,
        modelValue,
        returnInactive: true,
        'onUpdate:modelValue': (e: any) => { modelValue = e }, 
      },
    });

    // Should match inactive value on mount
    expect(modelValue).toEqual(items.map(item=>item.inactiveValue));
    
    const checkItems = wrapper.findAll('[role="checkbox"]');
    await wrapper.setProps({ modelValue });
    await checkItems[1].trigger('click');
    expect(modelValue[1]).toEqual(items[1].value);
  });


  inputTest(AppFormCheckboxGroup, { props: { items: [] } });
  validationTest(AppFormCheckboxGroup, { props: { items: [] } });
})