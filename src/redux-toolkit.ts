import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {v1 as uuid} from 'uuid'
import {Todo} from "./type";

const todosInitialState: Todo[] = [
    {
        id: uuid(),
        desc: "Learn React",
        isComplete: true
    },
    {
        id: uuid(),
        desc: "Learn Redux",
        isComplete: true
    },
    {
        id: uuid(),
        desc: "Learn Redux-ToolKit",
        isComplete: false
    }
];

const todosSlice = createSlice({
    name: 'todos',
    initialState: todosInitialState,
    reducers: {
        create: {
            reducer: (
              state,
              {
                payload
              }: PayloadAction<{ id: string; desc: string; isComplete: boolean }>
            ) => {
              state.push(payload);
            },
            prepare: ({ desc }: { desc: string }) => ({
              payload: {
                id: uuid(),
                desc,
                isComplete: false
              }
            })
        },
        edit: (state, {payload}: PayloadAction<{id: string, desc: string}>) => {
            const todoToEdit = state.find(todo => todo.id === payload.id)
        }, 
        toggle: (state,{ payload }: PayloadAction<{ id: string; isComplete: boolean }>) => {
            const index = state.findIndex(todo => todo.id === payload.id);
            if (index !== -1) {
              state[index].isComplete = payload.isComplete;
            }
        },
        remove: (state, { payload }: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(todo => todo.id === payload.id);
            if (index !== -1) {
              state.splice(index, 1);
            }
        }
    }
})