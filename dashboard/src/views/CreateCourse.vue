<template>
  <v-container>
    <v-layout pt-3>
      <v-flex xs6 offset-xs3>
        <v-form class="form">
          <v-text-field v-model="Course.name" label="Name" required></v-text-field>
          <v-text-field v-model="Course.courseCode" label="CourseCode" required></v-text-field>
          <v-text-field v-model="Course.numberOfLessons" label="Number Of Lessons"></v-text-field>
          <v-text-field v-model="Course.semester" label="Semester"></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on }">
            <v-btn round dark v-on="on">Δημιουργια</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">Δημιουργια νεου μαθηματος</v-card-title>
            <v-card-text>Ειστε σιγουροι οτι τα στοιχεια του μαθηματος ειναι σωστα και οτι θελετε να δημιουργησετε αυτο το μαθημα;</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="pink darken-1" flat @click="dialog = false">Disagree</v-btn>
              <v-btn color="pink darken-1" flat @click="createCourse(Course)">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CourseService from '@/services/CourseService'
export default {
  data () {
    return {
      Course: {
        name: '',
        courseCode: '',
        numberOfLessons: '',
        semester: ''
      },
      dialog: false
    }
  },
  methods: {
    async createCourse () {
      try {
        let newCourse = {
          name: this.Course.name,
          courseCode: this.Course.courseCode,
          numberOfLessons: this.Course.numberOfLessons,
          semester: this.Course.semester
        }
        let response = await CourseService.createCourse(newCourse)
        if (response.success === true) {
          this.Course = {
            name: '',
            courseCode: '',
            numberOfLessons: '',
            semester: ''
          }
          this.dialog = false
          location.reload(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped>
</style>
