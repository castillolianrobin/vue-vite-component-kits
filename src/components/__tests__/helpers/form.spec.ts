import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";


export const inputTest = (component:any, options?:MountOptionsParams) => { 
  it('emits update:modelValue', async ()=> {
    const wrapper = mount(component, {
      ...options,
      props: {
        ...options?.props,
        modelValue: 'Old value',
        'onUpdate:modelValue': (e: any) => 
          wrapper.setProps({ modelValue: e }),
      },
    });
    const newVal = 'New Value';
    await wrapper.vm.$emit('update:modelValue', newVal);
    await wrapper.vm.$nextTick();

    expect(wrapper.props('modelValue')).toBe(newVal);
  })
};

type MountParams  = Parameters<typeof mount>; 
type MountOptionsParams  = MountParams[1] | Record<string, any>; 
