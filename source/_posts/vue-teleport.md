---
title: "Vue3 Teleport, Pinia랑 찰떡궁합?!"
date: 2023-12-27 15:50:00+09:00
categories: vue vue3 teleport pinia js
thumbnail: /images/vue/cat_teleport.jpg
description: Vue에는 어디서 붙여도 원하는 곳으로 보낼 수 있는 `Teleport`가 있습니다!!
---

> 🙋🏻‍♂️: wrapper 하위로 레이어 형태로 된 다양한 알럿이 떴으면 좋겠어요.  
> 👨🏻‍💻: 매 컴포넌트마다 불러와서 해야하나..?

<img src="/images/vue/cat_teleport.jpg" />

Vue에는 어디서 붙여도 원하는 곳으로 보낼 수 있는 `Teleport`가 있습니다!!

## 🌟 요약

1. 텔레포트 레이어 컴포넌트를 만든다.
2. 레이어 내 데이터들은 pinia로 관리한다.
3. 최상위 컴포넌트에 레이어 컴포넌트를 등록해놓는다.
4. 필요한 곳에서 pinia를 통해 호출한다.

## 😋 Vue Teleport 만들기

먼저 공통으로 쓰일 레이어를 만들어 줍니다.

```html
<div id="popWrapper" class="toast-popup">
  <div id="popContainer" class="popup-box" role="dialog">
    <h2 class="title-popup">{{ title }}</h2>
    <p class="text-popup" v-html="content" />
    <div class="btn-area02">
      <div v-if="btnType === 2" class="btn-unit04">
        <a @click="onCancel?.(), store.closeLayer?.()">
          <strong>{{ cancel }}</strong>
        </a>
      </div>
      <div class="btn-unit01">
        <a @click="onConfirm?.(), store.closeLayer?.()">
          <strong>{{ confirm }}</strong>
        </a>
      </div>
    </div>
  </div>
</div>
```

위 마크업에 쓰인 함수 및 변수는 pinia를 통해 컨트롤하는 값들이 될 것입니다.

이제 위 마크업을 `<Teleport>`컴포넌트로 감싸줍니다.

```html
<Teleport v-if="isOpen" to="#container"> ... </Teleport>
```

to 속성에 어느 element에 붙을지 지정을 해줍니다.

```javascript
<script setup>
import { useLayerStore } from '@/stores/useLayerStore';
import { storeToRefs } from 'pinia';

const store = useLayerStore();

const {
  isOpen,
  title,
  content,
  btnType,
  confirm,
  cancel,
  onConfirm,
  onCancel,
} = storeToRefs(store);
</script>
```

storeToRefs는 반응성을 살려주는 역할을 합니다.

## 🐣 Pinia로 상태관리 만들기

`stores/useLayerStore.js`파일을 만들고 다음과 같이 작성해줍니다.

```javascript
import { defineStore } from "pinia";
import { computed, ref } from "vue";
export const useLayerStore = defineStore("layer", () => {
  const state = ref({
    isOpen: false,
    title: "",
    content: "",
    confirm: "확인",
    cancel: "",
    btnType: 1,
    onConfirm: null,
    onCancel: null,
    typeClass: "toast-popup",
  });

  // getter
  const isOpen = computed(() => state.value.isOpen);
  const title = computed(() => state.value.title);
  const content = computed(() => state.value.content);
  const btnType = computed(() => state.value.btnType);
  const confirm = computed(() => state.value.confirm);
  const cancel = computed(() => state.value.cancel);
  const onConfirm = computed(() => state.value.onConfirm);
  const onCancel = computed(() => state.value.onCancel);
  const typeClass = computed(() => state.value.typeClass);

  // action
  function openLayer(data) {
    state.value.isOpen = !state.value.isOpen;
    state.value.title = data.title;
    state.value.content = data.content;
    state.value.confirm = data.confirm ?? state.value.confirm;
    state.value.cancel = data.cancel ?? state.value.cancel;
    state.value.btnType = data.btnType || 1;
    state.value.onConfirm = data.onConfirm;
    state.value.onCancel = data.onCancel;
    state.value.typeClass = data.typeClass;
  }
  function closeLayer() {
    state.value.isOpen = false;
  }

  return {
    isOpen,
    title,
    content,
    btnType,
    confirm,
    cancel,
    onConfirm,
    onCancel,
    typeClass,
    openLayer,
    closeLayer,
  };
});
```

이제 어느 컴포넌트에서든 `openLayer`함수를 호출하여 레이어를 띄울 수 있습니다!

```javascript
import { useLayerStore } from "@/stores/useLayerStore";

const { openLayer } = useLayerStore();

openLayer({
  title: "안내",
  content: `내용`,
  btnType: 2,
  confirm: "회원가입",
  onConfirm: () => {
    router.push("/signup");
  },
  cancel: "취소",
});
```
