import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserDatatype = {
  name: String;
  email: String;
  phoneNo: String;
  password: String;
  confirmPassword: String;
  imageUrl: String;
};

export type UserLoginType = {
  email: String;
  password: String;
};

export type InitialStateType = {
  userData: UserDatatype | null;
  isLogin: Boolean;
  error: String;
  isError: Boolean;
};

const initialState: InitialStateType = JSON.parse(
  localStorage.getItem("user")!
) || {
  userData: null,
  isLogin: false,
  error: "",
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<UserLoginType>) => {
      const usersList: UserDatatype[] =
        JSON.parse(localStorage.getItem("usersList")!) || [];
      const userExistArray = usersList.filter(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (userExistArray.length) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            userData: userExistArray[0],
            isLogin: true,
            isError: false,
            error: "",
          })
        );
        return {
          userData: userExistArray[0],
          isLogin: true,
          isError: false,
          error: "",
        };
      }
      return { ...state, isError: true, error: "User Not Found!" };
    },
    signUp: (state, action: PayloadAction<UserDatatype>) => {
      const usersList: UserDatatype[] =
        JSON.parse(localStorage.getItem("usersList")!) || [];
      const userExistArray = usersList.filter(
        (user) => user.email === action.payload.email
      );
      if (userExistArray.length) {
        return { ...state, isError: true, error: "User Already Exists!" };
      }
      localStorage.setItem(
        "usersList",
        JSON.stringify([...usersList, action.payload])
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          userData: action.payload,
          isLogin: true,
          isError: false,
          error: "",
        })
      );
      return {
        userData: action.payload,
        isLogin: true,
        isError: false,
        error: "",
      };
    },
    logOut: () => {
      localStorage.removeItem("user");
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const { logIn, signUp, logOut } = userSlice.actions;
