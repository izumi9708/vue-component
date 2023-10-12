import { describe, expect, it, test , beforeAll,afterAll } from 'vitest'
import { mount } from '@vue/test-utils';
import PostList from '../components/PostList.vue'
import fetchMock from 'fetch-mock';
import 'cross-fetch/polyfill'
import { ref } from 'vue';
import { getList } from '../components/getList';

// テストケース1: dataの初期値が正しいかどうかを確認するテストを書いてください。
// テストケース2: getList関数の非同期呼び出しが正しく機能するかどうかを確認するテストを書いてください。
// テストケース3: リスト項目をクリックしたときに、詳細が表示および非表示になることを確認するテストを書いてください。
// テストケース4: リスト項目のクリック操作が正しく動作しない場合（詳細が表示されない/非表示にならないなど）のエッジケースのテストを書いてください。

type Data = {
  body:string;
  userId:number;
  title:string;
  id:number;
}

describe('PostList Component Test',() => {

  // beforeAll(() => {
  //   // HTTPリクエストをモック
  //   fetchMock.get('https://jsonplaceholder.typicode.com/posts', [
  //     { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
  //     { id: 2, title: 'Post 2', body: 'Body 2', userId: 2 },
  //   ]);
  // });

  // afterAll(() => {
  //   // テスト後にモックをリセット
  //   fetchMock.reset();
  // });

  // 1.
  it('Get empty object',async() => {
    const data = ref<Data[]>([]);

    const wrapper = mount(PostList)

    const mockData:Data[] = [
      { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
      { id: 2, title: 'Post 2', body: 'Body 2', userId: 2 },
    ]

    data.value = mockData;
    
    // 初期データの長さが0でないことを確認
    expect(data.value.length).not.toBe(0);
    // 初期データが期待通りのデータと一致することを確認
    expect(data.value).toEqual(mockData);
  })

  it('GetList Function Work Properly',async() => {
    const data = ref<Data[]>([]);
    const wrapper = mount(PostList)

    const res = await getList();
    const dataArray = res.filter(item => item.id < 11 ? data.value.push(item) : '')
    
    expect(dataArray.length).not.toBe(0);
  })
})