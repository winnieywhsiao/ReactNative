import { 
ADD_TODOLIST, 
DELETE_TODOLIST, 
FINISH_TODOLIST 
} from './actions'

// 初始狀態
const initState = {
  todoList: [],
  finishList: [],
}

// reducer 就像是一個中央管理狀態的地方
// 只透過action 來改變state
// dispatch將action傳進來，告訴reducer，這是甚麼類型的action，
// reducer就會根據類型去做不一樣的事情，進而去改變(新增或刪除)中央的管理state

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODOLIST: {
      const tempTodo = [...state.todoList];
      tempTodo.push(action.payload);
      return {
        ...state,
        todoList: tempTodo,
      };
    }

    case DELETE_TODOLIST: {
      const tempTodo = [...state.todoList];
      // 將傳進來的index位置刪除掉。
      tempTodo.splice(action.payload, 1)
      return {
        ...state,
        todoList: tempTodo
      }
    }

    case FINISH_TODOLIST : {
      const TempFinish = [...state.finishList]
      TempFinish.push(action.payload)
      return {
        ...state,
        finishList: TempFinish
      }
    }

    default:
      return state;

  }

};



export default reducer