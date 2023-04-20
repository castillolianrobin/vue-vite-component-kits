import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { AppTooltip } from '../';
const name = 'AppTooltip';

describe(name, () => {
  it('renders the correct tooltip content on mouseenter', async () => {
    const tooltipContent = 'This is the tooltip content';
    const wrapper = mount(AppTooltip, {
      props: {
        tooltipText: tooltipContent,
      },
    });

    await wrapper.trigger('mouseenter');
    const tooltip = ()=>wrapper.find('[role="tooltip"]');

    expect(tooltip().text()).toContain(tooltipContent);

    await wrapper.trigger('mouseleave');
    
    expect(tooltip().exists()).toBeFalsy();
  });

  it('renders the tooltip on click if show on click props is enabled', async ()=> {
    const tooltipContent = 'This is the tooltip content';
    const wrapper = mount(AppTooltip, {
      props: {
        tooltipText: tooltipContent,
        showOnClick: true,
      },
    });

    await wrapper.trigger('mouseenter');
    const tooltip = ()=>wrapper.find('[role="tooltip"]');
    expect(tooltip().exists()).toBeFalsy();
    
    await wrapper.trigger('click');
    expect(tooltip().text()).toContain(tooltipContent);
    
    await wrapper.trigger('mouseleave');
    expect(tooltip().exists()).toBeTruthy();
    
    await wrapper.trigger('click');
    expect(tooltip().exists()).toBeFalsy();
  })
});