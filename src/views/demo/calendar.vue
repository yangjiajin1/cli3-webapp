<template>
  <div class="calendar">
    <van-nav-bar title="日历" left-text="返回" left-arrow @click-left="back" />
    <div class="content">
      <Calendar
      :lunar="true"
      ></Calendar>
    </div>
  </div>
</template>

<script>
import Calendar from '../../components/calendar/Calendar'
export default {
  name: "calendar",
  components: {
    Calendar
  },
  data() {
    return {
    };
  },
  mounted() {

  },
  methods: {
  }
};
</script>
<style lang="scss">
.calendar {
}
</style>

