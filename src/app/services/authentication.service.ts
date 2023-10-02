import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: Auth) {}

  async register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        const db = getFirestore();
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: name,
          email: email,
        });
      }
      return user;
    } catch (error) {
      return null;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (error) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  async googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(this.auth, provider);
      return user;
    } catch (error) {
      return null;
    }
  }

  async forgotPassword({ email }: { email: string }) {
    try {
      const user = await sendPasswordResetEmail(this.auth, email);
      return user;
    } catch (error) {
      return null;
    }
  }
}
