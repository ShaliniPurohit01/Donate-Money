<template>
  <div>
    <notifications group="foo" position="top center" />

    <header>Donate Here!</header>
    <div class="container-div">
      <!-- <button v-tooltip="'$' + remaining + ' still needed for this project!'" /> -->
      <!-- <div class="remain">
        " ${{ remaining }} still needed for this project! "
      </div> -->
      <div class="main">
        <div
          class="wrapper"
          v-tooltip="'$' + remaining + ' still needed for this project!'"
        >
          <div class="bar" :style="{ width: width + '%' }">{{ count }}$</div>
        </div>
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

      <div>
        <button @click="save" class="next-btn">Save for later</button>
        <button @click="facebook" class="next-btn">Tell your friends</button>
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
      // extra: 0
    };
  },
  methods: {
    donate: function() {
      //if check of min 1 and max less then total if its exiddng show error
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
        // this.extra = this.extra + this.remaining;
      }

      //count number of doners
      if (this.remaining < this.total) {
        this.counter += 1;
      }
      this.totalcounter += 1;
    },

    save: function() {
      this.$notify({
        group: "foo",
        type: "success",
        title: "Message",
        text: "Saved for later!!"
      });
    },
    facebook: function() {}
  }
  // inputClass: function() {
  //   var inputField = document.getElementById("inputField").value;
  //   if (this.input === "") {
  //     return "invalid";
  //   } else {
  //     return "valid";
  //   }
  // }
};
</script>

<style scoped>
header {
  font-size: 40px;
  color: red;
}
.container-div {
  width: 40%;
  margin: 0 auto;
  height: 500px;
  margin-top: 25px;
  border-radius: 5%;
  position: relative;
}
.remain {
  border: gray solid;
  background-color: darkslategrey;
  color: white;
  position: relative;
  margin: 5% 5% 2% 5%;
  height: 40px;
  text-align: center;
  padding-top: 13px;
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
  margin-top: 20px;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  background-color: lightgray;
  color: darkslategray;
  font-weight: bold;
  margin-right: 20px;
}
</style>
