<template>
  <v-container>
    <v-btn @click="loginWithGoogle">Login with Google</v-btn>
  </v-container>
</template>

<script>
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

export default {
  methods: {
    loginWithGoogle() {
      signInWithPopup(auth, provider)
        .then(result => {
          console.log('User signed in:', result.user);
          this.$router.push('/crud');
        })
        .catch(error => {
          console.error('Error signing in:', error);
        });
    }
  }
}
</script>