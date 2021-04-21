<template>
  <div>ModelView: {{ modelName }}</div>
</template>

<script>
export default {
  props: {
    modelName: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
