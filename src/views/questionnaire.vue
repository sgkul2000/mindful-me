<template>
<div id="questionnaire" class="content-wrapper">
  <div class="flex items-center justify-center flex-col">
    <h1 class="outline-secondary outline-2 text-4xl mb-10 brand-shadow title-font">How do you feel today?</h1>
    
    <img src="../assets/think.png" class="h-32 mb-4 pl-4">

    <div class="question mb-4">
      {{questions[questionIndex]}}
    </div>


    <div class="rating">
      <form name="select-rating" class="select-rating">
      <fieldset>
        <div
          v-for="formGroup in formGroups"
          :key="formGroup"
          class="form-group mx-1"
        >
          <input
            type="radio"
            name="rating"
            :id="formGroup"
            :value="formGroup"
            v-model="rating_pick"
          />
          <label :for="formGroup">{{ formGroup }}</label>
        </div>
      </fieldset>

      <span @click="handleInput" class="block btn-border ">
        {{ questionIndex != 2 ? "Next" : "Submit" }}
      </span>
    </form>
    </div>
  </div>
</div>
</template>

<script>
// import api from "../appwrite"
export default {
  name: "questionnaire",
  data() {
    return {
      rating_pick: 5,
      formGroups: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      questionIndex: 0,
      questions: [
        "happy",
        "angry",
        "anxious"
      ],
      formInput: {
        happy: null,
        angry: null,
        anxious: null,
        neutral: 0,
        stamp: null,
      },
    };
  },
  methods: {
    async handleInput() {
      switch (this.activeTab) {
        case 0:
          this.formInput.happy = this.rating_pick * 10;
          break;
        case 1:
          this.formInput.angry = this.rating_pick * 10;
          break;
        case 2:
          this.formInput.anxious = this.rating_pick * 10;
          break;
      }
      if (this.questionIndex !== 2) {
        this.questionIndex++;
      } else {
      
      //   const docRef = doc(db, "users", this.$store.state.user.uid);
      //   const dbResp = await getDoc(docRef);
      //   const dbData = dbResp.data();
      //   const lastDate = new Date(
      //     dbData.moods.at(-1).stamp.seconds * 1000 +
      //       dbData.moods.at(-1).stamp.nanoseconds / 1000000
      //   );
      //   if (lastDate.getDate() === new Date().getDate()) {
      //     let moods = dbData.moods;
      //     moods.pop();
      //     await updateDoc(docRef, {
      //       moods: [
      //         ...moods,
      //         {
      //           ...this.formInput,
      //           stamp: new Date(),
      //         },
      //       ],
      //     });
      //   } else {
      //     await updateDoc(docRef, {
      //       moods: arrayUnion({
      //         ...this.formInput,
      //         stamp: new Date(),
      //       }),
      //     });
      //   }
      //   this.$emit("close");
      }
    },
  }

}
</script>

<style>

 .rating form.select-rating {
	 display: grid;
	 gap: 24px;
}
 .rating form.select-rating fieldset {
	 border: none;
	 display: flex;
	 justify-content: space-between;
	 align-items: center;
	 padding: 0;
}
 .rating form.select-rating fieldset div.form-group {
	 width: 45px;
	 height: 45px;
	 border-radius: 50%;
	 position: relative;
	 display: grid;
	 place-items: center;
}
 .rating form.select-rating fieldset div.form-group label {
	 color: #7c8798;
	 font-size: 1em;
	 font-weight: 700;
	 width: 100%;
	 height: 100%;
	 border-radius: 50%;
	 display: grid;
	 place-items: center;
	 background: rgba(124, 135, 152, 0.1);
	 transition: 0.2s ease-in-out;
	 cursor: pointer;
}
 .rating form.select-rating fieldset div.form-group input {
	 position: absolute;
	 width: 100%;
	 height: 100%;
	 border-radius: 50%;
	 opacity: 0;
}
 .rating form.select-rating fieldset div.form-group input:checked + label {
	 background: #F2BED1;
	 color: #fff;
}
 .rating form.select-rating fieldset div.form-group:hover label {
	 background: #959eac;
	 color: #fff;
}
 .rating form.select-rating span {
	 outline: none;
	 border: none;
	 background: #F2BED1;
	 color: #fff;
	 padding: 15px 0;
	 border-radius: 99rem;
	 font-size: 0.9em;
	 text-transform: uppercase;
	 letter-spacing: 0.1rem;
	 font-weight: 700;
	 cursor: pointer;
	 transition: 0.2s ease-in-out;
	 text-align: center;
	 width: 20vw;
	 position: relative;
	 left: 50%;
   transform: translateX(-50%)
}
 .rating form.select-rating span:hover {
	 background: #fff;
	 color: #F2BED1;
}
 
</style>