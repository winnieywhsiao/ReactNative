// 定義action type
export const ADD_TODOLIST = 'ADD_TODOLIST'
export const DELETE_TODOLIST = 'DELETE_TODOLIST'
export const FINISH_TODOLIST = 'FINISH_TODOLIST'

// 簡易的ID製造
function ID() {
  return '_' + Math.random().toString(36).substr(2, 9)
}

// 新增的action
export const addTodoList = (todoDec) => {
  return {
    type: ADD_TODOLIST,
    payload: {
      id: ID(),
      todoDec
    },
  };
}

// 刪除的action
export const deleteTodo = (todoIndex) => {
  return {
    type: DELETE_TODOLIST,
    payload: todoIndex,
  }
}

// 完成的action
export const finishTodo = (id) => {
  return {
    type: FINISH_TODOLIST,
    payload: id,
  }
}