<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <div v-if="statusMsg || errorMsg" class="mb-10 p-4 bg-light-grey rounded-md shadow-lg">
      <p class="text-at-light-green">{{ statusMsg }}</p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <form @submit.prevent="createTraining" class="flex flex-col gap-y-5 w-full">
        <h1 class="text-2xl text-at-light-green">Record training</h1>
        <div class="flex flex-col">
          <label for="training-name" class="mb-1 text-sm text-at-light-green">Training Name</label>
          <input type="text" required class="p-2 text-grey-500 focus:outline-none" id="training-name" v-model="trainingName">
        </div>
        <div class="flex flex-col">
          <label for="training-type" class="mb-1 text-sm text-at-light-green">Training Type</label>
          <select id="training-type" required class="p-2 text-grey-500 focus:outline-none" @change="trainingChange" v-model="trainingType">
            <option value="select-training">Select Training</option>
            <option value="strength">Strength Training</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>
        <div v-if="trainingType == 'strength'" class="flex flex-col gap-y-4">
          <div v-for="(item, idx) in exercises" :key="idx" class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row">
            <div class="flex flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-at-light-green">Exercise</label>
              <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.exercise">
            </div>
            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-at-light-green">Sets</label>
              <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.sets">
            </div>
            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-at-light-green">Reps</label>
              <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.reps">
            </div>
            <div class="flex flex-col flex-1">
              <label for="weight" class="mb-1 text-sm text-at-light-green">Weight (LB's)</label>
              <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.weight">
            </div>
            <img @click="deleteExercise(item.id)" src="@/assets/images/trash-light-green.png" class="h-4 w-auto absolute -left-5 cursor-pointer" alt="">
          </div>
          <button
            @click="addExercise" 
            type="button" 
            class="
              mt-6 py-2 px-6 
              rounded-sm 
              self-start 
              text-sm text-white 
              bg-at-light-green 
              duration-200 
              border-solid border-2 border-transparent 
              hover:border-at-light-green hover:bg-white hover:text-at-light-green"
          >Add Exercise</button>
        </div>
        <div v-if="trainingType == 'cardio'" class="flex flex-col gap-y-4">
          <div v-for="(item, idx) in exercises" :key="idx" class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row">
            <div class="flex flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-at-light-green">Type</label>
              <select id="cardio-type" class="p-2 w-full text-grey-500 focus:outline=none" v-model="item.cardioType">
                <option value="#">Select Type</option>
                <option value="run">Run</option>
                <option value="walk">Walk</option>
              </select>
            </div>
            <div class="flex flex-col flex-1">
              <label for="distance" class="mb-1 text-sm text-at-light-green">Distance</label>
              <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.distance">
            </div>
            <div class="flex flex-col flex-1">
              <label for="duration" class="mb-1 text-sm text-at-light-green">Duration</label>
              <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.duration">
            </div>
            <div class="flex flex-col flex-1">
              <label for="pace" class="mb-1 text-sm text-at-light-green">Pace</label>
              <input type="text" required class="p-2 w-full text-grey-500 focus:outline-none" v-model="item.pace">
            </div>
            <img @click="deleteExercise(item.id)" src="@/assets/images/trash-light-green.png" class="h-4 w-auto absolute -left-5 cursor-pointer" alt="">
          </div>
          <button
            @click="addExercise" 
            type="button" 
            class="
              mt-6 py-2 px-6 
              rounded-sm 
              self-start 
              text-sm text-white 
              bg-at-light-green 
              duration-200 
              border-solid border-2 border-transparent 
              hover:border-at-light-green hover:bg-white hover:text-at-light-green"
          >Add Exercise</button>
        </div>
        <button 
          type="submit" 
          class="
            mt-6 py-2 px-6 
            rounded-sm 
            self-start 
            text-sm text-white 
            bg-at-light-green 
            duration-200 
            border-solid border-2 border-transparent 
            hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        >Record Training</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { uid } from 'uid';
import { supabase } from '../supabase/init';

export default {
  name: "create",
  setup() {
    const trainingName = ref("")
    const trainingType = ref("select-training")
    const exercises = ref([])
    const statusMsg = ref("")
    const errorMsg = ref("")
    const addExercise = () => {
      if(trainingType.value === 'strength') {
        exercises.value.push({
          id: uid(),
          exercise: "",
          sets: "",
          reps: "",
          weight: ""
        })
        return
      }
      exercises.value.push({
        id: uid(),
        cardioType: "",
        distance: "",
        duration: "",
        pace: ""
      })
    }
    const trainingChange = () => {
      exercises.value = []
      addExercise()
    }
    const deleteExercise = id => {
      if(exercises.value.length > 1) {
        exercises.value = exercises.value.filter(exercise => exercise.id !== id)
        return
      }
      errorMsg.value = "Error: cannot remove, at least one exercise is needed!"
      setTimeout(() => {
        errorMsg.value = ""
      }, 5000)
    }
    const createTraining = async () => {
      try {
        const { error } = await supabase.from('trainings').insert([
          {
            trainingName: trainingName.value,
            trainingType: trainingType.value,
            exercises: exercises.value
          }
        ])
        if(error) throw error
        statusMsg.value = "Success: Training created!"
        trainingName.value = ""
        trainingType.value = "select-training"
        exercises.value = []
        setTimeout(() => {
          statusMsg.value = ""
        }, 5000)
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`
        setTimeout(() => {
          errorMsg.value = ""
        }, 5000);
      }
    }
    return { 
      trainingName, 
      trainingType, 
      exercises, 
      statusMsg, 
      errorMsg, 
      addExercise, 
      trainingChange, 
      deleteExercise,
      createTraining 
    };
  },
};
</script>
