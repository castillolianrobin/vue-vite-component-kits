import type { ThemeColors } from "@/composables";
import { required } from "@/composables/validation/validations";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

export const validationTest = (component: any, options?:MountOptionsParams) => {
  describe(`Form Validation`, () => {

    // Required validation
    it("renders required label correctly", () => {
      const wrapper = mount(component, {
        ...options,
        props: {
          ...options?.props,
          validations: 'required',
        },
      });
      const labels = wrapper
        .findAll("span")
        .filter(element => element.element.innerHTML.trim() === "*");
      // expect(wrapper.findAll('span').map(element => element.element)).toBe('asda')
      expect(labels.length).toBe(1);
      expect(labels[0].element.innerHTML.trim()).toBe("*");
      const errorClass:`text-${ThemeColors}` = 'text-error-500';
      expect(labels[0].element.className.includes(errorClass)).toBe(true);
    });

    it("validate required properly", async () => {
      const validation = required();
      const validationMessage = validation();
      const wrapper = mount(component, {
        ...options,
        props: {
          ...options?.props,
          validations: 'required',
          modelValue: 'test',
        },
      });
      await wrapper.setProps({ modelValue: '' })
      
      const labels = wrapper
        .findAll("p")
        .filter(element => element.element.innerHTML === validationMessage)
      expect(labels.length).toBe(1);
      expect(labels[0].element.innerHTML).toBe(validationMessage);
    })
  });

  // try all validations if possible
}

/** TYPE DEFINITIONS */

type MountParams  = Parameters<typeof mount>; 
type MountOptionsParams = MountParams[1] | Record<string, any>; 
