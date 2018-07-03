<template>
  <div id="">
    <!-- 月显示日期 -->
    <div class="month" v-show="false">
      <ul>
        <li class="arrow" @click="pickPreMonth">❮</li>
        <li class="year-month">
            <span class="choose-year">{{ currentYear}}年</span>
            <span class="choose-month">{{ currentMonth }}月</span>
        </li>
        <li class="arrow" @click="pickNextMonth">❯</li>
      </ul>
    </div>

    <!-- 周显示日期 -->
    <div class="month">
      <ul>
        <li class="arrow" @click="pickWeekPre">❮</li>
        <li class="year-month">
            <span class="choose-year">{{ currentYear}}年</span>
            <span class="choose-month">{{ currentMonth }}月</span>
        </li>
        <li class="arrow" @click="pickWeekNext">❯</li>
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
      <!-- 月份格式显示日期 -->
    <ul v-show="false" class="days">
      <li v-for="(item, index) in days" :key="index">
        <div :class="item.isToday? 'active': ''">
          <span>
            {{ item.date.getDate() }}
          </span>
        </div>
      </li>
    </ul>
    <!-- 周格式的日期显示 -->
    <ul v-show="true" class="weeks">
      <li v-for="(item, index) in weekDays" :key="index">
        <div :class="item.isToday? 'active': ''">
          <span>
            {{ item.date.getDate() }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CalView',
  data: function() {
    return {
      currentDay: 1, //
      currentMonth: 1, // 月
      currentYear: 1970, // 年
      currentWeek: 1, // 第几周
      days: [],
      weekDays: [],
      date: ''
    };
  },
  created() {
    this.initWeeks();
  },
  methods: {
    initMonth: function(date) {
      // debugger
      // 获取现在的日期
      let now;

      if (date) {
        now = new Date(date);
      } else {
        now = new Date();
      }

      this.currentYear = now.getFullYear();
      this.currentMonth = now.getMonth() + 1;
      this.currentDay = now.getDate();
      const currentFormat = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
      // 获取上一个月的开始日期
      const startDay = new Date(
        this.formatDate(now.getFullYear(), now.getMonth(), 1)
      );

      startDay.setDate(0);

      let endDay;
      endDay = new Date(
        this.formatDate(now.getFullYear(), now.getMonth() + 1, 1)
      );

      // 获取日期在一个月中的第几天
      // this.currentDay = endDay.getDate();
      // 获取年
      this.currentYear = endDay.getFullYear();
      // 获取月份
      this.currentMonth = endDay.getMonth() + 1;
      // 获取星期数
      this.currentWeek = endDay.getDay();

      let str = this.formatDate(this.currentYear, this.currentMonth, 1);

      for (let i = this.currentWeek; i >= 0; i--) {
        let d = new Date(str);

        d.setDate(d.getDate() - i);

        let dayobject = {
          date: '',
          isToday: false,
          color: '',
          isDayAfter: false,
          isDayBefore: true
        };
        if (
          d.getFullYear() === new Date().getFullYear() &&
          d.getMonth() === new Date().getMonth() &&
          d.getDate() === new Date().getDate()
        ) {
          dayobject.date = d;
          dayobject.isToday = true;
        } else {
          dayobject.date = d;
        }

        // dayobject.isToday = true;
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
        if (
          d.getFullYear() === new Date().getFullYear() &&
          d.getMonth() === new Date().getMonth() &&
          d.getDate() === new Date().getDate()
        ) {
          dayobject.date = d;
          dayobject.isToday = true;
        } else {
          dayobject.date = d;
        }

        this.days.push(dayobject);
      }
    },

    initWeeks: function(date) {
      let now;
      if (date) {

        now = new Date(date);
      } else {
        now = new Date();
      }
      this.currentDay = now.getDate(); // 今日日期 几号
      this.currentYear = now.getFullYear(); // 当前年份
      this.currentMonth = now.getMonth() + 1; // 当前月份
      this.currentWeek = now.getDay(); // 1...6,0  // 星期几
      if (this.currentWeek === 0) {
        this.currentWeek = 7;
      }
      const str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      ); // 今日日期 年-月-日
      this.weekDays.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
      /* eslint-disabled */
      for (let i = this.currentWeek; i >= 0; i -= 1) {
        const d = new Date(str);
        d.setDate(d.getDate() - i);

        let dayobject = {
          date: '',
          isToday: false,
          color: '',
          isDayAfter: false,
          isDayBefore: true
        };
        if (
          d.getFullYear() === new Date().getFullYear() &&
          d.getMonth() === new Date().getMonth() &&
          d.getDate() === new Date().getDate()
        ) {
          dayobject.date = d;
          dayobject.isToday = true;
        } else {
          dayobject.date = d;
        }
        this.weekDays.push(dayobject);

      }
      for (let i = 1; i < 7 - this.currentWeek; i += 1) {
        const d = new Date(str);
        d.setDate(d.getDate() + i);

        let dayobject = {
          date: '',
          isToday: false,
          color: '',
          isDayAfter: false,
          isDayBefore: true
        };
        if (
          d.getFullYear() === new Date().getFullYear() &&
          d.getMonth() === new Date().getMonth() &&
          d.getDate() === new Date().getDate()
        ) {
          dayobject.date = d;
          dayobject.isToday = true;
        } else {
          dayobject.date = d;
        }
        this.weekDays.push(dayobject);
      }
    },

    // 上个星期
    pickWeekPre() {
      const d = this.weekDays[0].date;
      d.setDate(d.getDate() - 6);
      this.initWeeks(d);
    },

    // 下个星期
    pickWeekNext() {
      const d = this.weekDays[6].date;
      d.setDate(d.getDate() + 7);
      this.initWeeks(d);
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year, month, day) {
      let y = year;
      let m = month;
      if (m < 10) m = '0' + m;
      let d = day;
      if (d < 10) d = '0' + d;
      return y + '-' + m + '-' + d;
    },

    pickPreMonth() {
      const d = new Date(
        this.formatDate(this.currentYear, this.currentMonth, 1)
      );
      // debugger
      d.setDate(0);
      this.days = [];
      this.initMonth(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },

    pickNextMonth() {
      const d = new Date(
        this.formatDate(this.currentYear, this.currentMonth, 1)
      );
      d.setDate(42);
      this.days = [];
      this.initMonth(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
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
  color: #000;
  font-size: 20px;
  font-weight: 100;
  width: 12.7%;
}

.days,
.weeks {
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.days li,
.weeks li {
  list-style-type: none;
  width: 14.285%;
  padding-bottom: 3px;
  padding-top: 7px;
  font-size: 12.78px;
  font-weight: 200;
}

.days li div,
.weeks li div {
  height: 27px;
  width: 27px;
  line-height: 27px;
  margin: 0 auto;
  text-align: center;
}

.days li div.active,
.weeks li div.active {
  background-color: #eeeeee;
  color: red;
  font-size: 20px;
}

.days li div span {
  color: inherit;
}

.days li .other-month {
  /* padding: 5px; */
  color: #84a8ae;
}
</style>

