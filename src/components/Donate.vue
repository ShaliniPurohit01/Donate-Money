<template>
  <div>
    <!-- notification bar  -->
    <notifications group="foo" position="top center" />

    <header>Donate Now !</header>

    <!-- tooltip -->
    <div class="container-div tooltip">
      <span class="tooltiptext"
        >" ${{ remaining }} still needed for this project! "</span
      >
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
            name
            class="btn inputfield"
            placeholder="Enter amount here!"
          />
          <button @click="confirm" class="donate btn">Give Now</button>
          <div class="blue">Why give ${{ amount }} ??</div>
        </div>
      </div>

      <div>
        <button @click="save" class="button1">Save for later</button>
        <button class="button2">
          <!-- facebook post sharing  -->
          <social-sharing
            url="https://vuejs.org/"
            title="The Progressive JavaScript Framework"
            description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
            quote="Vue is a progressive framework for building user interfaces."
            hashtags="vuejs,javascript,framework"
            twitter-user="vuejs"
            inline-template
            class="social-sharing"
          >
            <div>
              <network network="facebook">Tell your friends</network>
            </div>
          </social-sharing>
        </button>
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
        //if input field is not validate
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
      //if valid currency is entered then following block will execute
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

    //currency validation
    //regular expression for currency/amount -> /^[0-9]+(\.[0-9]{1,2})?$/
    checkCurrency: function() {
      var curRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
      if (this.amount.match(curRegex)) {
        return true;
      } else {
        return false;
      }
    },

    confirm: function() {
      var self = this;
      this.$dialog
        .confirm("Please confirm to continue")
        .then(function() {
          self.donate();
          self.$notify({
            group: "foo",
            type: "success",
            title: "Message",
            text: "Transaction Successfull"
          });
        })
        .catch(function() {
          self.$notify({
            group: "foo",
            type: "warn",
            title: "Message",
            text: "you canceled last transaction"
          });
        });
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
  font-size: 15px;
}
.inputfield {
  padding: 2px;
}
.donate {
  background: green;
  height: 48px;
  border-radius: 3px;
  color: white;
  font-size: 20px;
  margin-left: 40px;
}
.blue {
  color: rgb(33, 145, 236);
  font-size: 15px;
  margin-right: 257px;
}

.button1 {
  margin-top: 20px;
  width: 200px;
  height: 50px;
  border-radius: 3px;
  background-color: rgb(223, 219, 219);
  color: rgb(39, 38, 38);
  margin-right: 40px;
}
.button2 {
  margin-top: 15px;
  width: 200px;
  height: 50px;
  border-radius: 3px;
  background-color: rgb(223, 219, 219);
  color: rgb(39, 38, 38);
  margin-left: 50px;
}
.social-sharing {
  font-size: inherit !important;
  font-weight: 300 !important;
  width: 159px;
  height: 40px;
  font-weight: bold;
  padding: 6%;
  color: rgb(39, 38, 38);
}
</style>
