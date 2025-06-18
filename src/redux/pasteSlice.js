import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const intialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

const pasteSlice = createSlice({
  name: "paste",
  initialState: intialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("paste created successfully");
    },
    removeFromPastes: (state, action) => {
      const id = action.payload;
      const index = state.pastes.findIndex((item) => item._id === id);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted successfully");
      }
    },
    updatePaste: (state, action) => {
      const paste = action.payload;

      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      }
    },
  },
});

export const { addToPastes, removeFromPastes, resetAllPastes, updatePaste } =
  pasteSlice.actions;
export default pasteSlice.reducer;
