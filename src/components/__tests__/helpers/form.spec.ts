import { mount, VueWrapper } from "@vue/test-utils";
import { expect, it } from "vitest";


export const inputTest = (component:any, config?:Config) => { 
  it('emits update:modelValue', async ()=> {
    const wrapper = mount(component, {
      ...config?.options,
      props: {
        ...config?.options?.props,
        modelValue: null,
      },
    });
    function updateModelValue(e: any) {
      wrapper.setProps({ modelValue: e });
    }
    await wrapper.setProps({  
      'onUpdate:modelValue': updateModelValue
    })

    const newVal = config?.newValue !== undefined 
      ? config?.newValue 
      : 'New Value';
    await wrapper.vm.$emit('update:modelValue', newVal);
    await wrapper.vm.$nextTick();
    const modelValue = wrapper.props('modelValue')
    if (typeof modelValue === 'object') {
      expect(modelValue).toStrictEqual(newVal);
    } else {
      expect(modelValue).toBe(newVal);
    }
  })

  if (config?.disableTest !== 'no test') {
    it('should not update if disabled', async () => {
      if (!config?.disableTest || typeof config?.disableTest !== 'function' ) {
        throw new Error('This component does not have a  test for disable prop')
      } else {
        const wrapper = mount(component, {
            ...config?.options, 
            props: { 
              ...config.options?.props, 
              disabled: true,
          },
        });

        const testEmit = async ()=> {
          await wrapper.vm.$nextTick();
          expect(wrapper.emitted('update:modelValue')?.length).toBeFalsy()
        };
        await config.disableTest(wrapper, testEmit);
      }
    })
  }
};

type MountParams  = Parameters<typeof mount>; 
type MountOptionsParams  = MountParams[1] | Record<string, any>;
type DisableTest = (wrapper:VueWrapper<any>, testEmit: (()=> void)) => void
interface Config {
  options?:MountOptionsParams;
  newValue?: any;
  disableTest?: DisableTest | 'no test';
};
