import app from '../../services/initFirebase';

class Firebase {
  constructor() {
    this.auth = app.auth();
    this.db = app.database();
    this.presence = app.database().ref('presence/');
    this.users = app.database().ref('users/');
    this.messages = app.database().ref('chats/');
  }

  async getDataUsers() {
    try {
      return app.database().ref('users/').once('value')
          .then((snapshot) => {
            return snapshot.val()
          });
    } catch (e) {
      new Error(e);
      console.log(e);
    }
  }

  async getDataUsersOnline() {
    try {
      return app.database().ref('presence/').once('value')
          .then((snapshot) => {
            return snapshot.val()
          })
    } catch (e) {
      new Error(e);
      console.log(e);
    }
  }

  async getDataMessages() {
    try {
      return app.database().ref('chats/').once('value')
          .then((snapshot) => {
            return snapshot.val()
          })
    } catch (e) {
      new Error(e);
      console.log(e);
    }
  }

  async registerInFirebase(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({
      displayName: name
    })
  }

  async login(name, email, password) {
    await this.auth.signInWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({
      displayName: name
    })
  }

  logout() {
    return this.auth.signOut()
  }

  addQuote(quote) {
    if (!this.auth.currentUser) {
      return alert('Not authorized')
    }
    return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
      quote
    })
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  async getCurrentUserQuote() {
    const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get();
    return quote.get('quote')
  }
}

export default new Firebase();