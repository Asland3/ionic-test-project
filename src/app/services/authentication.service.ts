import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: Auth) {}

  async register({ email, password }: { email: string; password: string }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user; // Return the user object when registration is successful
    } catch (error) {
      return null;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user; // Return the user object when login is successful
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
}
