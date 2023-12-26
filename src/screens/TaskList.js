import React, {useState} from 'react';
import { View, ScrollView, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Todo from './components/Todo';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import axios from 'axios';
import { useForm, Controller } from "react-hook-form"

const queryClient = new QueryClient()

const TaskList = () => {
  const [openForm, setOpenForm] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      todo: "",
      completed: false,
      userId: 5,
    },
  })
  
  const onSubmit = (dataInput) => {
    // console.log(dataInput);
    useQuery({
      queryKey: ['add'],
      // queryFn: () => {
      //   fetch('https://dummyjson.com/todos/add', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     // body: JSON.stringify({
      //     //   todo: 'Use DummyJSON in the project',
      //     //   completed: false,
      //     //   userId: 5,
      //     // }),
      //     body: dataInput
      //   })
      //     .then(res => res.json())
      //     .then(console.log);
      // },

      queryFn: async () => {
        const res = await axios.post("https://dummyjson.com/todos/add", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // body: JSON.stringify({
          //   todo: 'Use DummyJSON in the project',
          //   completed: false,
          //   userId: 5,
          // }),
          body: dataInput
        });
        console.log(res.data.todos);
        // return res.data.todos;
      }
    })
  }

  return (
    <View>
      <TouchableOpacity 
      onPress={() => {
        setOpenForm(!openForm)
        // onSubmit
      } 
      }><Text>Add</Text></TouchableOpacity>

      {/* form input */}
      {
        (openForm) ?
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Todo"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="todo"
            />
            {errors.todo && <Text>This is required.</Text>}
            <Controller
              control={control}
              rules={{
                maxLength: 100,
                value: false
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Completed"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="completed"
            />
            <Controller
              control={control}
              rules={{
                maxLength: 100,
                value: 5
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="User Id"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="userID"
            />

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          </View> : <></>
      }

      {/* list */}
      <ScrollView>
        <QueryClientProvider client={queryClient}>
          <Example />
        </QueryClientProvider>
      </ScrollView>
    </View>
  )
}



function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['todo'],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/todos");
      // console.log(res.data.todos);
      return res.data.todos;
    },
  })

  const deleteTodo = (idTodo) => {
    console.log("delete")
    // useQuery({
    //   queryKey: ['delete'],
    //   queryFn: () => {
    //     fetch(`https://dummyjson.com/todos/${idTodo}`, {
    //       method: 'DELETE',
    //     })
    //       .then(res => res.json())
    //       .then(console.log);
    //   },
    // })
  }

  if (isPending) return (<Text>loading</Text>)

  if (error) return (<Text>An error has occurred: {error.message}</Text>)
  // console.log(data)
  return (

    <View>
      {
        data.map((todo, index) => {
          return <Todo data={todo} deleteFunction={() => deleteTodo(todo.id)} />
        })
      }
    </View>
  )
}


export default TaskList