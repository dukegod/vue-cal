<template>
  <div id="">
    <div class="month">
      <ul>
          <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
          <li class="year-month" @click="pickYear(currentYear,currentMonth)">
              <span class="choose-year">{{ currentYear }}</span>
              <span class="choose-month">{{ currentMonth }}月</span>
          </li>
          <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
      </ul>
    </div>
      <!-- 星期 -->
    <ul class="weekdays">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li style="color:red">六</li>
      <li style="color:red">日</li>
    </ul>
      <!-- 日期 -->
    <ul class="days">
      <li v-for="(dayobject, index) in days" :key="index">
        <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
        <span v-else>
          <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()"
              class="active">{{ dayobject.day.getDate() }}</span>
          <span v-else>{{ dayobject.day.getDate() }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CalView',
  data: function() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: []
    };
  },
  created() {
    let that = this;
    that.initData(null);
  },
  methods: {
    initData: function(cur) {
      let that = this;
      let date;
      if (cur) {
        date = new Date(cur);
      } else {
        let now = new Date();
        let d = new Date(that.formatDate(now.getFullYear(), now.getMonth(), 1));
        d.setDate(35);
        date = new Date(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      }
      that.currentDay = date.getDate();
      that.currentYear = date.getFullYear();
      that.currentMonth = date.getMonth() + 1;
      that.currentWeek = date.getDay();
      if (that.currentWeek == 0) {
        that.currentWeek = 7;
      }
      let str = that.formatDate(
        that.currentYear,
        that.currentMonth,
        that.currentDay
      );
      that.days.length = 0;

      for (let i = that.currentWeek - 1; i >= 0; i--) {
        let d = new Date(str);
        d.setDate(d.getDate() - i);
        let dayobject = {};
        dayobject.day = d;
        that.days.push(dayobject);
      }
      //其他周
      for (let i = 1; i <= 35 - that.currentWeek; i++) {
        let d = new Date(str);
        d.setDate(d.getDate() + i);
        let dayobject = {};
        dayobject.day = d;
        that.days.push(dayobject);
      }
    },
    pickPre: function(year, month) {
      let that = this;
      let d = new Date(that.formatDate(year, month, 1));
      d.setDate(0);
      that.initData(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickNext: function(year, month) {
      let that = this;
      let d = new Date(that.formatDate(year, month, 1));
      d.setDate(35);
      that.initData(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickYear: function(year, month) {
      alert(year + ',' + month);
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year, month, day) {
      let y = year;
      let m = month;
      if (m < 10) m = '0' + m;
      let d = day;
      if (d < 10) d = '0' + d;
      return y + '-' + m + '-' + d;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

/*日历*/
#calendar {
  width: 100%;
  border: 2px solid #a4a7b0;
  height: 335px;
  margin-left: 0.5%;
}

.month {
  width: 92%;
  height: 48px;
  border: 2px solid #ffffff;
  margin-left: 3%;
  margin-top: 20px;
}

.month ul {
  margin: 0;
  padding: 0;
  display: flex;
  margin-top: 11px;
  justify-content: space-between;
}

.year-month {
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.choose-year {
  padding: 0 20px;
  font-size: 16px;
  font-weight: 200;
}

.choose-month {
  text-align: center;
  font-size: 16px;
  font-weight: 200;
}

.arrow {
  width: 3%;
  height: 25px;
}

.arrow1 {
  margin-left: 44px;
}

.arrow2 {
  margin-right: 44px;
}

.month ul li {
  color: #999;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
  list-style: none;
}

.weekdays {
  margin: 0;
  color: #ffffff;
  /* background: #a4a7b0; */
  width: 96.6%;
  margin-top: 26px;
  height: 34px;
  line-height: 34px;
  margin-left: 2.2%;
}

.weekdays li {
  display: inline-block;
  text-align: center;
  color: #11616f;
  font-size: 14px;
  font-weight: 100;
  width: 12.7%;
}

.days {
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.days li {
  list-style-type: none;
  display: inline-block;
  width: 14.2%;
  text-align: center;
  padding-bottom: 3px;
  padding-top: 7px;
  font-size: 12.78px;
  font-weight: 200;
}

.days li span span {
  height: 29.5px;
  width: 27px;
  line-height: 29.5px;
  display: inline-block;
}

.days li .other-month {
  padding: 5px;
  color: #84a8ae;
}
</style>

