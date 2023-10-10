import { describe, expect, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '../components/Counter.vue';
import { remove } from 'firebase/database';

// 1.カウンターの初期値が0であることを確認するテストを記述してください。

// 2."増やす"ボタンをクリックしたときに、カウンターの値が1ずつ増加することを確認するテストを記述してください。

// 3."減らす"ボタンをクリックしたときに、カウンターの値が1ずつ減少することを確認するテストを記述してください。

// 4.カウンターの値が0未満にならないことを確認するテストを記述してください。

describe('Counter Conponent Test',() => {
  // 1.
  it('Is the initial value 0',() => {
    const wrapper = mount(Counter,{})

    expect(wrapper.element.querySelector('p')?.textContent).toBe('0')
  
  })

  // 2.
  it('Click the add button to increase',async() => {
    const wrapper = mount(Counter,{})
    const count   = wrapper.element.querySelector('p')
    const addBtn  = wrapper.find('.add');
    
    await addBtn.trigger('click');
  
    expect(count?.textContent).toBe('1');
  })

  // 3,4.
  it('Click the remove button to increase',async() => {
    const wrapper = mount(Counter,{})
    const count   = wrapper.element.querySelector('p')
    const removeBtn  = wrapper.find('.remove');
    
    await removeBtn.trigger('click');
  
    expect(count?.textContent).toBe('0');
  })
})