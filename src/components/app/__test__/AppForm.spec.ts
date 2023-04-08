import { defaultSlotTest } from "@/components/__tests__/helpers/slot.spec";
import { required } from "@/composables/validation/validations";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";
import { AppForm as component, AppFormInput } from '../'
const name = 'AppForm';

describe(name, ()=> {
  defaultSlotTest(component);
  
  it('activate form validation of child component', async ()=> {
      const wrapper = mount(component, {
      slots: {
        default: [
          h(AppFormInput, { validations: [required('')] }),
        ]
      }
    });
    await wrapper.trigger('submit');
    await wrapper.vm.$nextTick();
    const errorTag = wrapper.findAll('p')[0];
    // should be same messeage wirth required 
    const errorMessage = required('')('');
    expect(errorTag.text()).toBe(errorMessage);
  })
});