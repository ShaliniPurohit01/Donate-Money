<template>
  <div>
    <notifications group="foo" position="top center" />

    <header>Donate Now !</header>

    <!-- tooltip -->
    <div class="container-div tooltip">
      <span class="tooltiptext">
        " ${{ remaining }} still needed for this project! "
      </span>
      <div class="main">
        <!-- Progress Bar -->
        <div class="wrapper">
          <div class="bar" :style="{ width: width + '%' }">{{ count }}$</div>
        </div>

        <!-- Inner Quatation -->
        <div class="quote">
          <div><span>Only 3 days left</span> to fund this project!!</div>
          <p>
            join {{ counter }} other doners who have already supported this
            project. Every doner helps.
          </p>
        </div>
        <div>
          <input
            type="text"
            v-model="amount"
            name=""
            class="btn"
            placeholder="Enter amount here!"
          />
          <button @click="donate" class="donate btn">
            Give Now
          </button>
          <div class="blue">Why give ${{ amount }} ??</div>
        </div>
      </div>

      <div class="next-btn">
        <div class="next-btn1">
          <button @click="save" class="next-btn1">Save for later</button>
        </div>

        <!-- Facebook sharing -->
        <social-sharing
          url="https://vuejs.org/"
          title="The Progressive JavaScript Framework"
          description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
          quote="Vue is a progressive framework for building user interfaces."
          hashtags="vuejs,javascript,framework"
          twitter-user="vuejs"
          inline-template
        >
          <div class="next-btn2">
            <network network="facebook">
              <!-- <button class="next-btn2" > -->
              Tell your friends
              <!-- </button> -->
            </network>
          </div>
        </social-sharing>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Donate",
  props: {
    msg: String
  },
  data: function() {
    return {
      count: 0,
      total: 200,
      amount: null,
      width: 0,
      counter: 0,
      totalcounter: 0,
      remaining: 200
    };
  },
  methods: {
    donate: function() {
      //if check of min 1 and max less then total if its exciding show error
      if (this.checkCurrency()) {
        this.count += Number(this.amount);
        let tempCollection = this.count;
        if (this.remaining <= this.total) {
          this.width = (tempCollection / this.total) * 100;
        }
        this.remaining = this.remaining - this.amount;
        this.amount = null;

        //validation if entered amount exceed total amount value
        if (this.remaining == this.total || this.remaining <= 0) {
          this.$notify({
            group: "foo",
            type: "success",
            title: "Message",
            text: "Collected sufficient Money!!"
          });
          this.remaining = 0;
          this.width = 100;
          this.count = this.total;
        }

        //count number of doners
        if (this.remaining < this.total) {
          this.counter += 1;
        }
        this.totalcounter += 1;
      } else {
        this.$notify({
          group: "foo",
          type: "warn",
          title: "Message",
          text: "Donation amount should be a number."
        });
        this.amount = null;
      }
    },

    save: function() {
      if (this.checkCurrency()) {
        this.$notify({
          group: "foo",
          type: "success",
          title: "Message",
          text: "Saved for later!!"
        });
      } else {
        this.$notify({
          group: "foo",
          type: "warn",
          title: "Message",
          text: "Please enter valid amount!!"
        });
      }
    },
    checkCurrency: function() {
      var curRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
      if (this.amount.match(curRegex)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
header {
  margin-bottom: 15px;
  font-size: 40px;
  color: red;
}
.container-div {
  width: 40%;
  margin: 0 auto;
  height: 500px;
  margin-top: 25px;
  border-bottom: 0px;
  position: relative;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted darkslategrey;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 100%;
  background-color: darkslategrey;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: relative;
  z-index: 1;
  bottom: 14px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.main {
  border: solid gray;
  position: relative;
  margin: 0 5%;
  height: 300px;
}
.wrapper {
  border: solid rgb(170, 167, 167);
  width: 99%;
  margin: 0 auto;
}
.bar {
  width: 80%;
  background: orange;
  color: black;
}
span {
  color: darkred;
  font-weight: bolder;
}
div {
  color: gray;
  font-weight: bold;
  font-size: 20px;
}

.quote {
  padding: 7%;
}
.btn {
  width: 159px;
  height: 40px;
  font-weight: bold;
}
.donate {
  background: green;
  height: 48px;
  border-radius: 6%;
  color: white;
  font-size: 20px;
  margin-left: 40px;
}
.blue {
  color: rgb(33, 145, 236);
  font-size: 15px;
  margin-right: 257px;
}
.next-btn {
  box-sizing: border-box;
  margin-top: 20px;
  margin-left: -20px;
}
.next-btn1 {
  
  margin-top: 20px;
  /* width: 200px; */
  width:50%;
  height: 50px;
  border-radius: 10px;
  background-color: rgb(223, 219, 219);
  color: rgb(83, 83, 83);
  /* font-weight: bold; */
  margin-left: -20px;
}

.next-btn2 {
  /* margin: -50px -90px 80px -10px; */
  /* width: 200px; */
  height: 50px;
  width:50%;
  border-radius: 10px;
  background-color: rgb(223, 219, 219);
  color: rgb(83, 83, 83);
  font-size: 15px;
  text-decoration: none;
  /* justify-content: center; */
}
</style>
