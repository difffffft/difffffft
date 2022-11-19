import { onMounted, ref, watch } from 'vue';

export default () => {
  let documentHeight = ref(document.documentElement.clientHeight);
  let bodyHeight = ref(0);
  let footerIsShow = ref(true);

  onMounted(() => {
    window.onresize = () => {
      bodyHeight.value = document.body.clientHeight;
    };
  });

  watch(bodyHeight, (newValue, oldValue) => {
    console.log(documentHeight.value > bodyHeight.value);
    if (documentHeight.value > bodyHeight.value) {
      footerIsShow.value = false;
    } else {
      footerIsShow.value = true;
    }
  });

  return {
    documentHeight,
    bodyHeight,
    footerIsShow,
  };
};
