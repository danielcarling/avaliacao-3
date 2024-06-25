// user.js
import { defineStore } from "pinia";
import { auth } from "@/plugins/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      displayName: null,
      email: null,
      uid: null,
    },
  }),
  getters: {
    isAuthenticated() {
      return !!this.user.uid;
    },
  },
  actions: {
    async signIn() {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      this.user = userCredential.user;
    },

    async signOut() {
      await signOut(auth);
      this.user = {};
    },
  },
});
