import { useState } from "react";

const Todo = () => {

    const [query, setQuery] = useState("");
    const [todoList, setToDoList] = useState(JSON.parse(localStorage.getItem("todolist")) || []);

    const handleQuery = (e) => {
        setQuery(e.target.value);
    };

    const handleToDoList = (e) => {

     console.log(e.key, "handle Key");

        if (!query.trim()) return;

        const todoExists = todoList.find((item) => query.trim() === item.item);

        if (todoExists) {
            alert(" Todo Exists, Please add new todo");
        } else {
            const newToDo = { id: new Date().getMilliseconds(), item: query.trim(), isCompleted: false };
            setToDoList((prev) => [newToDo, ...prev]);

            localStorage.setItem("todolist", JSON.stringify(todoList));
            setQuery("");
        }
    };

    const handleRemoveItem = (id) => {
        const newTodo = todoList.filter((item) => {
            return item.id !== id;
        });

        setToDoList(newTodo);
    };

    const handleIsCompleted = (id) => {
        setToDoList((prev) => prev.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
    };



    console.log(todoList, "todoList");

    return (
        <div className="flex flex-col items-center p-3.5">
            <div className="flex gap-1">
                <input
                    type="text"
                    name=""
                    id=""
                    value={query}
                    onChange={handleQuery}
                    // onKeyDown={handleToDoList}
                    className="border px-2 outline-none"
                />
                <button
                    onClick={handleToDoList}
                    className="w-12 cursor-pointer border py-0"
                >
                    Add
                </button>
            </div>
            <div className="relative mt-1">
                {todoList?.map((item) => {
                    return (
                        <div key={item.id} className="flex list-disc gap-3">
                            {item.isCompleted ? <div className="line-through">{item.item}</div> : <div>{item.item}</div>}

                            <div className="flex items-center gap-2">
                                <span
                                    onClick={() => handleIsCompleted(item.id)}
                                    className="cursor-pointer text-blue-600"
                                >
                                    O
                                </span>
                                <span
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="cursor-pointer text-red-600"
                                >
                                    X
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Todo;
