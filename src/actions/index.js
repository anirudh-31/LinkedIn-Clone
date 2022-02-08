import { db, auth, provider, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { signInWithPopup } from "firebase/auth";
import {
  SET_USER,
  SET_LOADING_STATUS,
  GET_ARTICLES,
  SET_PROGRESS,
} from "./actionType";
import {
  collection,
  addDoc,
  doc,
  query,
  getDocs,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});
export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});
export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});

export const setProgress = (progress) => ({
  type: SET_PROGRESS,
  progress: progress,
});
export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((res) => {
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((err) => console.log(err.message));
  };
}

export function postContentAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image !== "") {
      const upload = ref(storage, `images/${payload.image.name}`);
      const task = uploadBytesResumable(upload, payload.image);
      task.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          dispatch(setProgress(progress));
          if (snapshot.state === "running") {
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await getDownloadURL(task.snapshot.ref);

          const data = {
            actor: {
              email: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImage: downloadURL,
            description: payload.description,
          };
          const docRef = await addDoc(collection(db, "articles"), data)
            .then((docRef) => dispatch(setLoading(false)))
            .catch((err) => console.log(err));

          // db.collection("articles").add({
          //   actor: {
          //     email: payload.user.email,
          //     title: payload.user.displayName,
          //     date: payload.timestamp,
          //     image: payload.user.photoURl,
          //   },
          //   video: payload.video,
          //   sharedImage: downloadURL,
          //   desciption: payload.description,
          // });
        }
      );
    } else if (payload.video) {
      dispatch(setLoading(true));
      const data = {
        actor: {
          email: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImage: "",
        description: payload.description,
      };
      const docRef = addDoc(collection(db, "articles"), data)
        .then((docRef) => dispatch(setLoading(false)))
        .catch((err) => console.log(err));
    } else if (payload.image === "" && payload.video === "") {
      dispatch(setLoading(true));
      const data = {
        actor: {
          email: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: "",
        sharedImage: "",
        description: payload.description,
      };
      const docRef = addDoc(collection(db, "articles"), data)
        .then((docRef) => dispatch(setLoading(false)))
        .catch((err) => console.log(err));
    }
  };
}

export function getArticleAPI() {
  return async (dispatch) => {
    let payload;
    const q = query(collection(db, "articles"), orderBy("actor.date", "desc"));
    const querySnapshot = await getDocs(q);

    const snapQuery = onSnapshot(q, (querySnapshot) => {
      payload = querySnapshot.docs.map((d) => d.data());
      dispatch(getArticles(payload));
    });
  };
}
