import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useFirebase from "../Actions/useFirebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  orderBy,
  query,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const initialState = {
  loading: true,
  error: false,
  userData: {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    isOwner: false,
    isPro: false,
    lastUpdated: null,
  },
};

// ======== Actions ===========
/* Get the user data */
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const { db, auth } = useFirebase();
    const response = await getDoc(doc(db, "users", auth.currentUser.uid));
    console.log("--->>Fetched user data:");
    const lastUpdated = response.data().lastUpdated.toDate().getTime();
    const data = { ...response.data(), lastUpdated: lastUpdated };
    console.log(response.data());
    return data;
  } catch (e) {
    throw Error(e);
  }
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData) => {
    try {
      const { db, auth } = useFirebase();
      const ref = doc(db, "users", auth.currentUser.uid);
      const response = await updateDoc(ref, {
        ...userData,
        lastUpdated: serverTimestamp(),
      });
      return userData;
    } catch (e) {
      throw Error(e);
    }
  }
);

// ========== Slice ===========
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.userData = action.payload;
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true;
      state.error = false;
      state.userData = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.userData = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.userData = action.payload;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { xxxx } = authSlice.actions;

export default userSlice.reducer;
