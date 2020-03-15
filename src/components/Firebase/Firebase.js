import app from '../../services/initFirebase';

class Firebase {
  constructor() {
    this.auth = app.auth;
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

  async registerInFirebase(email, password) {
    try {
      await app.auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      new Error(e);
      console.log(e);
    }
  }

  async login(email, password, name, history) {
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      await app.auth().currentUser.updateProfile({
        displayName: name
      });
      history.push('/home/');
    } catch (e) {
      console.log(e)
    }
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
      app.auth().onAuthStateChanged(resolve)
    })
  }

  async getCurrentUserQuote() {
    const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get();
    return quote.get('quote')
  }

  getCurrentUsername() {
    if (app.auth().currentUser) {
      return app.auth().currentUser.displayName
    } else {
      return null
    }
  }
}

export default new Firebase();