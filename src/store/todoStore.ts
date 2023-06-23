import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



import type { TodoDTO } from './TodoTypes';


export const todoApi = createApi({
  reducerPath: 'todoAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({

    getTodos: builder.query<TodoDTO[], void>({
      query: () => `todos`,
      providesTags: [{ type: 'Todos', id: 'List' }],

    }),

    updateTodos: builder.mutation<TodoDTO, TodoDTO>({
      query(todo) {
        return {
          url: `todos/${todo.id}`,
          method: 'PUT',
          body: todo
        }
      },
      invalidatesTags: [{ type: 'Todos', id: 'List' }]
    }),

    deleteTodo: builder.mutation<TodoDTO, TodoDTO>({
      query(todo) {
        return {
          url: `todos/${todo.id}`,
          method: 'DELETE',
          body: todo
        }
      },
      invalidatesTags: [{ type: 'Todos', id: 'List' }]
    }),

    addTodo: builder.mutation<TodoDTO, TodoDTO>({
      query(todo) {
        return {
          url: `todos`,
          method: 'POST',
          body: todo
        }
      },
      invalidatesTags: [{ type: 'Todos', id: 'List' }]
    }),


  }),

})