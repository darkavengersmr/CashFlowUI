<template>
  <div class="card_inline">
    <div>
      <button @click="yearPrev">&#5130;</button>
      {{ calendar.year }}
      <button @click="yearNext">&#5125;</button>
    </div>
    <div>
      <button @click="monthPrev">&#5130;</button>
      <div class="month">{{ months[calendar.month - 1] }}</div>
      <button @click="monthNext">&#5125;</button>
    </div>    
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {},
  emits: ["updatePeriod"],
  data() {
    return {
      months: [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь",
      ],
    };
  },
  computed: {
    ...mapState({
      calendar: "calendar",
    }),
  },
  methods: {
    ...mapMutations({
      setMonth: "setMonth",
      setYear: "setYear",
    }),
    monthPrev() {
      if (this.calendar.month > 1) {
        this.setMonth(this.calendar.month - 1);
      } else {
        this.setMonth(12);
        this.setYear(this.calendar.year - 1);
      }
      this.sendUpdatePeriod();
    },
    monthNext() {
      if (this.calendar.month < 12) {
        this.setMonth(this.calendar.month + 1);
      } else {
        this.setMonth(1);
        this.setYear(this.calendar.year + 1);
      }
      this.sendUpdatePeriod();
    },
    yearPrev() {
      this.setYear(this.calendar.year - 1);
      this.sendUpdatePeriod();
    },
    yearNext() {
      this.setYear(this.calendar.year + 1);
      this.sendUpdatePeriod();
    },
    sendUpdatePeriod() {
      this.$emit("updatePeriod");
    },
  },
};
</script>
<style scoped>
.card_inline {
  display: inline-flex;
}

button {
  color: white;
  background-color: black;
  border: 0px solid;
}

.month {
  width: 75px;
  justify-content: flex-end;
  display: inline-block;
}

</style>