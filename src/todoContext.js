import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const userContext = createContext();

export const useUserContext = () => {
    const value = useContext(userContext);
    return value;
}

export const UserContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        date: "",
        password: "",
        todos: []
    });
    const initialdata = localStorage.getItem(inpval.email) || [];

    const [todos, setTodos] = useState([])
    useEffect(() => {
        try {
            const data = JSON.parse(initialdata);
            setTodos(data.todos)
        } catch (error) {
        }
    }, [initialdata])

    const date = new Date("2023-11-04");

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newDate = `${day}/${month}/${year}`;

    const addTodo = (todo) => {
        const updatedTodos = [...todos, { text: todo, completed: false, date: newDate }]
        setTodos(updatedTodos);
        localStorage.setItem(inpval.email, JSON.stringify({ ...inpval, todos: updatedTodos }))
    }

    const toggleTodo = (id) => {
        const updatedTodos = todos.map((todo, i) => {
            if (i === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        })
        setTodos(updatedTodos);
        localStorage.setItem(inpval.email, JSON.stringify({ ...inpval, todos: updatedTodos }))
    }
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo, idx) => idx !== id);
        setTodos(updatedTodos);
        localStorage.setItem(inpval.email, JSON.stringify({ ...inpval, todos: updatedTodos }))
    }

    const getData = (e) => {
        const { value, name } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }
    const handleLogout = () => {
        setLoggedIn(false);
        setInpval({
            name: "",
            email: "",
            date: "",
            password: "",
            todos: []
        })
        toast.success("Logged out Successfully")
    }
    const handleSignup = (e) => {
        e.preventDefault();

        const { name, email, date, password } = inpval;
        if (name === "") {
            toast.error("Name field is required")
        }
        else if (email === "") {
            toast.error("Email field is required")
        }
        else if (!email.includes("@")) {
            toast.error("Please Enter valid email address")
        }
        else if(localStorage.getItem(inpval.email) !== null){
            toast.error("Email already exists in localstorage")
        }
        else if (date === "") {
            toast.error("Date field is required")
        }
        else if (password === "") {
            toast.error("Password field is required")
        }
        else if (password.length < 6) {
            toast.error("Please enter minimum password length 6")
        }
        else {
            setLoggedIn(true);
            localStorage.setItem(inpval.email, JSON.stringify({...inpval, inpval}));
            toast.success("New User Created Successfully")
        }

    }


    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = inpval;
        console.log(password);
        if (email === "") {
            toast.error("Email field is required")
        }
        else if (!email.includes("@")) {
            toast.error("Please enter valid email address")
        }
        else if (password === "") {
            toast.error("Password field is required")
        }
        else if (password.length < 6) {
            toast.error("Please enter minimum password length 6")
        }
        else {
            if (initialdata && initialdata.length) {
                const userData = JSON.parse(initialdata);


                if (!userData || userData.password !== password) {
                    toast.error("Invalid Details")
                }
                else {
                    setLoggedIn(true);
                    toast.success("Logged In Successfully")
                }
            }
        }

    }
    return (
        <userContext.Provider value={{
            loggedIn,
            getData,
            handleLogin,
            handleSignup,
            handleLogout,
            addTodo,
            toggleTodo,
            deleteTodo,
            todos
        }}>
            {children}
        </userContext.Provider>
    )
}