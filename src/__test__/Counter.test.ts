import { describe, expect, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '../components/Counter.vue';


describe('Counter Conponent Test',() => {
  it('Is the initial value 0',() => {
    const wrapper = mount(Counter,{})

    expect(wrapper.element.querySelector('p')?.textContent).toBe('0')
  
  })
})