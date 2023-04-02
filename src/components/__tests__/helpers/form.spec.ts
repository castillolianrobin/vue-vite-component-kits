import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";


export const inputTest = (component:any, name: string) => { 
  describe(`V-MODEL: ${name}`, () => {
    it('emits update:modelValue', async ()=> {
      const wrapper = mount(component, { modelValue: 'Old value'});
      const newVal = 'New Value';
      wrapper.vm.$emit('update:modelValue', newVal);
      await wrapper.vm.$nextTick();

      expect(wrapper.props('modelValue')).toBe(newVal);
    })
  })
};