<template>
  <button>{{payment}}</button>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    payment() {
      return paypal.Buttons().render('');
    }
  }
};
</script>


