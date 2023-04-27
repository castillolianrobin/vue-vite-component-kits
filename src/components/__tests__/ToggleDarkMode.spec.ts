import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ToggleDarkMode } from '../'

describe('ToggleDarkMode', ()=> {  
  const wrapper = mount(ToggleDarkMode, {
    attachTo: document.body
  });
  const trigger = wrapper.find('[role="checkbox"]'); 

  it('activate dark mode when toggled', async ()=> {
    const html = document.getElementsByTagName('html')[0]
    await trigger.trigger('click')
    expect(html.className).toContain('dark')
  })

  it('deactivate dark mode when retoggled', async ()=> {
    const html = document.getElementsByTagName('html')[0]
    await trigger.trigger('click')
    expect(html.className).not.toContain('dark')
  })
})