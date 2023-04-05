import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";


export const inputTest = (component:any) => { 
  it('emits update:modelValue', async ()=> {
    const wrapper = mount(component, { modelValue: 'Old value'});
    const newVal = 'New Value';
    wrapper.vm.$emit('update:modelValue', newVal);
    await wrapper.vm.$nextTick();

    expect(wrapper.props('modelValue')).toBe(newVal);
  })
};