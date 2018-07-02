<template>
  <div id="">
    <div class="month">
      <ul>
        <li class="arrow">❮</li>
        <li class="year-month">
            <span class="choose-year">{{ currentYear}}年</span>
            <span class="choose-month">{{ currentMonth }}月</span>
        </li>
        <li class="arrow">❯</li>
      </ul>
    </div>
      <!-- 星期 -->
    <ul class="weekdays">

      <li>日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>

    </ul>
      <!-- 日期 -->
    <ul data-v-169781ad="" class="days">

      <!-- <li data-v-169781ad="">
        <span data-v-169781ad="">
          <span data-v-169781ad="" class="active">
            29
          </span>
        </span>
      </li> -->
      <li v-for="(item, index) in days" :key="index">
        <span data-v-169781ad="">
          <span data-v-169781ad="">
            {{ item.day.getDate() }}
          </span>
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
      currentDay: 1,  //
      currentMonth: 1, // 月
      currentYear: 1970, // 年
      currentWeek: 1, // 第几周
      days: [],
      date: '',
    };
  },
  created() {
    this.init()
  },
  methods: {
    init: function () {
      // 获取现在的日期
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      const currentDay = now.getDate();
      const currentFormat = this.formatDate(currentYear, currentMonth, currentDay)

      console.log('now', new Date())


      // 获取上一个月的开始日期
      const startDay = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
      console.log('startDay-----', this.formatDate(now.getFullYear(), now.getMonth(), 1))
      startDay.setDate(0);

      let endDay;
      endDay = new Date(this.formatDate(now.getFullYear(), now.getMonth() + 1, 1));
      console.log('endDay-----', this.formatDate(startDay.getFullYear(), startDay.getMonth() + 1, 1));

      // 获取日期在一个月中的第几天
      this.currentDay = endDay.getDate();
      // 获取年
      this.currentYear = endDay.getFullYear();
      // 获取月份
      this.currentMonth = endDay.getMonth() + 1;
      // 获取星期数
      this.currentWeek = endDay.getDay();


      let str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
      console.log('---str---', str);

      for (let i = this.currentWeek; i >= 0; i--) {
        console.log(i)
        let d = new Date(str);
        console.log(d.getDate()-i)
        d.setDate(d.getDate() - i);
        let dayobject = {
          date: '',
          isToday: false,
          color: '',
          isDayAfter: false,
          isDayBefore: true
        };
        console.log('---currentWeek', d)
        dayobject.day = d;
        this.days.push(dayobject);
      }

      for (let i = 1; i < 42 - this.currentWeek; i++) {
        let d = new Date(str);
        d.setDate(d.getDate() + i);
        let dayobject = {
          date: '',
          isToday: false,
          color: '',
          isDayAfter: false,
          isDayBefore: true
        };
        console.log('---d---', d*1);
        dayobject.day = d;
        this.days.push(dayobject);
      }
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
  background: #a4a7b0;
  width: 96.6%;
  margin-top: 26px;
  height: 34px;
  line-height: 34px;
  margin-left: 2.2%;
}

.weekdays li {
  display: inline-block;
  text-align: center;
  /* color: #11616f; */
  color: #000;
  font-size: 20px;
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
  /* display: inline-block; */
  width: 14.285%;
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
  /* padding: 5px; */
  color: #84a8ae;
}
</style>

