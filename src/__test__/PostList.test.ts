import { describe, expect, it, test , beforeAll } from 'vitest'
import { mount } from '@vue/test-utils';
import PostList from '../components/PostList.vue'
import fetchMock from 'fetch-mock';


describe.skip('PostList Component Test',() => {

   // テスト前に fetch をモック化
  it('Get empty object',() => {
    const wrapper = mount(PostList,{});
    

  })
})